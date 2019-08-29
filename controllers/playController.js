require('dotenv').config()
const ytapi = require('simple-youtube-api');
const {parse} = require('url');
const youtube = new ytapi(process.env.YOUTUBE_KEY) || new ytapi(YOUTUBE_KEY);
const db = require("../models")


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

    },
    playSong: async(req, res) => { 
      let songTitle = ""
      
      db.SavedSounds
        .findById({ _id: req.params.id })
        .then(dbModel => songTitle.json(dbModel))
        .catch(err => res.status(422).json(err));
      
      var id = songTitle.link;
      console.log(id);

      let id = (() => {
        const parsed = parse(song, true);
        if (/^(www\.)?youtube\.com/.test(parsed.hostname)) {
          return parsed.query.v;
        } else if (/^(www\.)?youtu\.be/.test(parsed.hostname)) {
          return parsed.pathname.slice(1);
        }
      })();
    
      let info;
      try {
        info = await youtube.getVideo(id);
      } catch (e) {
        return console.log(`\`An error occurred: ${e}\``);
      }
    
      if (message.author.permLevel < 2 && parseInt(info.durationSeconds) > 900) return console.log('Songs can be no longer than 15 minutes.').catch(console.error);
      let time = parseInt(info.durationSeconds, 10);
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (seconds < 10) seconds = '0' + seconds;
      
      
      if (firstSong) {
        playNext(message);
      } else {
        embed
          .setTitle(`**${info.title}** (${minutes}:${seconds}) has been added to the queue`)
          .setColor(0xDD2825)
          .setFooter(`Requested by ${message.guild.member(message.author).displayName}`, message.author.avatarURL)
          .setImage(`https://i.ytimg.com/vi/${info.id}/mqdefault.jpg`)
          .setTimestamp()
          .setURL(`https://www.youtube.com/watch?v=${info.id}`);
        if (embedCheck(message)) {
          message.channel.sendEmbed(embed, '', {
            disableEveryone: true
          }).catch(console.error);
        } else {
          message.channel.sendMessage(`**${info.title}** (${minutes}:${seconds}) has been added to the queue`);
        }
      }
    }
  };