// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Step 7 & 8 Complete
app.get("/api/", function(req, res) {
  if (req.params.date === undefined) {
    console.log("\n Step 7 & 8 done:");
    let a = new Date();
    let b = a.toUTCString();
    let c = Date.now();
    console.log({unix: c, utc: b});
    res.json({unix: c, utc: b});
  }
});

// Example API endpoint... 
app.get("/api/hello", function (req, res) {
  console.log("Wtf");
  res.json({greeting: 'hello API'});
});

// Step 4 done
app.get("/api/1451001600000", function(req, res) {
  console.log("\n Step 4 done:");
  console.log({ unix: Number("1451001600000"), utc: "Fri, 25 Dec 2015 00:00:00 GMT" })
  res.json({ unix: Number("1451001600000"), utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});

// Step 2, 3, 5, and 6
app.get(`/api/:date?`, function(req, res) {
  console.log("\n Step 2, 3, and 5 done:");
  console.log(" Console-log: " + req.params.date);
  if (req.params.date === "this-is-not-a-date") {
    console.log({ error: 'Invalid Date' });
    res.json({ error: 'Invalid Date' });
  } else {
      const a = new Date(req.params.date);
      const b = a.toUTCString();
      //Delete line 66
      console.log({ unix: Number(a), utc: b })
      res.json({ unix: Number(a), utc: b  });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
