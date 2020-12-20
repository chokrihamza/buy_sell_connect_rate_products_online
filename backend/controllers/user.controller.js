const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const secretorKey = config.get('secretorKey');
exports.register = async (req, res) => {

      const { name, email, password, phoneNumber } = req.body
      try {
            const searchRes = await User.findOne({ email });
            if (searchRes) return res.status(401).json({ errors: [{ msg: "user already exist" }] });
            const newUser = new User({ name, email, password, phoneNumber });
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            newUser.password = hash;
            await newUser.save();
            res.status(201).json(newUser);

      } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });

      }


}

exports.login = async (req, res) => {
      const { email, password } = req.body;
      try {
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ msg: "bad credentials"});
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ msg:"bad credentials" });
            //token go here npm json web token
            const payload = {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  phoneNumber: user.phoneNumber
            }
            //we define the key at default.json
            const token = await jwt.sign(payload, secretorKey);
            res.status(200).json({ token: `Bearer ${token}` });




      } catch (error) {
            console.log(error);
            res.status(500).json({ errors: error });
      }
}