let bodyParser      = require('body-parser'),
    multer          = require('multer'),
    fs              = require('fs'),
    BacklogImporter = require('../lib/backlog_importer'),
    app             = require('express')();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.post('/backlog/csv', function (req, res) {
  let importer = new BacklogImporter();
  let path = req.files.backlogCsv.path;
  console.log(path);
  fs.readFile(path, 'utf8', (err, data) => importer.importBacklog(data));
  res.status(201).json({status: 'imported'});
})


module.exports = app;
