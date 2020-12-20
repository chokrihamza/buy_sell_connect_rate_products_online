const express = require('express');

const router = express.Router();
const uploadImageProfile = require('../middleware/uploadImageProfile')
const isAuth = require('../middleware/passport-setup');

const { getOwner,
      postProfile,
      getAllProfiles,
      getProfileByUserId,
      deleteProfile,
      putSeasonalProduct,
      deleteSeasonalProduct
} = require('../controllers/profile.controller');

const { profileRules,
      validator,

} = require('../middleware/validatorProfile');

const { SeasonalProductRules } = require('../middleware/validatorSeasonalProduct')
//get models

//@route GET /profile/owner
//@desc Get current user profile
// @access Private

router.get('/owner', isAuth(), getOwner);
// @route    POST /profile
// @desc     Create or update user profile
// @access   Private

router.post('/', isAuth(),uploadImageProfile, postProfile);

// @route    GET /profile
// @desc     Get all profiles
// @access   Public
router.get('/', getAllProfiles);


// @route    GET /profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', getProfileByUserId);
// @route    DELETE /profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', isAuth(), deleteProfile);
// @route    PUT /profile/SeasonalProduct
// @desc     Add SeasonalProduct to Profile
// @access   Private
router.put('/SeasonalProduct', isAuth(), SeasonalProductRules(), validator, putSeasonalProduct)
// @route    DELETE /profile/SeasonalProduct/:SeasonalProduct_id
// @desc     Delete SeasonalProduct from profile
// @access   Private
router.delete('/SeasonalProduct/:SeasonalProduct_id', isAuth(), deleteSeasonalProduct)

module.exports = router;