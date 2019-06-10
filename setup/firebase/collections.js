// fs.existsSync(checkPath)
const fs = require('fs')
const path = require('path')
const admin = require('firebase-admin')
const { FORCE_PULL_COLLECTIONS } = process.env
const modelsFolder = '../../src/models/firebase/'
const collectionsPath = path.join(__dirname, modelsFolder, 'collections.json')
const FbConfig = require('./SA.json')
const fileExists = fs.existsSync(collectionsPath)

if(!FbConfig || (fileExists && !FORCE_PULL_COLLECTIONS))
  return true

/**
* Writes a file to the local system
* @param  { string } path - location to save the file
* @param  { string } data - data to save in the file
* @return { promies || boolean } - if the file was saved
*/
const writeFile = (filePath, data) => (
  new Promise((req, rej) => fs.writeFile(filePath, data, err => err ? rej(err) : req(true)))
)


;( async () => {
  try {
    
    const fbApp = admin.initializeApp(FbConfig)
    const FStore = admin.firestore()
    FStore.settings({ timestampsInSnapshots: true })
    const collection = await FStore.listCollections()
    const collections = collection.map(coll => (coll.id))
    await writeFile(collectionsPath, JSON.stringify({ collections }, null, 2))
  }
  catch(e){
    console.log(e.message)
  }

})()