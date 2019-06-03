// Generate required css
import FAOld from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import FA5Reg from 'react-native-vector-icons/Fonts/FontAwesome5_Regular.ttf';
import FA5Solid from 'react-native-vector-icons/Fonts/FontAwesome5_Solid.ttf';
import FA5Brands from 'react-native-vector-icons/Fonts/FontAwesome5_Brands.ttf';

const iconFontStyles = `
@font-face {
  src: url(${FAOld});
  font-family: FontAwesome;
}
@font-face {
  src: url(${FA5Reg});
  font-family: FontAwesome5_Regular;
}
@font-face {
  src: url(${FA5Solid});
  font-family: FontAwesome5_Solid;
}
@font-face {
  src: url(${FA5Brands});
  font-family: FontAwesome_Brands;
}
`


const style = document.createElement('style')
style.type = 'text/css'
style.styleSheet
  ? style.styleSheet.cssText = iconFontStyles
  : style.appendChild(document.createTextNode(iconFontStyles))

document.head.appendChild(style);