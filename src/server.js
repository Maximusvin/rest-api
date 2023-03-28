const app = require('./app');
const {connect} = require('mongoose');

const {PORT = 3000, MONGO_URL} = process.env;

const runServer = async () => {
    try {
        await connect(MONGO_URL);

        app.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
        })
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

runServer();
