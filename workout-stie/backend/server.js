const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const app = express();
app.use(cors())
app.use(bodyParser.text())
// app.use(express.json({
//   type: ['application/json', 'text/plain']
// }))
const port = 3000;

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login', (req,res) => {
  console.log(`Request Recieve`);
  console.log(req.body);
  
  sleep(2000).then ( () => {
    res.set({
      'Content-Type' : 'text/plain'
    })
    res.send("Login!!");
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
