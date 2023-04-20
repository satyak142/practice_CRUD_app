const express = require('express') ;
const app = express() ;

const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient ;

// mongodb connection
const connectionString  = 'mongodb+srv://satyanarayna121:mjs8ZNGIB3NEgdAY@cluster0.fzrrqhx.mongodb.net/?retryWrites=true&w=majority';


MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client => {
    console.log('Connected to Database');
    const db = client.db('Stupid-quotes');
    const quotesCollection = db.collection('quotes')

    // Middleware 
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.set('view engine', 'ejs');

    // routes 
    
    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
            .then(result => {
                res.render('index.ejs',{info:result})
            })
            .catch(err => console.log(err))
    })
    app.post('/quotes', (req,res) => {
        console.log(req.body);
        quotesCollection.insertOne(req.body)
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(error => console.error(error))
    })
    app.put('/quotes',(req,res) => {
        quotesCollection.findOneAndUpdate(
            { name: 'mar' },
            {
              $set: {
                name: req.body.name,
                quote: req.body.quote,
              },
            },
            {
              upsert: true,
            }
        )
        .then(res =>{
            console.log(res);
        })
    })
    // server
    const PORT = 4848 ;
    app.listen(PORT, () => {
        console.log(`Server is started on port ${PORT}`) ;
    })
})
.catch(error => console.error(error))




