const express = require('express');
const router = express.Router();
const {
    handleGetAllURLs,
    handleGenerateNewShortURL,
    handleGetURL,
    handleGetAnalyticsOfUrl
} = require('../controllers/url_controllers');

router.route('/')
.get(handleGetAllURLs)
.post(handleGenerateNewShortURL)

router.route('/:shortId')
.get(handleGetURL);

router.route('/analytics/:shortId')
.get(handleGetAnalyticsOfUrl)

module.exports = router;