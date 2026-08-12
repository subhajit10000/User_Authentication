import fs from "fs";
import path from "path";

const LOG_LEVELS = {
    ERROR: "ERROR",
    WARN: "WARN",
    INFO: "INFO",
    DEBUG: "DEBUG",
};

const MAX_FILE_SIZE = 1024 * 1024; // 1 MB

const LOG_DIRECTORY = path.join(process.cwd(), "logs");

if (!fs.existsSync(LOG_DIRECTORY)) {
    fs.mkdirSync(LOG_DIRECTORY, { recursive: true });
}

const getTimestamp = () => new Date().toLocaleString('en-IN', {
  timeZone: 'Asia/Kolkata',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true // Set to false if you want 24-hour format
});


const getCurrentLogFile = () => {
    let index = 1;

    while (true) {
        const filePath = path.join(LOG_DIRECTORY, `application-${index}.log`);

        if (!fs.existsSync(filePath)) {
            return filePath;
        }

        const { size } = fs.statSync(filePath);

        if (size < MAX_FILE_SIZE) {
            return filePath;
        }

        index++;
    }
};

const writeToFile = (data) => {
    const logFile = getCurrentLogFile();

    fs.appendFileSync(logFile, data + "\n", "utf8");
};

const log = (level, message, meta = null) => {
    const output = {
        timestamp: getTimestamp(),
        level,
        message,
        ...(meta && { meta }),
    };

    const logString = JSON.stringify(output);

    writeToFile(logString);

    switch (level) {
        case LOG_LEVELS.ERROR:
            console.error(output);
            break;

        case LOG_LEVELS.WARN:
            console.warn(output);
            break;

        case LOG_LEVELS.INFO:
            console.info(output);
            break;

        default:
            console.log(output);
    }
};

const logger = {
    info(message, meta = null) {
        log(LOG_LEVELS.INFO, message, meta);
    },

    warn(message, meta = null) {
        log(LOG_LEVELS.WARN, message, meta);
    },

    error(message, meta = null) {
        log(LOG_LEVELS.ERROR, message, meta);
    },

    debug(message, meta = null) {
        if (process.env.NODE_ENV === "development") {
            log(LOG_LEVELS.DEBUG, message, meta);
        }
    },
};

export default logger;