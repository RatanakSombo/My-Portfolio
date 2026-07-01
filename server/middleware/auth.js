// A simple middleware function to protect admin-only endpoints
export const protectAdmin = (req, res, next) => {
  // Read the secret key sent by the client in the request headers
  const clientKey = req.headers['x-admin-key'];
  
  // Retrieve the correct key from our server's environment variables (.env)
  const serverKey = process.env.ADMIN_SECRET_KEY;

  // If no key is set on the server, we let it pass (for easy local testing)
  if (!serverKey) {
    return next();
  }

  // If the client's key matches the server's key, let the request proceed
  if (clientKey === serverKey) {
    return next();
  }

  // Otherwise, return 401 (Unauthorized) to block the action
  res.status(401).json({ message: 'Access denied. Invalid or missing Admin Secret Key.' });
};
