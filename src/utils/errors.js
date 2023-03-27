class AppErrors extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

class NotAuthorizedError extends Error {
    constructor(message) {
        super(message || 'Unauthorized');
        this.status = 401;
    }
}

module.exports = {
    AppErrors,
    NotAuthorizedError,
};