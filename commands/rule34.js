module.exports = {
	name: 'rule34',
	execute(msg, args) {
    const Discord = require("discord.js");
    const posts = require("rule34js").posts
    const embed = new Discord.MessageEmbed();
    
    const sendEmbededImage = async (tag, pageNumber) => {
      try{
        const response = await posts({tags: [tag], limit:100, pid: pageNumber});
        const link = response.posts[Math.floor(Math.random() * 100)].file_url;
        
        if(link.endsWith(".mp4") || tag === "video"){
          msg.channel.send(link);
        }else{
          embed.setImage(link).setColor("#FF1493").setTitle(tag.charAt(0).toUpperCase() + tag.slice(1)).setURL(link).setAuthor("rule34", "https://i.pinimg.com/originals/d9/51/bb/d951bbee810ba54ba379ec286a57a073.png", "https://www.npmjs.com/package/rule34js");
          msg.reply(embed);
        }
      }catch{
        msg.reply("Wrong tag: " + tag);
      }
    }
    
    if(args[2] === undefined){
      sendEmbededImage(args[1], 1);
    }else sendEmbededImage(args[1], args[2]);
	},
}