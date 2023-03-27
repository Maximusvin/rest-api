const {isValidObjectId} = require('mongoose');
const {AppErrors} = require('../utils/errors');

exports.isValidId = (req, _, next) => {
    const {id} = req.params;

    if (!isValidObjectId(id)) {
        next(new AppErrors(400, `${id} is not correct id format`));
    }

    next();
};
