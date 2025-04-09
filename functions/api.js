const { exec } = require('child_process');
const path = require('path');

exports.handler = async (event) => {
  return new Promise((resolve) => {
    const phpPath = path.join(__dirname, 'php'); // Use bundled PHP
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