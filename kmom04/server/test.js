var util  = require('util'),
    spawn = require('child_process').spawn,
    bs    = spawn('bash', ['supporting.bash']);

bs.stdout.on('data', function (data) {    // register one or more handlers
  console.log('stdout: ' + data);
});
