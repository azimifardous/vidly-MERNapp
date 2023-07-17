const express = require('express');
const logger = require('./startup/logger')();
const app = express();

require('./startup/logging')();
require('./startup/validation')();
require("./startup/cors")(app);
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);


const port = process.env.PORT || 3900;
app.listen(port, () => {
    logger.info(`Listening on port ${port}...`);
})


