const { check, validationResult } = require('express-validator');

exports.profileRules = () => [
      check('location', 'location is required ').not().isEmpty(),
      check('farmerDomaine', 'farmerDomaine is required ').not().isEmpty(),
      check('adresse', 'adresse is required ').not().isEmpty(),
]

exports.validator = (req, res, next) => {
      const errors = validationResult(req)
      errors.isEmpty() ? next() : res.status(400).json({ errors: errors.array() })
}