/**
 * Login response.
 */
function loginResponse(user, token) {
  return {
    message: "Login successful",
    user: {
      id: user.id,
      email: user.email,
    },
    token: token,
  };
}

module.exports = loginResponse;
