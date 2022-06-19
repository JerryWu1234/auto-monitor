const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const {
  engine
} = require('express-handlebars')
const port = 4000

//route for index page


var jsonParser = bodyParser.json()
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

let list = []

app.get('/', (req, res) => {
  res.render('index', {
    list: list
  });
});
// app.use(express.static('public'));
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
  next();
})



app.post('/index', jsonParser, (req, res) => {
  if(Object.keys(req.body).length > 0) {
    list.push(JSON.stringify(req.body))
  }else{
    list.push(JSON.stringify(req.query))
  }
  
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