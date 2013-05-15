# node-edit

Launch $EDITOR with a default set of text and allow the user to make changes. Strip out the comments and fire a callback with the new text, or false if the text has not changed.

## Install
```sh
npm install node-edit
```

## Instructions
```javascript
var edit = require('node-edit');
edit("# Example\n# Commented lines will be stripped", function(newText) {
  console.log(newText);
});
```
This will output the files new contents, or false if they have not changed: Note: Comments are stripped.
