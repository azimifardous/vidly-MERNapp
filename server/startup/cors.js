const cors = require("cors");

module.exports = function (app) {
    app.use(cors({
        origin: ["https://vidly-api-rho.vercel.app/"],
        methods: ['POST', "GET", "DELETE", "PUT"],
        credentials: true
    }));
};
