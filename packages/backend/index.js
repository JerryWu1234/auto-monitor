const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4000
var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
  next();
})



app.post('/index', jsonParser, (req, res) => {
  console.log(req.query)
  console.log(req.body)
  res.send('Hello World!')
})

app.post('/click', jsonParser, (req, res) => {
  console.log(req.query)
  console.log(req.body)
  res.send('Hello World!click')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})