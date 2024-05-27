//Icon routes go here
const express = require('express');
const router = express.Router();
const { bookmark, getBookmark, unBookmark, getAllUserBookmarks, isBookmarked } = require('../controllers/bookmarkController');
const { auth, authCanUpdate } = require('../helpers/verifyToken');

// POST: Create bookmark
router.post('/:id', auth, bookmark);

// GET: Read all user bookmarks
router.get('/', auth, getAllUserBookmarks);

// GET: Read single bookmark
router.get('/:id',auth, getBookmark);

// GET: Read single bookmark
router.get('/bookmarked/:id',auth, isBookmarked);

// DELETE: Delete bookmark
router.delete('/:id',auth, unBookmark);

module.exports = router;