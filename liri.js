require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios")
var moment = require("moment")
var fs = require("fs")

var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);

var whatToDo = process.argv[2];
var userInput = process.argv[3];




function spotifyThis(){
spotify
  .search({ type: 'track', query: userInput, limit: 1 })
  .then(function(response) {
    console.log(JSON.stringify(response.tracks.items[0].name, null, 2));
  })
  .catch(function(err) {
    console.log(err);
  });
};


function concertThis(){
    axios.get("https://rest.bandsintown.com/artists/"+userInput+"/events?app_id=codingbootcamp&date=upcoming").then
    (function(response){
      // console.log(response)
        console.log("Name of venue is: "+ (response.data.id));
        // console.log("Venue location: "+ (response.data.Location));
        // console.log("Date of Event is: "+ (response.data.Event));
    })
}


function movieThis(){
    axios.get("http://www.omdbapi.com/?t="+userInput+"&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's title is " + (response.data.Title));
    console.log("The movie's release year is: " + (response.data.Year));
    console.log("The movie's rating is: " + (response.data.Rated));
    console.log("The movie's plot is: " + (response.data.Plot));



    
    
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}


switch(whatToDo){
    case "spotify-this-song":
        spotifyThis()
        break; 
    case "concert-artist":
        concertThis()
        break; 
    case "movie-this":
        movieThis()
        break; 
    case "do-what-it-says":
        doWhatItSays()
        break; 
        
}