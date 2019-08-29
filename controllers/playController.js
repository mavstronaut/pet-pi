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

      // let id = (() => {
      //   const parsed = parse(song, true);
      //   if (/^(www\.)?youtube\.com/.test(parsed.hostname)) {
      //     return parsed.query.v;
      //   } else if (/^(www\.)?youtu\.be/.test(parsed.hostname)) {
      //     return parsed.pathname.slice(1);
      //   }
      // })();
    
      // let info;
      // try {
      //   info = await youtube.getVideo(id);
      // } catch (e) {
      //   return console.log(`\`An error occurred: ${e}\``);
      // }
    
      
      if (user === "mavbarona@gmail.com") {
        // plays song
        const dispatcher = yt(songTitle.link)
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
          }
        );
      } else {
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
    }
  };