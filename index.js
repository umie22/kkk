const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

var connect = mysql.createPool({
  host: "ec2-176-34-215-248.eu-west-1.compute.amazonaws.com",
  user: "zaiaryvqbpwwcb",
  password: "731fafeb016f84ea7f87300cbd19a24ba3e96adbaaf92504bc8d945d0302489b",
  database: "delu1t92658u0"
});

app.get('/', (req, res) => {
  res.send('hello world!');
  console.log('Running');
});

app.get('/displayallparticipant', (req, res) => {
  var micro_username = req.query.username;

  console.log("username: " + micro_username);

  connect.getConnection(function (err, connection) {
    if (err) { res.send('Error Database Connection'); }
    else {
      var sql = "select participant_id, participant_password,participant_name,participant_email,participant_phoneno";
      connect.query(sql, function (err, result) {
        if (err) { throw err; }
        else {
          res.send(result);
        }
      connection.release();
      });
    }
  });
});


app.listen(process.env.PORT, () => {
  console.log('Example app listening to port 4005');
});