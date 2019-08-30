require('dotenv').config()
const ytapi = require('simple-youtube-api');
const {parse} = require('url');
const youtube = new ytapi(process.env.YOUTUBE_KEY) || new ytapi(YOUTUBE_KEY);
const db = require("../models")
const yt = require("ytdl-core");

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
      
       // create this variable from within the user model, might need to perform a get method for the user who is logged in to the client
      var activeUser = db.activeUsers.email;

      if (activeUser === "mavbarona@gmail.com") {
        // plays song, we will create the socket.io function here which will then have the argument dispatcher
        const dispatcher = yt(songTitle.link);
        yt(songTitle.link);
        // const dispatcher = message.guild.voiceConnection.playStream(yt(nextSong.url, {
        //   quality: 'lowest',
        //   filter: 'audioonly'
        // })
        // stops song
        dispatcher.on('end', () => {
            console.log("button unclicked");
            // message.channel.sendMessage('End of the queue, add more songs!');
            // message.guild.voiceConnection.disconnect();
            // message.client.queues.delete(message.guild.id);
          });
      } else {
        console.log("user doesn't have permission to play sound");
        // embed
        //   .setTitle(`**${info.title}** (${minutes}:${seconds}) has been added to the queue`)
        //   .setColor(0xDD2825)
        //   .setFooter(`Requested by ${message.guild.member(message.author).displayName}`, message.author.avatarURL)
        //   .setImage(`https://i.ytimg.com/vi/${info.id}/mqdefault.jpg`)
        //   .setTimestamp()
        //   .setURL(`https://www.youtube.com/watch?v=${info.id}`);
        // if (embedCheck(message)) {
        //   message.channel.sendEmbed(embed, '', {
        //     disableEveryone: true
        //   }).catch(console.error);
        // } else {
        //   message.channel.sendMessage(`**${info.title}** (${minutes}:${seconds}) has been added to the queue`);
        
      }
    }
  };