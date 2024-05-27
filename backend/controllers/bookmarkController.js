const Bookmarks = require('../schemas/bookmarkSchema');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const bookmark = async (req, res) => {
    const scheme = new ObjectId(req.params.id);
    const bookmark = new Bookmarks({
        'creator': req.user._id,
        'scheme': scheme
    });

    try {
        const a1 = await bookmark.save();
        res.status(201).json({ message: 'Bookmark created successfully', Bookmark: a1 });
    } catch (err) {
        console.log(err.code);
        res.status(500).send('Error: ' + err);
    }
};

const getBookmark = async (req, res) => {
    const _id = req.params.id;
    console.log(_id);
    console.log(req.user);
    try {
        const bookmark = await Bookmarks.findOne({ creator: req.user._id, scheme: _id });
        if (!bookmark) {
            return res.status(204).json({ error: 'Could not find bookmark. bookmark not found' });
        }
        res.status(200).json(bookmark);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
};

const unBookmark = async (req, res) => {
    console.log('removing bookmark'); // Log request body
    return res.sendStatus(200);
};

const getAllUserBookmarks = async (req, res) => {
    const _id = req.params.id;
    console.log(_id);
    console.log(req.user);
    try {
        const bookmarks = await Bookmarks.find({ creator: req.user._id }).populate('scheme');

        const schemes = bookmarks.map(bookmark => bookmark.scheme);

        if (!bookmarks) {
            return res.status(204).json({ error: 'Could not find bookmark. bookmark not found' });
        }
        res.status(200).json(schemes);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
};

const isBookmarked = async (req, res) => {
    const _id = req.params.id;
    try {
        const bookmark = await Bookmarks.find({ scheme: _id });

        if (!bookmark) {
            return res.status(204).json({ error: 'Could not find bookmark. bookmark not found' });
        }
        if(bookmark.length > 0){
            res.status(200).json({bookmarked: true});
        }
        else{
          res.status(200).json({bookmarked: false});  
        }
        
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
};


module.exports = { bookmark, getBookmark, unBookmark, getAllUserBookmarks, isBookmarked };
