const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = 10; // Adjust the salt rounds as needed
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Example
(async () => {
  const password = "test"; // Replace with your actual password
  const hashedPassword = await hashPassword(password);
  console.log("Hashed Password:", hashedPassword);
})();
