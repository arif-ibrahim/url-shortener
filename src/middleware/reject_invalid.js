const {validationResult} = require('express-validator/check');

module.exports = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res
            .status(422)
            .json({
                error: true,
                message: errors.array(),
            })
    }
    else {
        next();
    }
}