const express = require('express');
const bp      = require('body-parser');
const db      = require('./utils/db');
const signup  = require('./controllers/signup')
const login   = require('./controllers/login')
const auth    = require('./middleware/auth')

app           = express();

app.use(bp.json());
app.use(signup);
app.use(login);
app.use('/api', auth);

const _port   = process.env.PORT || 4000;

app.listen(_port, ()=>{
    console.log(`Server running on port ${_port}`);
})