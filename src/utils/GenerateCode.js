function generateCode(prefix, number) {
  // Combine the prefix and the generate number
  return `${prefix}${number.toString().padStart(3, "0")}`;
}

// Export module
module.exports = generateCode;
