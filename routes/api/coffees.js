//  For handling users registering on the app
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Coffee = require('../../models/Coffee');
const User = require('../../models/User');

// This will get logged in user's coffee shop
// ROUTE: GET -> api/coffee/me

router.get('/me', auth, async (req, res) => {
  try {
    const coffee = await Coffee.findOne({
      user: req.user.id
    }).populate('user', 'name');

    if (!coffee) {
      return res
        .status(400)
        .json({ msg: 'There is no coffee shop for this user' });
    }

    res.json(coffee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//  This will get all coffeeshops from the database, even if not logged in
//  ROUTE: GET -> api/coffees

router.get('/', async (req, res) => {
  try {
    const coffee = await Coffee.find().populate('user', 'name');
    if (!coffee) {
      return res.status(400).json({ msg: 'No coffee shops found' });
    }
    //  Response is all coffee shops in DB
    res.json(coffee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get coffee shop by user ID_
// ROUTE: GET -> api/coffee/user/:user_id

router.get('/user/:user_id', async (req, res) => {
  try {
    const coffee = await Coffee.findOne({
      user: req.params.user_id
    }).populate('user', ['name']);

    if (!coffee) return res.status(400).json({ msg: 'Coffee not found' });

    res.json(coffee);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Coffee not found' });
    }
    res.status(500).send('Server Error');
  }
});

// This will get the coffee shop by the shop's id
//  ROUTE: -> GET api/coffee/id

router.get('/:id', auth, async (req, res) => {
  try {
    const coffee = await Coffee.findById(req.params.id);

    if (!coffee) {
      return res.status(400).json({ msg: 'Coffee shop not found ' });
    }
    //  Will return all coffee shops for the logged in user
    res.json(coffee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//  Create coffee shop added by the user
//  ROUTE: POST -> api/coffee

router.post(
  '/',
  //  Need to use the auth and validation middleware inside the sqaure brackets
  //  First one is the athentication, then the checks for the required fields
  [
    auth,
    [
      check('coffeeShopName', 'Name is required')
        .not()
        .isEmpty(),
      check('website', 'Name is required')
        .not()
        .isEmpty(),
      check('number', 'Name is required')
        .not()
        .isEmpty(),
      check('streetAddress', 'Name is required')
        .not()
        .isEmpty(),
      check('area', 'Name is required')
        .not()
        .isEmpty(),
      check('hours', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    //  Stores the result of the error checking from the post request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //  returns response of errors array if errors
      return res.status(400).json({ errors: errors.array() });
    }

    //  Using destructuring to pull all these out of the body from the post request
    const {
      coffeeShopName,
      website,
      number,
      streetAddress,
      area,
      hours
    } = req.body;

    // Build coffee object
    const coffeeFields = {};

    //  Knows the user from the token that was sent
    coffeeFields.user = req.user.id;
    if (coffeeShopName) coffeeFields.coffeeShopName = coffeeShopName;
    if (website) coffeeFields.website = website;
    if (number) coffeeFields.number = number;
    if (streetAddress) coffeeFields.streetAddress = streetAddress;
    if (area) coffeeFields.area = area;
    if (hours) coffeeFields.hours = hours;

    try {
      // Using upsert option (creates new doc if no match is found)
      let coffee = await Coffee.findOneAndUpdate(
        { user: req.user.id },
        { $set: coffeeFields },
        { new: true, upsert: true }
      );
      res.json(coffee);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// This will delete the user's coffee shop & their account
// ROUTE: DELETE -> api/coffee

router.delete('/', auth, async (req, res) => {
  try {
    // Remove user's coffee shop
    await Coffee.findOneAndRemove({ user: req.user.id });
    // Remove  the user's account
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'Coffee deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
