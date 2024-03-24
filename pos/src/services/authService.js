export const loginUser = async (username, password) => {
  // Simulate a login attempt (replace with your actual logic)
  if (username === 'user' && password === '123') {
    return { success: true };
  } else {
    return { success: false, error: 'Invalid username or password' };
  }
};