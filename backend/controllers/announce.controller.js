
const User = require('../models/User');
const Announce = require('../models/Announce');
const Profile = require('../models/Profile');

//@route POST /announce
//@desc Create a announce
//@access Private

exports.postAnnounce = async (req, res) => {
    const newAnnounce = {};
    
    let images = [];
    let countImages = 0;
    for (const { path } of req.files) {
        images[countImages] = path;
        countImages++;
    }
    newAnnounce.productImages = images;
    
    const {
        productName,
        productCategory,
        quantity,
        price,
        Description

    } = req.body;


    newAnnounce.user = req.user.id;
    newAnnounce.productName = productName;
    newAnnounce.productCategory = productCategory;
    newAnnounce.price = price;
    newAnnounce.quantity = quantity;
    newAnnounce.Description = Description;
    try {
        const profile = await Profile.findOne({ user: req.user.id }).select('-password');

        newAnnounce.userImage = profile.image;
        const user = await User.findById(req.user.id).select('-password');
        newAnnounce.userName = user.name;
        const resAnnounce =  new Announce(newAnnounce);
        const result= await resAnnounce.save();
        return res.status(200).json({response:result, msg: "added successfully" });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }


}

// @route    GET /announce
// @desc     Get all announces
// @access   Private
exports.getAllannounces = async (req, res) => {
    let val= req.query.search;
    try {
        if (val === "undefined") {
            let announce = await Announce.find().sort({ date: -1 }).populate("user");
            return  res.status(200).json(announce);
        } else {
            let announce= await Announce.find({ productCategory: val }).sort({ date: -1 }).populate("user");
            return  res.status(200).json(announce);
        }
          
        
        } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// @route    GET /announce
// @desc     Get all announces select [-(likes && comments)]
// @access   Public
exports.getAllannouncespublic = async (req, res) => {
    let skip = Number(req.query.skip);
    let limit = Number(req.query.limit);
    
    try {
        const numberOfAnnounce = (await Announce.find()).length
        
        const announces = await Announce.find().limit(limit).skip(skip).sort({ date: -1 }).select('-likes -comments');
        res.json({announces,numberOfAnnounce});
       
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
// get owner announce
// @route    GET /announce/owner
// @desc     Get announce 
// @access   Private
exports.getOwnerAnnounce=async (req,res)=>{
try {
const announce=await Announce.find({user:req.user.id}).populate("user");
   return  res.status(200).json(announce);
} catch (e) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: "Announce not found" });

    }

    res.status(500).send('Server Error');
}
}

// @route    GET /announce/:id
// @desc     Get announce by ID
// @access   Private
exports.getAnnounceById = async (req, res) => {
    try {
        const announce = await Announce.findById(req.params.id).populate("user");

        if (!announce) {
            return res.status(404).json({ msg: 'Announce not found' })
        }

        res.json(announce);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: "Announce not found" });

        }

        res.status(500).send('Server Error');
    }
}

// @route    DELETE /announce/:id
// @desc     Delete an announce
// @access   Private
exports.deleteAnnounceById = async (req, res) => {
    try {
        const announce = await Announce.findById(req.params.id);

        if (!announce) {
            return res.status(404).json({ msg: 'Announce not found' });
        }

        // Check user
        if (announce.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await announce.remove();

        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
}

//@route PUT /announce/like/:id
//@desc Like && unlike  an announce
//@access Private
exports.likeAnnounceById = async (req, res) => {
   
    try {
        const announce = await Announce.findById(req.params.id);
        //if the announce not liked 
        if (announce.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            //dislike Announce
            const removeIndex = announce.likes.map(like => like.user.toString()).indexOf(req.user.id);
            announce.likes.splice(removeIndex, 1)
            await announce.save();
            return res.json(announce.likes)

        } else {
            //like Announce
            announce.likes.unshift({ user: req.user.id })
            await announce.save();
            return res.json(announce.likes);
        }

    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');

    }
}


/*
//@route PUT /announce/unlike/:id
//@desc unlike an announce
//@access Private
exports.unlikeAnnounceById = async (req, res) => {
    try {
        const announce = await Announce.findById(req.params.id);



    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }

}*/

//@route POST announce/comment/:id
//@desc Comment an announce 
//@access Private 

exports.commentAnnounceById = async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findById(req.user.id).select('-password');
        const profile = await Profile.find({user});
       
        const announce = await Announce.findById(req.params.id);
        const newComment = {
            user: req.user.id,
            text: req.body.text,
            name: user.name,
            image: profile[0].image,

        }
        announce.comments.unshift(newComment);
        await announce.save();
        res.status(200).json(announce.comments);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

}

//@route DELETE /announce/comment/:id/:comment_id'
//@desc Comment an announce 
//@access Private 
exports.deleteCommentByAnnounceId = async (req, res) => {
    try {
        const announce = await Announce.findById(req.params.id);
        //get the comment from the announce 
        const comment = announce.comments.find(
            comment => comment.id === req.params.comment_id
        );
        //commnet Must exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });

        }
        // Test the user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not Authorized' });

        }
        // remove comment index
        const commentIndex = announce.comments
            .map(comment => comment.user.toString())
            .indexOf(req.user.id);
        announce.comments.splice(commentIndex, 1);
        await announce.save();
        return res.status(200).json(announce.comments);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('server Error')
    }
}