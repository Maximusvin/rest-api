const app = require('./app');
const {connect} = require('mongoose');

const {PORT = 3000, MONGO_URL} = process.env;

connect(MONGO_URL).then(() => {
    console.log('Database connection successful');

    app.listen(PORT, () => {
        console.log("Server running. Use our API on port: 3000");
    })
}).catch(error => {
    console.log(error.message);
    process.exit(1);
})
