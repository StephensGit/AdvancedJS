//  For handling users registering on the app
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

//  ROUTE: GET -> api/auth

//  If middleware needs to be used, it gets added as 2nd parameter
router.get('/', auth, async (req, res) => {
  try {
    //  Using these methods on the User model, select -password will leave off the password in the data
    const user = await User.findById(req.user.id).select('-password');
    //  Send along the
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//  This will check the user is authenticated and to get the token
//  ROUTE: POST -> api/auth

router.post(
  '/',
  [
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //  Check to see if the user exists, sending back an error if so because we dont want multiple users with same email
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid user credentials' }] });
      }

      //  Need to match the user and password
      //  B crypt has a method called compare, which takes a plain text password an encrypted password and compares them
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials ' }] });
      }

      //    Return JSON web token -- in order to be logged in, you must have a token
      //    Payload is an object, getting the id from the user that is saved above, don't need to use _ (Mongoose uses abstraction)
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        //  expiration is optional
        { expiresIn: 360000 },
        //  Inside the callback we'll either get an error or the token, if token it gets sent back to client
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
