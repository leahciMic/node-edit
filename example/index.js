var edit = require('../edit.js');

edit("# This is an example\n# Comments will be ignored\n# Try adding some more text to this file", function(text) {
  console.log(text);
});
