require('dotenv').config()
const ytapi = require('simple-youtube-api');
const {parse} = require('url');
const youtube = new ytapi(process.env.YOUTUBE_KEY) || new ytapi(YOUTUBE_KEY);
const db = require("../models")
const yt = require("ytdl-core");

// for server local socket event response
const ss = require('socket.io-stream');
const app = express();
const io = require('socket.io').listen(app);

// from local play 
// const http = require('http');
// const fileSystem = require('fs');
// const express = require('express');
// const ss = require('socket.io-stream');
// const path = require('path');
// const app = express();
// const api = express();


// require the owner controller so we can get the active user
// const userController = require("./userController");

// message, args
module.exports = {
    searchSong: async(req, res) => {
      // if we wanted to do a search, this is the function

      let id = (() => {
        const parsed = parse(song, true);
        if (/^(www\.)?youtube\.com/.test(parsed.hostname)) {
          return parsed.query.v;
        } else if (/^(www\.)?youtu\.be/.test(parsed.hostname)) {
          return parsed.pathname.slice(1);
        }
      })();
    
      if (!id) {
        let results = await youtube.searchVideos(song, 4);
        id = results[0].id;
      }

        // some validation early on 
        if (user === "mavbarona@gmail.com" && parseInt(info.durationSeconds) > 900) return console.log('Songs can be no longer than 15 minutes.').catch(console.error);
        
        // in the event we want to add minutes and seconds to the data model 
        let time = parseInt(info.durationSeconds, 10);
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        if (seconds < 10) seconds = '0' + seconds; 

        function addNew (req, res)  {

          db.SavedSounds
          .create({
              title: req.body.title,
              link: req.body.link,
              type: req.body.type, // is the type part of the req.body.type? it will come from the form
              key: req.body.key
          })
          .then(res.end())
      }

      addNew(id);

    },
    playSong: async(req, res) => { 
      let songTitle = ""
      
      db.SavedSounds
        .findById({ _id: req.params.id })
        .then(dbModel => songTitle.json(dbModel))
        .catch(err => res.status(422).json(err));
      

      var id = songTitle.link;
      console.log(id);

      //  check user model for all id's 
      db.Users
        .findById({ _id: req.params.id })
        .then(dbModel => activeUsers.json(dbModel))
        .catch(err => res.status(422).json(err));
        
       // create this variable from within the user model, might need to perform a get method for the user who is logged in to the client
      var activeUser = db.activeUsers.email;

      if (activeUser === "mavbarona@gmail.com") {
        // plays song, we will create the socket.io function here which will then have the argument dispatcher
        const navigator = yt(songTitle.link);
        
        
        
        
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            // window.URL.createObjectURL = window.URL.createObjectURL || window.URL.webkitCreateObjectURL || window.URL.mozCreateObjectURL || window.URL.msCreateObjectURL;
        
            navigator.getUserMedia({video: true}, function (id) {
              allow.style.display = "none";
              // videoStreamUrl = window.URL.createObjectURL(stream);
              videoStreamUrl = id;
              video.src = videoStreamUrl;
            }, function () {
              console.log('streaming error');
            });
         
     
        


          // for streaming a local sound file
        /*
           // generate file path
            const filePath = path.resolve(__dirname, './audio', './'+req);
            // get file size info
            const stat = fileSystem.statSync(filePath);

            // set response header info
            res.writeHead(200, {
              'Content-Type': 'audio/mpeg',
              'Content-Length': stat.size
            });
            //create read stream
            const readStream = fileSystem.createReadStream(filePath);
            // attach this stream with response stream
            readStream.pipe(res);
          });

          //register api calls
          app.use('/api/v1/', api);

          // send react app on / GET
          app.use(express.static(path.resolve(__dirname, './public/build/')));
          app.use(express.static(path.resolve(__dirname, './public/assets/')));
          app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, './public/build/', './index.html'));
          });

          const server = http.createServer(app);
          const io = require('socket.io').listen(server, {
            log: false,
            agent: false,
            origins: '*:*',
            transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
          });

          io.on('connection', client => {

            const stream = ss.createStream();

            client.on('track', () => {
              const filePath = path.resolve(__dirname, './private', './track.wav');
              const stat = fileSystem.statSync(filePath);
              const readStream = fileSystem.createReadStream(filePath);
              // pipe stream with response stream
              readStream.pipe(stream);

              ss(client).emit('track-stream', stream, { stat });
            });
            client.on('disconnect', () => {});
          }); */

        // deprecated 
        // const dispatcher = message.guild.voiceConnection.playStream(yt(nextSong.url, {
        //   quality: 'lowest',
        //   filter: 'audioonly'
        // })


        // stops song (doesn't work, i think this will be a front end solution instead.)
        dispatcher.on('end', () => {
            console.log("button unclicked");
          
            
          });
      } else {
        console.log("user doesn't have permission to play sound");
        
        
      }
    }
  };