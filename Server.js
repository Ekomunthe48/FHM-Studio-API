const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');

const sequelize = require('./Connect')

var morgan = require('morgan');
const app = express();
var cors = require('cors');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

app.get("/", express.static(path.join(__dirname, "./uploads")));
app.use('/uploads', express.static('uploads'))


//parse app/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

//routes
var routers = require('./Routers');
routers(app);

//daftar menu
app.use('/auth', require('./middleware'));

app.listen(3010, () => {
    console.log(`Database Server started go to Anime World`);
});


