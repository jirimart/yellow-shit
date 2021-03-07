module.exports = {
	name: 'hmtai',
	execute(msg, args) {
    const Discord = require("discord.js");
    const embed = new Discord.MessageEmbed();
    const hmtai = require("hmtai");
    const variants = require("./hmtai.json").variants;
    
    const sendEmbededImage = (variant) => {
      try{
        let img;

        // checks if the variant is sfw or nsfw
        if(variants.slice(Math.max(variants.length - 4, 0)).indexOf(variant) > -1){
          img = eval("hmtai." + variant + "();");
        }else img = eval("hmtai.nsfw." + variant + "();");

        embed.setImage(img).setColor("#FF1493").setTitle(variant.charAt(0).toUpperCase() + variant.slice(1)).setURL(img).setAuthor("hmtai", "https://camo.githubusercontent.com/02f73362b7b2d734728d66e47a4c2041c61c26a2ddf2378522b12bd7e23b0dfa/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3730373230313733383235353336383139342f3737303636383730333237313335343430382f686d7461692e706e67", "https://www.npmjs.com/package/hmtai");
        msg.reply(embed);
      }catch {
        msg.reply("Wrong variant.");
      }
    }

    if(args[1] == undefined){
      sendEmbededImage(variants[Math.floor(Math.random() * variants.length)]); // random variant
    }else if(args[1] !== undefined){
      sendEmbededImage(args[1]);
    }
	}
}