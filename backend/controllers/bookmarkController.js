const Bookmarks = require('../schemas/bookmarkSchema');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

// Function to create a new bookmark
const bookmark = async (req, res) => {
    // Convert scheme ID from request parameters to a MongoDB ObjectId
    const scheme = new ObjectId(req.params.id);

    // Create a new Bookmark instance with the creator and scheme information
    const bookmark = new Bookmarks({
        'creator': req.user._id,
        'scheme': scheme
    });

    try {
        // Save the new bookmark to the database
        const a1 = await bookmark.save();

        res.status(201).json({ message: 'Bookmark created successfully', Bookmark: a1 });
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
};

// Function to get a specific bookmark by scheme ID
const getBookmark = async (req, res) => {
    const _id = req.params.id;

    try {
        // Find the bookmark that matches the creator and scheme
        const bookmark = await Bookmarks.findOne({ creator: req.user._id, scheme: _id });

        if (!bookmark) {
            return res.status(204).json({ error: 'Could not find bookmark. Bookmark not found' });
        }

        // Send the found bookmark
        res.status(200).json(bookmark);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
};

// Function to delete a specific bookmark by scheme ID
const unBookmark = async (req, res) => {
    const _id = req.params.id;

    try {
        // Find and delete the bookmark that matches the creator and scheme
        const rating = await Bookmarks.findOneAndDelete({ creator: req.user._id, scheme: _id });
        if (!rating) {
            return res.status(404).json({ error: 'Could not delete bookmark. Bookmark not found' });
        }
        res.status(200).json({ message: 'Bookmark deleted successfully', Rating: rating });
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
};

// Function to get all bookmarks of the authenticated user
const getAllUserBookmarks = async (req, res) => {
    try {
        // Find all bookmarks for the authenticated user and populate the related scheme data
        const bookmarks = await Bookmarks.find({ creator: req.user._id }).populate('scheme');
        const schemes = bookmarks.map(bookmark => bookmark.scheme);
        if (!bookmarks) {
            return res.status(204).json({ error: 'Could not find bookmark. Bookmark not found' });
        }

        // Send the list of schemes
        res.status(200).json(schemes);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
};

// Function to check if a specific scheme is bookmarked by any user
const isBookmarked = async (req, res) => {
    const _id = req.params.id;

    try {
        // Find bookmarks for the given scheme ID
        const bookmark = await Bookmarks.find({ scheme: _id });
        if (!bookmark) {
            return res.status(204).json({ error: 'Could not find bookmark. Bookmark not found' });
        }
        if (bookmark.length > 0) {
            res.status(200).json({ bookmarked: true });
        } else {
            res.status(200).json({ bookmarked: false });
        }
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
};

// Export the functions for use in other parts of the application
module.exports = { bookmark, getBookmark, unBookmark, getAllUserBookmarks, isBookmarked };
