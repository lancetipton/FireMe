import 'firebase/firestore'
import firebase from 'firebase/app'
import { ActionTypes } from '../constants'
import { docChanged } from '../actions/db/doc_changed'
import { docRemoved } from '../actions/db/doc_removed'

let FireStore

/**
 * Firebase DB service
 * @class
 * @implements {DB}
 */
export default class Firebase {

  initialized = false
  evtMap = {
    added: ActionTypes.DB_DOC_ADDED,
    removed: ActionTypes.DB_DOC_REMOVED,
    modified: ActionTypes.DB_DOC_CHANGED,
  }

  /**
   * construct db class
   * @param { boolean } debug - if in debug mode or not
   * @param { Object } config - config object for db
   * @param { function } fallback - is called when method isn't overridden
   */
  constructor(debug = false, config = {}, fallback = () => {}) {
    this.debug = debug
    this.config = config
    this.watcherUnSubs = {}
    this.fallback = fallback
    this.enableOffline = typeof window !== 'undefined'
  }

  /**
   * simple logging
   * @param { any } msg - what to log
   * @param { 'log'|'warn'|'error' } type - type of log
   */
  log = (msg, type = 'log') => {
    this.debug && console[type](msg)
  }

  initialize = async () => {
    if (this.initialized) return this
    this.initialized = true

    firebase.initializeApp(this.config)
    // setup firestore
    FireStore = firebase.firestore()
    this.FireStore = FireStore

    return this.enableOffline &&
      await FireStore
        .enablePersistence({ experimentalTabSynchronization: true })
        .then(() => {
          this.log('Firestore localCache is enabled')
        })
        .catch(e => {
          this.log(errCodeMap[e.code] || 'Failed to enablePersistance', 'warn')
        }) || this
  }

  getTimestamp = () => {
    return firebase.firestore.Timestamp.now().toMillis()
  }

  isNewerTimestamp = (timeA, timeB) => {
    if (timeA > timeB) return true
    return false
  }

  getDocs = async (collection, queries = [], watch = true) => {
    const watcherKey = `${collection}-${JSON.stringify(queries)}`
    if (this.watcherUnSubs[watcherKey]) return

    let query = FireStore.collection(collection)

    queries.map(({ method, args }, i) => {
      if (!method || !args) {
        return console.warn(
          `invalid query provided:`,
          queries[i],
          `at index ${i}`
        )
      }
      query = query[method](...args)
    })

    if (watch)
      this.watcherUnSubs[watcherKey] = query
        .onSnapshot(snapShot => {
          snapShot
            .docChanges()
            .forEach(change => docChanged(change.doc.data()))
        })

    return query.get()
      .then(snapShot => {
        return snapShot.docs.map(doc => doc.data())
      })
  }

  getDoc = async (docId, collection, watch = true) => {
    const docSnap = await FireStore
      .collection(collection)
      .doc(docId)
      .get()

    watch && this.watchDoc(docId, collection)
    return docSnap.exists && docSnap.data()
  }

  setDoc = async (doc, docId, collection, direct = true) => {
    docId = docId || doc.uuid
    collection = collection || doc.collection
    if (direct) doc.updated_at = this.getTimestamp()

    await FireStore
      .collection(collection)
      .doc(docId)
      .set(doc)

    return doc
  }

  updateDoc = async (data, docId, collection, direct = true) => {
    const colRef = FireStore.collection(collection)
    if (direct) data.updated_at = this.getTimestamp()

    await colRef.doc(docId).set(data, { merge: true })
    return colRef
      .doc(docId)
      .get()
      .then(snapShot => snapShot.data())
  }

  removeDoc = async (docId, collection) => {
    await FireStore
      .collection(collection)
      .doc(docId)
      .delete()

    return this.unwatchDoc(docId, collection)
  }

  watchCollection = collection => {
    if (this.watcherUnSubs[collection]) return
    const unSubscriber = FireStore.collection(collection).onSnapshot(
      { includeMetadataChanges: true },
      snapShot => {
        snapShot.docChanges().forEach(change => {
          docChanged(change.doc.data())
        })
      },
      error => this.log(error, 'warn')
    )

    this.watcherUnSubs[collection] = unSubscriber
  }

  watchDoc = (docId, collection) => {
    if (this.watcherUnSubs[`${collection}-${docId}`]) return
    const unSubscriber = FireStore
      .collection(collection)
      .doc(docId)
      .onSnapshot(
        { includeMetadataChanges: true },
        docSnapshot => {
          if (!docSnapshot.metadata.hasPendingWrites) {
            if (!docSnapshot.exists)
              return docRemoved({
                docId,
                collection,
                single: true,
              })

            const docData = docSnapshot.data()

            return docData && docChanged(docData)
          }
        },
        error => this.log(error, 'warn')
      )
    this.watcherUnSubs[`${collection}-${docId}`] = unSubscriber
  }

  unwatchKey = key => {
    const unSubscriber = this.watcherUnSubs[key]
    if (unSubscriber) {
      unSubscriber()
      this.watcherUnSubs[key] = undefined
    }
  }

  unwatchCollection = collection => {
    this.unwatchKey(collection)
  }

  unwatchDoc = (docId, collection) => {
    this.unwatchKey(`${collection}-${docId}`)
  }

  unwatchDocs = (collection, queries = []) => {
    this.unwatchKey(`${collection}-${JSON.stringify(queries)}`)
  }

}