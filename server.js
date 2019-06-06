const express = require('express');
const bodyParser= require('body-parser')
const cors = require('cors');
var mongodb = require('./config/mongodb_connections');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.json());

const userroutes = require('./routes/user_routes');
const messageroutes = require('./routes/message_routes');
//enabled routes
userroutes(app);
messageroutes(app);

mongodb.createDevConnection();

io.on('connection', () =>{
  console.log('a user is connected')
})

var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});

module.exports = app;