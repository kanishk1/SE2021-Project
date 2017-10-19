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

function doDetailsAPI(data) {
    if (!data.results[0]) {
        return Promise.reject("Coudn't get data from search API");
    }

    return new Promise (function(resolve, reject) {
        request({
            url: "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + data.results[0].place_id + "&key=AIzaSyAu2xaFuNTQ0JQPUIXMILT1l29nuWYEO0Q",
            method: 'GET',
        }, (err, res, body) => {
            if (!err && res.statusCode === 200) {
                resolve(body);
            } else {
                console.log('error: ', err);
                reject(JSON.stringify(err));
            }
        });
    });
}

// Google Places API
router.get('/search', (req,res) => {
    const keyword = req.query.keyword;
    doAPI(keyword)
        .then(data => res.end(data))
        .catch(err => res.json({error: '' + err}));
});


router.get('/details', (req, res) => {
    const keyword = req.query.keyword;
    doAPI(keyword)
        .then(function(data) {
            return doDetailsAPI(JSON.parse(data));
        })
        .then(function(response) {
            res.end(response);
        })
        .catch((err) => res.json({error: '' + err}));
});

export default router;
