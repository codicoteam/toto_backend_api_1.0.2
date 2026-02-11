const adminController = require("./controllers/admin_controller.js");

console.log("Testing admin login...");

// Mock request and response
const mockReq = {
  body: {
    email: "admin@example.com",
    password: "password123"
  }
};

const mockRes = {
  json: function(data) {
    console.log("Login Response:", JSON.stringify(data, null, 2));
    return this;
  },
  status: function(code) {
    console.log("Status Code:", code);
    return this;
  }
};

// Test the login
adminController.login(mockReq, mockRes).then(() => {
  console.log("✓ Login test completed");
}).catch(err => {
  console.log("✗ Login error:", err.message);
});
