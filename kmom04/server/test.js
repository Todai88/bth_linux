var util  = require('util'),
    exec = require('child_process').exec,
    supporting = exec('echo $LINUX_PORT', (error, stdout, stderr) => {

        if(error){
            console.error(`exec error: ${error}`);
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);

});
