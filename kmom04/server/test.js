var util  = require('util'),
    spawn = require('child_process').spawn,
    bs    = spawn('bash', ['supporting.bash']);
    un	  = spawn('bash', ['unset LINUX_PORT']);

bs.stdout.on('data', function (data) {    // register one or more handlers
  console.log('stdout: ' + data);
});

un.stdout.on('data', function(data) {

console.log('stdout: ' + data);

});
