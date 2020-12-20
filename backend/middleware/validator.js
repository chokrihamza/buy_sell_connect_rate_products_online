const { check, validationResult } = require('express-validator');

exports.RegisterRules = () => [
      check('name', 'this field is required').notEmpty(),
      check('email', 'this should be a valid email').isEmail(),
      check('email', 'this field is required').notEmpty(),
      check('password', 'this field should be at least 4 char').isLength({ min: 4 }),

]

exports.validator = (req, res, next) => {
      const errors = validationResult(req)
      errors.isEmpty() ? next() : res.status(400).json({ errors: errors.array() })
}