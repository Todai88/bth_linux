var util  = require('util'),
    spawn = require('child_process').spawn,
    bs    = spawn('bash', ['supporting.bash']);

bs.stdout.on('data', function (data) {    // register one or more handlers
  console.log('stdout: ' + data);

  var child = spawn('bash', ['echo $LINUX_PORT']);

  child.stdout.on('data', function(out) {
      console.log('Child stdout: ' + out);
  });
});
