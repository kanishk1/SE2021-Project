import request from 'request';
import express from 'express';

const router = express.Router();

function doAPI(keyword) {
    if (!keyword)
        return Promise.reject("Invalid parameters");

    return new Promise ((success, reject) => {
        request({
            url: "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + keyword + "&key=AIzaSyAu2xaFuNTQ0JQPUIXMILT1l29nuWYEO0Q",
            method: 'GET',
        }, (err, res, body) => {
            if (!err && res.statusCode === 200) {
                success(body);
            }
            else {
                console.log('error:', err);
                reject(JSON.stringify(err));
            }
        })
    });
}

// Google Places API
router.get('/search', (req,res) => {
    const keyword = req.query.keyword;
    doAPI(keyword)
        .then(data => res.json(data))
        .catch(err => res.send(err))
});

export default router;
