// require("babel-register")({
// // extensions: [".jsx", ".js"]
//   only: /react/
// });

// require('./react');

const scan = require('./scan');
const ipView = document.getElementById('ips');
const openLink = require("electron-open-link-in-browser");
window.openLink = openLink;

function ipTemplate(ip) {
  return `<li><a href="http://${ip}/" onClick="openLink()">${ip}</a></li>`;
}

function ipsTemplate(ips) {
  return `
    <ul>
      ${ips.map(ipTemplate).join('\n')}
    </ul>
  `;
}

function refresh() {
  scan(ips => {
    ipView.innerHTML = ipsTemplate(ips);
  });
}


document.getElementById('refresh').onClick = (e) => {
  e.preventDefault();
  refresh();
};


refresh();
