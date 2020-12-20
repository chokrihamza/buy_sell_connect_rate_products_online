const { check } = require('express-validator');

exports.CommentAnnounceRules = () => [
      check('text', 'Comment content is required ').notEmpty(),

]
