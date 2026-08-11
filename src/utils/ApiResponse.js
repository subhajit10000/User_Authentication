class ApiResponse {
  constructor(statusCode, message = "success", data = null) {
    this.statusCode = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;

    this.timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true // Set to false if you want 24-hour format
    });
  }
}

export default ApiResponse;
