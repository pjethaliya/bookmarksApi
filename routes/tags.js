const express = require('express');
const router = express.Router();
const {Tag, validate} = require('../models/tag');
const auth = require('../middleware/auth');

router.get('/',async (req,res)=>{
    const tags = await Tag.find().sort("name");
    res.send(tags);
});

router.post('/', auth, async (req,res)=>{
    const isValidRequest = validate(req.body);
    if(isValidRequest.error) return res.status(400).send(isValidRequest.error.details[0].message);

    let tag = await Tag.findOne({name:req.body.name});
    if(tag) return res.status(400).send('Tag Already exists');

    tag = new Tag({
        name:req.body.name
    });
    tag = await tag.save();
    res.send(tag);

});

router.put('/:id',async(req,res)=>{
    const tag = await Tag.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
    if(!tag) res.status(404).send('This tag doesnt exists');
    res.send(tag);
});

router.delete('/:id',async(req,res)=>{
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if(!tag) res.status(404).send('This tag doesnt exists');
    res.send(tag);
});

module.exports = router;