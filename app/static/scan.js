const os = require('os');
const Scanner = require('evilscan');

const subnet2cidr = function(subnet_mask) {
  cidr_bits = 0;

  subnet_mask.split('.').forEach(function(octet) {
    cidr_bits+=((octet >>> 0).toString(2).match(/1/g) || []).length;
  });
  return cidr_bits;
}

function scan(cidr, cb) {
  const hosts = [];
  console.log('scanning', cidr);
  const scanner = new Scanner({
    target: cidr,
    port: 80,
    status: 'O',
    banner: false,
    timeout: 500,
  });
  scanner.on('result', result => {
    console.log('found', result.ip);
    hosts.push(result.ip);
  });
  scanner.on('done', () => {
    console.log('done scanning', cidr);
    cb(hosts);
  });
  scanner.run();
}

function scanAll(cb) {
  const interfaces = os.networkInterfaces();
  console.log('interfaces', interfaces);
  const ips = Object
    .keys(interfaces)
    .map(key => interfaces[key])
    .reduce((a,b) => a.concat(b))
    .filter(iface => iface.family === 'IPv4' && iface.internal === false)

  const cidrs = ips.map(ip => `${ip.address}/${subnet2cidr(ip.netmask)}`)

  if (cidrs.length === 0) {
    process.nextTick(() => cb([]));
    return;
  }

  let hosts = [];
  let scanned = 0;
  cidrs.forEach(cidr => {
    scan(cidr, (scanHosts) => {
      hosts = hosts.concat(scanHosts);
      scanned++;
      if (scanned >= cidrs.length) {
        cb(hosts);
      }
    });
  });
}

module.exports = scanAll;
