let bodyParser      = require('body-parser'),
    multer          = require('multer'),
    BacklogImporter = require('./lib/backlog_importer'),
    app             = require('express')();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.post('/backlog/csv', function (req, res) {
  console.log(req.files);
  let importer = new BacklogImporter;
  importer.import(req.files.backlogCsv.path);
  res.status(201).send('{}');
})


module.exports = app;
