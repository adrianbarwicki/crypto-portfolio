const exec = require('child_process').exec;
var py;

const runWorker = () => {
    console.log('Worker started.')

    py = exec('python ./crawler/crawl-commit.py');

    py.stdout.on('data', data => {
        console.log(data);
    });

    py.stdout.on('error', data => {
        console.log(data);
    });

    py.stdout.on('end', data => {
        console.log('Worker ended.')
        
        py = null;
    });
};

const init = () => {
    setInterval(() => {
        if (py) {
            return;
        }

        runWorker();
    }, 10 * 1000);
};

if (module.parent) {
    module.exports = {
        init
    };
} else {
    runWorker();
}



