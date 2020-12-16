// Initialize express router
let router = require('express').Router();
const mongoose = require('mongoose');
const Url = require('../db/url-model');
const { check, body, validationResult } = require('express-validator');

router.post('/', [    
    check('email').isEmail().normalizeEmail(),
    check('url').isURL(),
    check('category').not().isEmpty(),
  ], async function (req, res) {
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
   
    const { email, url,category,details,ip } = req.body;

    let urlDefinition = {};
    urlDefinition.email = email;
    urlDefinition.url = url;
    urlDefinition.category = category;
    urlDefinition.details = details;
    urlDefinition.ip = ip;

    let urlModel = new Url(urlDefinition);
    await urlModel.save(function (err) {
        if (err){
            res.json(err);
        }else{
            res.json(urlModel);
        }
            

   });

});

module.exports = router;