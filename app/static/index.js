// require("babel-register")({
// // extensions: [".jsx", ".js"]
//   only: /react/
// });

// require('./react');

const scanAll = require('./scan');
const ipView = document.getElementById('ips');
const remote = require("electron").remote;

function ipTemplate(ip, port) {
  return `<li><a href="http://${ip}:${port}/">${ip}:${port}</a></li>`;
}

function ipsTemplate(ips, port) {
  return `
    <h1>Robots</h1>
    <ul>
      ${ips.map(ip => ipTemplate(ip, port)).join('\n')}
    </ul>
  `;
}

function refresh() {
  const port = 80
  ipView.innerHTML = `<h1>Scanning</h1>`;
  scanAll(port, ips => {
    ips.unshift('johnny-five.io');
    ipView.innerHTML = ipsTemplate(ips, port);
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
