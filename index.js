var express = require('express');
var app = express();
var os = require('os');
var disk = require('diskusage');
var PORT = 34567;

app.get('/', function (req, res) {	
    disk.check('/', function(err, hdd) {
      res.json({
        timestamp: new Date(),
        uptime: os.uptime(),
        memory: {
          total: Math.round(os.totalmem() / 1024 / 1024),
          free: Math.round(os.freemem()  / 1024 / 1024),
          used: Math.round((os.totalmem() - os.freemem()) / 1024 / 1024),
          percentage: Math.round(((os.totalmem() - os.freemem()) / os.totalmem()) * 100)
        },
        cpu: {
          loadavg: os.loadavg()[0],
          count: os.cpus().length,
          percentage: Math.round((os.loadavg()[0] / os.cpus().length) * 100)
        },
        hdd: {
          total: Math.round(hdd.total / 1024 / 1024),
          free: Math.round(hdd.free / 1024 / 1024),
          used: Math.round((hdd.total - hdd.free)  / 1024 / 1024),
          percentage: Math.round(((hdd.total - hdd.free) / hdd.total) * 100)
        }
      });
    });
});

app.listen(PORT, function () {
  console.log('Example app listening on port '+PORT+'!');
});
