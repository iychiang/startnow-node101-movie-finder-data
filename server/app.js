const express = require('express');
const morgan = require('morgan');
const axios = require('axios'); //require('axios').default

const app = express();
const cache = {};

app.use(morgan('dev'));

app.get('/', (req, res) => {
    console.log("Request url is: ", req.url);
    // Use axios to get your data from OMDB
    let movieKey = req.url;

    if (cache[movieKey]) {
        // then return this data
        console.log('Getting movie from cache');
        return res.json(cache[movieKey]);
    } else {
        console.log('Getting movie from OMDB movieKey:', movieKey);
        return axios.get('http://www.omdbapi.com'+ movieKey + '&apikey=8730e0e')
            .then(response => {
                let movieData = response.data;
                console.log('We got the movie data from OMDB!');
                cache[movieKey] = movieData;
                return res.json(movieData);              
            })
            .catch(err => { 
                console.log(err);
                return res.json('Error occurred');
            });
    }
});


module.exports = app;
