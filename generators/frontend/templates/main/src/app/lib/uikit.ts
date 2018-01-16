// Load jQuery
import './jquery';
let UIkit = require('uikit/dist/js/uikit');
let Icons = require('uikit/dist/js/uikit-icons');
UIkit.use(Icons);
(<any>window).UIkit = UIkit;
export default (<any>window).UIkit;
