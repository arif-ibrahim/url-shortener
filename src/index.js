const express = require('express');
const bp      = require('body-parser');
const db      = require('./utils/db');
const signup  = require('./controllers/signup')
const login  = require('./controllers/login')

app           = express();

app.use(bp.json());
app.use(signup);
app.use(login);

const _port   = process.env.PORT || 4000;

app.listen(_port, ()=>{
    console.log(`Server running on port ${_port}`);
})