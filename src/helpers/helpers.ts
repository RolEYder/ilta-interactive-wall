// GET CURRENT TMESTAMP
const getTimeStamp = () => {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  return timestamp;
};

// Firebase ErrorHandle
const getMessageFromErrorCode = (errorCode: string) => {
  switch (errorCode) {
    case "ERROR_EMAIL_ALREADY_IN_USE":
    case "account-exists-with-different-credential":
    case "auth/invalid-email":
      return "Login failed. Invalid email";
    case "auth/wrong-password":
      return "Login failed. Wrong password";
    case "email-already-in-use":
      return "Email already used. Go to login page.";
    case "ERROR_WRONG_PASSWORD":
    case "wrong-password":
      return "Wrong email/password combination.";
    case "ERROR_USER_NOT_FOUND":
    case "user-not-found":
      return "No user found with this email.";
    case "ERROR_USER_DISABLED":
    case "user-disabled":
    case "ERROR_TOO_MANY_REQUESTS":
    case "operation-not-allowed":
      return "Too many requests to log into this account.";
    case "ERROR_OPERATION_NOT_ALLOWED":
    case "ERROR_INVALID_EMAIL":
    case "invalid-email":
      return "Email address is invalid.";
    default:
      return "Login failed. Please try again.";
  }
};

export { getTimeStamp, getMessageFromErrorCode };
