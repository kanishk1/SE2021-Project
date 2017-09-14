export default function doAPI(sort, newsSource) {
    return new Promise((response, fail) => {
        let NewsAPI = require('newsapi');
        let newsapi =   new NewsAPI('b3b394a3e7d641aabb22ffbe2a74f07b');
        newsapi.articles({
            source: newsSource,
            sortBy: sort
        }).then(articlesResponse => {
            response(articlesResponse)
        })
    })
}
