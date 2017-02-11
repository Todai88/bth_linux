var util  = require('util'),
    spawn = require('child_process').exec,
    supporting = exec('. ./supporting.bash', (error, stdout, stderr) => {

        if(error){
            console.error(`exec error: ${error}`);
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);

});
