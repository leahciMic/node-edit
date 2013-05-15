var cp = require('child_process'),
    editor = process.env.EDITOR || 'vi';

cp.spawn(
  'vi',
  [],
  {
    stdio: 'inherit'
  }
);