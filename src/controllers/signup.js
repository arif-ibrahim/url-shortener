const router                    = require('express').Router();
const {check} = require('express-validator/check');
const {generate}                = require('../utils/password');
const {User}                    = require('../utils/db');
const _p                        = require('../utils/promise_errors');
const reject_validate           = require('../middleware/reject_invalid');


const signupValidator = [
    check('name').exists(),
    check('email').isEmail(),
    check('password').isLength({min: 5})
];

router.post('/signup', signupValidator, reject_validate, async (req, res, next)=>{
    let chunks                  = generate(req.body.password);
    let password                = `${chunks.salt}.${chunks.hash}`;
    let {name, email}           = req.body;
    let [ucErr, userCreated]    = await _p(User.create({
        name, email, password
    }));
    if (ucErr && !userCreated){
        next(ucErr);
    }
    else {
        res.json({
            error: false,
            message: "User created"
        })
    }
})

module.exports = router;

