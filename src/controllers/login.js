const {User}                        = require('../utils/db');
const _p                            = require('../utils/promise_errors');
const router                        = require('express').Router();
const jwt                           = require('jsonwebtoken');
const {check}     = require('express-validator/check');
const {validate}                    = require('../utils/password');
const {app_secret}                  = require('../config');
const reject_invalid                = require('../middleware/reject_invalid');

const loginValidator = [check('email').isEmail(), check('password').isLength({min: 5})];

router.post('/login', loginValidator, reject_invalid, async (req, res)=>{

    let {email, password} = req.body;
    let [uer, user]     = await _p(User.findOne({
        where: {
            email
        }
    }));

    if (!user && uer){
        next(uer);
    }
    else {

        let [salt, hash] = user.password.split('.');
        let {name, email, id} = user;
        let valid = validate(password, hash, salt);
        if (valid){
            let token = jwt.sign({id,name, email}, app_secret);
            res.json({
                error: false,
                token,
                user: {id, name, email}
            })
        }
        else {
            next(new Error('Password Invalid'))
        }
    }

})

module.exports = router;