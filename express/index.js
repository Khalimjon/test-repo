const express = require("express");
const app = express();
const Joi = require('joi')
const logger = require('./loogger')
const helmet = require("helmet");
const morgan = require('morgan')
const { urlencoded } = require("express");
const config = require("config")
const books = require('./routers/books')

// app.use(logger.log)
app.use(express.json());
app.use(helmet());
app.use(logger.auth);
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api/books', books)

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log(`logger ishlavotti...`);
}




console.log(process.env.NODE_ENV)
console.log(config.get("name"));
console.log(config.get("mailServer.host"));
console.log(config.get("mailServer.password"));


app.get('/',  (req, res) =>{
    res.render('index', {title: 'my express app', greeting: 'assalomu alaykum'})
});




const port = process.env.port || 5001
app.listen(port, ()=>{
    console.log(`${port}chi portni eshitishni boshladim... `)
})
