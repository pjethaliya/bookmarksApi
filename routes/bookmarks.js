const express = require('express');
const router = express.Router();
const { Bookmark,validate } = require('../models/bookmark')
const { Tag } = require("../models/tag");
const auth = require("../middleware/auth");
router.get('/',async (req,res)=>{
    const bookmarks = await Bookmark.find().sort("title");
    res.send(bookmarks);
});

router.post('/', auth, async (req,res)=>{
    const isValidRequest = validate(req.body);
    if(isValidRequest.error) return res.status(400).send(isValidRequest.error.details[0].message);

    let tag = await Tag.findById(req.body.tagId);
    if(!tag) return res.status(400).send('Invalid Tag');

    let bookmark  = new Bookmark({
        title:req.body.title,
        link:req.body.link,
        tag:{
            _id:tag._id,
            name:tag.name
        }
    });
    bookmark = await bookmark.save();
    res.send(bookmark);
});

/* router.put('/:id',async(req,res)=>{
    const tag = await Tag.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
    if(!tag) res.status(404).send('This tag doesnt exists');
    res.send(tag);
});

router.delete('/:id',async(req,res)=>{
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if(!tag) res.status(404).send('This tag doesnt exists');
    res.send(tag);
}); */

module.exports = router;