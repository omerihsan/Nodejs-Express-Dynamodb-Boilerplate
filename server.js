const app = require('./app');
const http = require('http');

const port = process.env.PORT || 3000;

const httpServer = http.Server(app);

httpServer.listen(port, () => {
    console.log("Server running on port : " + port);
});