const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.handler = async (event) => {
  return new Promise((resolve) => {
    const phpPath = path.join(__dirname, 'php');
    console.log('PHP path:', phpPath);
    console.log('Files in dir:', fs.readdirSync(__dirname));
    const indexPath = path.join(__dirname, '../public/index.php');
    exec(
      `${phpPath} -f ${indexPath}`,
      { env: { ...process.env, REQUEST_URI: event.path } },
      (error, stdout, stderr) => {
        if (error) {
          resolve({
            statusCode: 500,
            body: JSON.stringify({ error: stderr || error.message }),
          });
        } else {
          resolve({
            statusCode: 200,
            body: stdout,
          });
        }
      }
    );
  });
};