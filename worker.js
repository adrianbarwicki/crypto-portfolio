const spawn = require('child_process').spawn;
var py;

const init = () => {
    setInterval(() => {
        if (py) {
            return;
        }

        console.log('Worker started.')

        py = spawn('python', [ 'crawler/crawler-commit.py' ]),
        
        py.stdout.on('data', data => {
            console.log(data);
        });

        py.stdout.on('end', () => {
            py = null;
        });
    }, 10 * 1000);
};

module.exports = {
    init
};
