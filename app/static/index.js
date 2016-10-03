// require("babel-register")({
// // extensions: [".jsx", ".js"]
//   only: /react/
// });

// require('./react');

const scan = require('./scan');
const ipView = document.getElementById('ips');
const remote = require("electron").remote;

function ipTemplate(ip) {
  return `<li><a href="http://${ip}/">${ip}</a></li>`;
}

function ipsTemplate(ips) {
  return `
    <h1>Robots</h1>
    <ul>
      ${ips.map(ipTemplate).join('\n')}
    </ul>
  `;
}

function refresh() {
  ipView.innerHTML = `<h1>Scanning</h1>`;
  scan(ips => {
    ips.unshift('johnny-five.io');
    ipView.innerHTML = ipsTemplate(ips);
  });
}

document.getElementById('refresh').addEventListener('click', (e) => {
  e.preventDefault();
  refresh();
});

refresh();

document.addEventListener("keydown", event => {
  switch (event.key) {
    case "Escape":
        if (remote.getCurrentWindow().isFullScreen()) {
            remote.getCurrentWindow().setFullScreen(false);
        }
        break;
     }
});
