const {isValidObjectId} = require('mongoose');
const {AppError} = require('../utils');

const isValidId = (req, _, next) => {
    const {id} = req.params;

    if (!isValidObjectId(id)) {
        next(new AppError(400, `${id} is not correct id format`));
    }

    next();
};

module.exports = isValidId;