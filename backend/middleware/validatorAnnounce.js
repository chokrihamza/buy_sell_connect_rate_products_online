const { check } = require('express-validator');

exports.AnnounceRules = () => [
      check('productName', 'productName is required ').notEmpty(),
      check('productCategory', 'productCategory is required ').notEmpty(),
      check('quantity', 'quantity is required ').notEmpty(),
      check('price', 'price is required ').notEmpty(),
      check('Description', 'Description is required ').notEmpty(),
]
