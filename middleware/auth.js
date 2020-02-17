const jwt = require('jsonwebtoken');
const config = require('config');

//  Exporting a middleware fucntion that has the request and response object available to it
module.exports = function(req, res, next) {
  // Get the token from the header using req.header
  // Then send the token in x-auth-token, this is the header key
  const token = req.header('x-auth-token');

  // Check if there is no token and if the route is protected with this middleware, sends 401 msg
  if (!token) {
    console.log('no token');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // VERIFY TOKEN
  try {
    // If there's a valid token, decodes it with jwt.verify, It puts it in the dedcoded object
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    //  Then set the requested user to the user in the decoded object, then can use req.user in any of the routes
    req.user = decoded.user;
    next();
  } catch (err) {
    // If there is a token but it's not valid, then it runs this catch
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
