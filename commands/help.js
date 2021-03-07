module.exports = {
  name: 'help',
  execute(msg, args) {
    const variants = require("./hmtai.json").variants;

    let reply = "\n**Commands**\n**`!help`** - display this help\n**`!hmtai`** - get random sweet hentai images (NSFW)\n**`!hmtai (variant)`** - get specific sweet hentai image (NSFW)\nvariants:";
    variants.forEach(variant => reply += "\n_" + variant + "_"); // iterate through variants and add them to help
    reply += ("\n**`!rule34 (tag)`** - rule34 searcher by tag");
    
    msg.channel.send(reply);
  }
}