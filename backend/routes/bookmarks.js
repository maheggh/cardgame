//Icon routes go here
const express = require('express');
const router = express.Router();
const { bookmark, getBookmark, unBookmark, getAllUserBookmarks } = require('../controllers/bookmarkController');
const { auth, authCanUpdate } = require('../helpers/verifyToken');

// POST: Create bookmark
router.post('/', auth, bookmark);

// GET: Read single bookmark
router.get('/:id', getBookmark);

// GET: Read all user bookmarks
router.get('/', auth, getAllUserBookmarks);

// DELETE: Delete bookmark
router.delete('/:id', auth, unBookmark);

module.exports = router;