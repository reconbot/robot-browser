const mdns = require('mdns-js');

const mdnsBrowser = mdns.createBrowser();

window.mdnsBrowser = mdnsBrowser;

function updateDevices(services) {
  console.log(services);
}

mdnsBrowser.on('update', updateDevices);

mdnsBrowser.discover();
