class ApiError extends Error {
  constructor(statusCode, message = "something went wrong", errors = []) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;
    this.message = message;
    this.timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Set to false if you want 24-hour format
    });

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
