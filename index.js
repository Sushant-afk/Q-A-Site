const mongoose = require('mongoose');
const express = require('express');
const auth_route = require('./routes/auth');
const user_route = require('./routes/users');
const profile_route = require('./routes/profiles');
const question_route = require('./routes/questions');

const app = express();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Quora";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/auth', auth_route);
app.use('/api/users', user_route);
app.use('/api/profile', profile_route);
app.use('/api/question', question_route);

const port = process.env.PORT || 3900;
app.listen(port, () => console.log(`Listening on port ${port}...`));