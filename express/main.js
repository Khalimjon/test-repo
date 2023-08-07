const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const categories = [
    {id: 1, name: "Dasturlash"},
    {id: 2, name: "Devops"},
    {id: 3, name: "Databases"},
    {id: 4, name: "Systemize"},
    {id: 5, name: "Mobile"}
];

app.get('/virtualdars.com/api/categories/', (req, res) =>{
    res.status(200).send(categories)
});

app.get('/', (req, res) =>{
    res.send(`salom`);
});

app.get('/virtualdars.com/api/categories/:id', (req, res) =>{
    const category = categories.find(c => c.id === parseInt(req.params.id));

    if(!category)
        return res.send(`bunday categoriya topilmadi...`)
});

app.post('/virtualdars.com/api/categories/', (req, res) =>{
    const scheme = Joi.object({
        name: Joi.string().required().min(3)
    })
    const { error, value } = scheme.validate(req.body);
    console.log('Value: ', value);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const category = {
        id: categories.length + 1,
        name: value.name
    }
    categories.push(category);
    res.send(categories)
})


const port = process.env["APP_PORT "] || 3000;
app.listen(port, ()=> {
    console.log(`${port}-portni eshitishni boshladim...`)
});

app.put('/virtualdars.com/api/categories/:id', (req, res)=>{
    //finding category
    const category = categories.find(c => c.id === parseInt(req.params.id))

    if(!category){
        res.status(404).send(`Bunday category topilmadi...`)
    }
    //update categories
    category.name = req.body.name;
    //resend result
    res.send(categories)
});

app.delete('/virtualdars.com/api/categories/:id', (req, res)=>{
    //find category
    const category = categories.find(c =>c.id === parseInt(req.params.id))
    if(!category){
       return res.status(404).send(`bunday category topilmadi...`)

    }
    const categoryIndex = categories.indexOf(category)
    //choose the category
    categories.splice(categoryIndex, 1)

    res.send(categories)
})


