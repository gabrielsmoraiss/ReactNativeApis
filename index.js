import { AppRegistry } from 'react-native';
import App from './src';

//Fez funcionar a request que só dava erro com minha api node
//Porque? não faço ideia.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ? 
  GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;

AppRegistry.registerComponent('ReactNativeApis', () => App);
