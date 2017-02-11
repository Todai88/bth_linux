var util  = require('util'),
    spawn = require('child_process').spawn,
    supporting = spawn('. ./supporting.bash', (error, stdout, stderr) => {

        if(error){
            console.error(`exec error: ${error}`);
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);

    });
});
