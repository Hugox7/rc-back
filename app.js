const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const auth = require('./routes/auth');
const user = require('./routes/user');
const championship = require('./routes/championship');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mlab connection
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log(err);
    })


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to racingbro app' })
})

app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/championship', championship)


app.listen(PORT, () => {
    console.log('Server started on ' + PORT);
})