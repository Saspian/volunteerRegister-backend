const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors =require('cors');

//BECAUSE IT WAS GIVING DEPRECATION WARNING LINKS IN TWITTER
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const participantsRoute = require('./routes/participants');

require('dotenv/config');

//connecting to a database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log('Connected to the database')
});

app.use(bodyParser.json());
app.use(cors());

//Routes Middlewares
app.use('/api/user', authRoute);
app.use('/api/post',postRoute);
app.use('/api/participants',participantsRoute);


//starting server
app.listen(3001, () => console.log('server is up and running'));

