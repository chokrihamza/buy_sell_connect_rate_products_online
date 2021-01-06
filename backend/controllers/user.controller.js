const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const secretorKey = config.get('secretorKey');
const { OAuth2Client } = require('google-auth-library');
const { response } = require("express");
const client=new OAuth2Client("150615739463-oerm2joto994o9g4sqeol69uj5oj5011.apps.googleusercontent.com")
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


exports.googleLogin= async (req, res) => {
    let {tokenId}  = req.body;
    
      try {
            let response = await client.verifyIdToken({idToken:tokenId, audience: "150615739463-oerm2joto994o9g4sqeol69uj5oj5011.apps.googleusercontent.com" });
            const { email_verified, name, email } = response.payload;
            if (email_verified) {
                  user = await User.findOne({ email })
                  if (user) {
                        const payload = {
                              id: user._id,
                              name: user.name,
                              email: user.email,
                             
                        }
                        //we define the key at default.json
                        const token = await jwt.sign(payload, secretorKey);
                        res.status(200).json({ token: `Bearer ${token}` });
                  } else {
                        const newUser = new User({ name, email });
                        const user = await newUser.save();
                        const payload = {
                              id: user._id,
                              name: user.name,
                              email: user.email,
                             
                        }
                        const token = await jwt.sign(payload, secretorKey);
                        res.status(200).json({ token: `Bearer ${token}` });
                  }
            }
           
      } catch (error) {
            console.log(error);
            res.status(500).json({ errors: error });
      }
      
    
   
    
   
  }

exports.facebookLogin =async (req, res) => {
      const {name, email}=req.body
     
      try {
           
          
                  user = await User.findOne({ email })
                  if (user) {
                        const payload = {
                              id: user._id,
                              name: user.name,
                              email: user.email,
                             
                        }
                        //we define the key at default.json
                        const token = await jwt.sign(payload, secretorKey);
                        res.status(200).json({ token: `Bearer ${token}` });
                  } else {
                        const newUser = new User({ name, email });
                        const user = await newUser.save();
                        const payload = {
                              id: user._id,
                              name: user.name,
                              email: user.email,
                             
                        }
                        const token = await jwt.sign(payload, secretorKey);
                        res.status(200).json({ token: `Bearer ${token}` });
                  }
            
           
      } catch (error) {
            console.log(error);
            res.status(500).json({ errors: error });
      }
      
}