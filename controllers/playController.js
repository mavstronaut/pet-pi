require('dotenv').config()
const ytapi = require('simple-youtube-api');
const {parse} = require('url');
const YOUTUBE_KEY = new ytapi(process.env.YOUTUBE_KEY) || new ytapi(YOUTUBE_KEY);


exports.run = async(client, message, args) => {
    let song = args.join(' ');
    if (!song.length) return message.reply('You need to supply a YouTube URL or a search term.');
  
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
    if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
      return message.reply('Please be in a voice channel first!');
    }
  
    if (!client.queues.has(message.guild.id)) {
      var firstSong = true;
      client.queues.set(message.guild.id, {
        dispatcher: null,
        queue: [],
        connection: null,
        position: -1
      });
      await voiceChannel.join();
    }
  
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
  
    let info;
    try {
      info = await youtube.getVideo(id);
    } catch (e) {
      return message.channel.sendMessage(`\`An error occurred: ${e}\``);
    }
  
    if (message.author.permLevel < 2 && parseInt(info.durationSeconds) > 900) return message.reply('Songs can be no longer than 15 minutes.').catch(console.error);
    let time = parseInt(info.durationSeconds, 10);
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) seconds = '0' + seconds;
    client.queues.get(message.guild.id).queue.push({
      url: `https://www.youtube.com/watch?v=${info.id}`,
      id: info.id,
      channName: info.channel.title,
      songTitle: info.title,
      playTime: `${minutes}:${seconds}`,
      playTimeSeconds: info.durationSeconds,
      requester: message.guild.member(message.author).displayName,
      requesterIcon: message.author.avatarURL
    });
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
  };