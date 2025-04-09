const { exec } = require('child_process');

exports.handler = async (event) => {
    return new Promise((resolve) => {
        exec(`php -f ${__dirname}/../public/index.php`, { env: { ...process.env, REQUEST_URI: event.path } }, (error, stdout, stderr) => {
            if (error) {
                resolve({
                    statusCode: 500,
                    body: JSON.stringify({ error: stderr }),
                });
            } else {
                resolve({
                    statusCode: 200,
                    body: stdout,
                });
            }
        });
    });
};
