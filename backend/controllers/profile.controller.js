const Profile = require("../models/Profile");
const Announce = require('../models/Announce');
// @ controller for owner profile
// @route    GET profile/owner
// @desc     Get current users profile
// @access   Private

exports.getOwner = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user");
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
// @ controller for posting profiles
// @route    POST /profile
// @desc     Create or update user profile
// @access   Private
exports.postProfile = async (req, res) => {
  
  
  if (req.body.location === 'undefined') {
    return res.status(400).json({message:"location is required"});
  }
  if (req.body.adresse==='undefined') {
    return res.status(400).json({message:"adresse is required"});
  }
  if (req.body.farmerDomaine==='undefined') {
    return res.status(400).json({message:"farmerDomaine is required"});
  }

  
  // destructure the request
  const { location, farmerDomaine, adresse } = req.body;
  
  const newprofile = {};

  newprofile.user = req.user.id;
  newprofile.location = location;
  newprofile.adresse = adresse;
  
  if (req.file !== undefined) {
    newprofile.image = req.file.path;
  } else {
    newprofile.image ="assets\\avatarimage.png"
      
  }

  // farmerDomaine - Spilt into array
  if (farmerDomaine) {
    newprofile.farmerDomaine = farmerDomaine
      .split(",")
      .map((skill) => skill.trim());
  }
 

  try {
    //creates new doc if no profile  is found
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: newprofile },
        {
          useFindAndModify: false,
          new: true,
        }
      );
      return res.json(profile);
    }
    //Create
    
    profile = new Profile(newprofile);
    const result=await profile.save();
    res.status(200).send({message:"profile saved",response:result});
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};
// @ controller for getting all profiles
// @route    GET /profile
// @desc     Get all profiles
// @access   Public
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user");
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// @ controller getting profile by user id
// @route    GET /profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public

exports.getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user");
    if (!profile) return res.status(400).json({ msg: "profile not found" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "objectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    return res.status(500).json({ msg: "Server error" });
  }
};
// @route    DELETE /profile
// @desc     Delete profile, user & posts
// @access   Private
exports.deleteProfile = async (req, res) => {
  try {
    // Remove users posts
    await Announce.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
// @route    PUT /profile/SeasonalProduct
// @desc     Add SeasonalProduct to Profile
// @access   Private
exports.putSeasonalProduct = async (req, res) => {
  const { ProductName, from, to, description } = req.body;

  try {
    await Profile.findOneAndUpdate(
      { user: req.user.id },

      {
        $push: {
          SeasonalProduct: {
            ProductName,
            from,
            to,
            description,
          },
        },
      }
    );

    res.status(200).json({ msg: "Seasonal Product added successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
// @route    DELETE /profile/SeasonalProduct/:SeasonalProduct_id
// @desc     Delete SeasonalProduct from profile
// @access   Private
exports.deleteSeasonalProduct = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // search the index and remove it
    const removeproduct = profile.SeasonalProduct.map(
      (item) => item.id
    ).indexOf(req.SeasonalProduct_id);
    profile.SeasonalProduct.splice(removeproduct, 1);

    await profile.save();
    return res.status(200).json({ profile, msg: "Deleted Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
