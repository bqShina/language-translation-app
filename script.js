const express = require('express');
const bodyParser = require('body-parser');
var translate = require('node-google-translate-skidz');
const allLangs = require('./langs');

const app = express();
const port = process.env.port || 3000;
let text = '';
let transResult = '';
let source = 'en';
let target = 'zh';

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    // console.log(allLangs);
    res.render('index', {text: text, transResult: transResult, allLangs: allLangs, source: source, target: target});
})

app.post('/', (req, res) => {
    // res.send('PUT request to homepage')
    source = req.body.langOne;
    target = req.body.langTwo;
    text = req.body.lang1;

    translate({
        text: text,
        source: source,
        target: target
    }, result => {
        transResult = result? result : 'Please type the correct language.';
        // res.send(result);
        res.redirect('/');
    })
    
})

app.listen(port, () => {
    console.log(`Server is runing on port ${port}.`);
})

