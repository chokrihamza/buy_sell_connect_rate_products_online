const { check } = require('express-validator');

exports.SeasonalProductRules = () => [
      check('ProductName', 'ProductName is required ').notEmpty(),
      check('from', 'date is required').notEmpty(),
      check('to', 'date is required').notEmpty(),
      check('description', 'description is required ').notEmpty(),
]

