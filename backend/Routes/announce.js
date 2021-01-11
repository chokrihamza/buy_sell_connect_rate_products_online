const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/passport-setup');
const { postAnnounce,
      getAllannounces,
      getAnnounceById,
      deleteAnnounceById,
      likeAnnounceById,
      commentAnnounceById,
      deleteCommentByAnnounceId,
      getAllannouncespublic,
      getOwnerAnnounce

} = require('../controllers/announce.controller');
const { AnnounceRules } = require('../middleware/validatorAnnounce');
const { validator } = require('../middleware/validator')
const { upload } = require('../middleware/uploadProductImages');
const { CommentAnnounceRules } = require('../middleware/validatorCommentAnnounce');
// @route    GET /announce
// @desc     Get all announces select [-(likes && comments)]
// @access   Public
router.get('/pubannounce', getAllannouncespublic);
// @route    POST /announce
// @desc     Create an announce
// @access   Private
router.post('/', isAuth(), upload.array('imagesProduct', 10), postAnnounce);
// @route    GET /announce
// @desc     Get all Announces
// @access   Private
router.get('/', isAuth(), getAllannounces);
router.put('/like/:id', isAuth(),likeAnnounceById);
// get owner announce
// @route    GET /announce/owner
// @desc     Get announce by ID
// @access   Private
router.get('/owner', isAuth(), getOwnerAnnounce);

// @route    GET /announce/:id
// @desc     Get announce by ID
// @access   Private
router.get('/:id', isAuth(), getAnnounceById);






// @route    DELETE /announce/:id
// @desc     Delete an announce
// @access   Private
router.delete('/:id', isAuth(), deleteAnnounceById);
//@route PUT /announce/like/:id
//@desc Like an announce
//@access Private

//@route POST announce/comment/:id
//@desc Comment an announce 
//@access Private 

router.post('/comment/:id', isAuth(), CommentAnnounceRules(), validator, commentAnnounceById)
//@route DELETE announce/comment/:id/:comment_id'
//@desc Comment an announce 
//@access Private 
router.delete('/comment/:id/:comment_id', isAuth(), deleteCommentByAnnounceId);

module.exports = router;