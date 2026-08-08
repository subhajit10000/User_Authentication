import dns from "node:dns"
dns.setServers(['1.1.1.1', '8.8.8.8']);

import env from "./config/env.js"
import connectDB from "./database/index.js";
import logger from "./utils/logger.js";
import App from "./app.js"
const PORT = env.PORT || 5000;

const startServer = async () => {
    try {

        await connectDB();
        logger.info("Server started successfully");

        App.listen(PORT, () => {
            console.log(
                `Server running on http://localhost:${PORT}`);
        
            });

    } catch (error) {
        logger.error("Server Failed to Start");

        process.exit(1);
    }
};

startServer()