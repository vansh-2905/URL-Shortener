const shortid = require("shortid"); 
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = request.body;
    if(!body.URL) return res.status(400).json({error: "url is required"})
    const shortID = shortid(); 
    await URL.create({
        shortID: shortID,
        redirectURL: body.URL,
        visitedHistory: [],
    });

    return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.para.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ 
        totalClicks:result.visitHistory.length, 
        analytics: result.visitHistory, 
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};