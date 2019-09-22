const router        = require('express').Router();
const {Direction}   = require('../utils/db');
const {check}       = require('express-validator/check');
const rejectInvalid = require('../middleware/reject_invalid');
const _p            = require('../utils/promise_errors');

const entryValidator = [check('url').isURL()];

router.post('/api/v1/redirects', entryValidator, rejectInvalid, async (req, res, next)=>{
    let user_id     = req.user.id;
    let destination = req.body.url;
    let timestamp   = Date.now()/1000;
    let hash        = parseInt(`${user_id}${timestamp}`).toString(32);
    let [createErr, created] = await _p(Direction.create({
        user_id, destination, hash
    }));
    if (createErr && !created){
        next(createErr);
    }
    else {
        res.json({
            message: "Direction created successfully",
            hash
        });
    }
})

router.get('/api/v1/redirects', async (req, res)=>{
    let [dbErr, myDirection] = await _p(Direction.findAll({
        where: {
            user_id: req.user.id
        },
        limit: 10
    }));
    if (dbErr){
        next(dbErr);
    }
    else {
        res.json(myDirection.map(d=>{return {user_id: d.user_id, destination: d.destination, hash: d.hash, createdAt: d.createdAt }}));
    }


})

module.exports = router;
