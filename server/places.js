import request from 'request'

export default function doAPI(keyword) {
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
