/**
 * edit
 *
 * Launch $EDITOR with a default set of text and allow the user to make changes.
 * Strips out comments and fires the callback with the changed text, or false if
 * there are no changes.
 *
 * @author Michael Leaney <leahcimic@gmail.com>
 *
 */

var cp = require('child_process'),
    fs = require('fs'),
    editor = process.env.EDITOR || 'vi',
    TMP_FILE = '.EDITOR';

var Edit = function() {
};

/**
 * Writes data to the temporary file and fire callback
 *
 * @param String data The data to be written
 */
Edit.writeTempFile = function(data, callback) {
  fs.writeFile(
    TMP_FILE,
    data,
    callback
  );
};

/**
 * Spawns user's editor and fires callback with the contents of the file
 *
 * @param Function callback The callback to fire when finished editing
 */
Edit.spawnEditor = function(callback) {
  var p = cp.spawn(
    'vi',
    [TMP_FILE],
    {
      stdio: 'inherit'
    }
  );
  p.on('close', function(code) {
    fs.readFile(
      TMP_FILE,
      'utf8',
      function(err, newText) {
        if (err) throw err;
        callback(err, newText);
      }
    );
  });
};

/**
 * Splits the input based on new lines, discards the lines that begin with #
 * and reconstructs the string with \n
 *
 * Note: This function will also convert any line endings to \n
 *
 * @param String text The text to remove comments from
 *
 */
Edit.removeCommentLines = function(text) {
  var reconstruct = [];
  text = text.split(/\r\n|\r|\n/);
  text.forEach(function(line) {
    if (line[0] != '#')
      reconstruct.push(line);
  });
  return reconstruct.join("\n");
};

/**
 * edit
 *
 * Opens default editor with `defaultText` and fires callback when finished
 * editing. The first argument to the callback will be false if the text hasn't
 * changed otherwise it will be the new text.
 *
 * @param String defaultText The default text to edit
 * @param Function callback the function to callback
 *
 */
Edit.edit = function(defaultText, callback) {
  var _this = this;
  this.writeTempFile(
    defaultText,
    function(err) {
      if (err) throw err;
      _this.spawnEditor(function(err, newText) {
        fs.unlink(TMP_FILE);
        newText = _this.removeCommentLines(newText.trim());
        defaultText = _this.removeCommentLines(defaultText.trim());
        if (defaultText != newText) {
          callback(newText);
        } else {
          callback(false);
        }
      });
    }
  );
};

module.exports = function(text, callback) {
  Edit.edit(text, callback);
};