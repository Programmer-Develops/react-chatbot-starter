const fetch = require('node-fetch');

async function getInstallCount() {
  const response = await fetch('https://api.npmjs.org/downloads/point/last-month/package-name');
  const data = await response.json();
  console.log(`Installs : ${data.downloads}`);
}

getInstallCount();
