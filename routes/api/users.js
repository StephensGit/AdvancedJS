//  For handling users registering on the app
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
// Registers a user - will makes sure email doesn't already exist
//  ROUTE: POST -> api/users

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid Email').isEmail(),
    check(
      'password',
      'Please enter a password of 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //  Check to see if the user exists, sending back an error if so because we dont want multiple users with same email
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Creates a new instance of the user
      user = new User({
        name,
        email,
        password
      });

      //    Encrypt password
      //    Using 10 rounds, whats recommended
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      //  ** Reminder ** Anything that returns a promise, I need to put async in front of ----  https://www.youtube.com/watch?v=V_Kr9OSfDeU

      await user.save();

      //    Return JSON web token -- in order to be logged in, you must have a token
      //    Payload is an object, getting the id from the user that is saved above
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),

        { expiresIn: 360000 },
        //  Inside the callback we'll either get an error or the token, if token it gets sent back to client
        (err, token) => {
          if (err) throw err;
          res.json({ token });
          console.log('yo');
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
