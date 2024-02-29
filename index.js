const express = require('express');
const app = express();
const moment = require('moment')
const Discord = require('discord.js')
//express
app.use('/ping', (req, res) => {
  res.send(new Date());
});
app.listen(3000, () => {
  console.log('GO GO.') 
});
const db = require("nqr.db")
//main v13 source
const { Client, Intents, MessageEmbed, User, MessageActionRow, MessageButton, Collection } = require('discord.js');
const client = new Client({
  intents : 98045,
  allowedMentions: { repliedUser: true },
});
const { REST } = require('@discordjs/rest');
const {  MessageSelectMenu } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
//vars
var prefix = "/" //prefix
//bot info
client.on('ready', () => {
    console.log(`Name Bot : ${client.user.username}`);
  console.log(`prefix Bot : ${prefix}`);
	console.log(`Tag : ${client.user.tag}`);
	console.log(`${client.guilds.cache.size} Servers`); 
	console.log(`${client.users.cache.size} Users`); console.log(`${client.channels.cache.size} Channels`);
      console.log(`[ ${client.guilds.cache.map(g => g.name).join(', \n ')} ]`);
}).setMaxListeners(0);


//error fixer
 process.on("unhandledRejection", error => {
  return console.log(error)
}); 
 process.on("unhandledRejection", error => {
  return 
}); 
 process.on("unhandledRejection", error => {
  return 
}); 
client.on("ready" , () => {
const commands = [{
  name : "add",
  description : "to add a member to nasab",
  options : [{
  name : "name-tag",
  description : "nasab name tag",
    type: 3,
    required: true,
  },{
    name : "id",
    description : "id of the nasab",
    type : 3,
    required : true,
  },{
    name : "reason",
    description: "what he did?",
    type: 3,
    required: true,
  },{
    name : "photo-link",
    description : "the photo link for Evidence",
    type : 3,
    required: true,
  }]
},{
  name : "remove",
  description : "to remove nasab",
  options : [{
    name : "id",
    description : "id of the nasab",
    type : 3,
    required : true,
  }]
},{
  name : "check",
  description : "to check the member if he is nasab or not",
  options : [{
    name : "id",
    description : "id of the member",
    type : 3,
    required : true,
  }]
},{
    name : "ping",
  description : "the ping of the bot",
},{
    name : "help",
  description : "to view help menu",
}];
    const rest = new REST({ version: '9' }).setToken(process.env.token);
    
    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
            console.log("Done Run ApplicationCommands");
        } catch (error) {
            console.error(error);
        }
    })();
})

client.on('interactionCreate', async (interaction) => {
    await interaction.deferReply();

    if (interaction.commandName === "add") {
        const requiredRoleId = '1212398076464074853';  
        if (!interaction.member.roles.cache.has(requiredRoleId)) {
            return interaction.editReply({ content: '**⛔ لا يمكنك استعمال الأمر، يمكنه استعماله فقط من لديه الرتبة المطلوبة ⛔**', ephemeral: true });
        }
  const nasabtag = interaction.options.getString('name-tag')
  const nasabid = interaction.options.getString('id')
  const sexxxx = interaction.options.getString('reason')
  const photoid = interaction.options.getString('photo-link')
        db.set(`nasab_${nasabid}`, "true")
        db.set(`nasabtr_${nasabid}`, sexxxx)
        db.set(`nasabx_${nasabid}`, photoid)
        db.set(`nasabt_${nasabid}`, nasabtag)
          const donembed = new MessageEmbed()
            .setTitle('⚠️ نصاب جديد [ عملية نصب ] ⚠️')
            .setColor("#ff0000")
            .setDescription(`

 \`اسم النصااب\` **: ${nasabtag} **

 \`النصاب\` **: ${nasabid} **

\`القصة\` **: ${sexxxx} **

`)
.setImage(photoid)
  
  interaction.channel.send({embeds: [donembed]})
  }
else if (interaction.commandName == "remove") { 
        const requiredRoleId = '1212398076464074853';   
        if (!interaction.member.roles.cache.has(requiredRoleId)) {
            return interaction.editReply({ content: '**⛔ لا يمكنك استعمال الأمر، يمكنه استعماله فقط من لديه الرتبة المطلوبة ⛔**', ephemeral: true });
        }
      const nasabid = interaction.options.getString('id')
      
 const nasab = db.fetch(`nasab_${nasabid}`, "true")
  if(!nasab) return interaction.editReply(`**✅ تم اخراجه من قائمة النصابين ✅**`)
      
        db.delete(`nasab_${nasabid}`)
        db.delete(`nasabt_${nasabid}`)
          const donembed = new MessageEmbed()
            .setTitle('DONE REMOVING A SCAMMER')
            .setColor("GREEN")
            .setDescription(`
**NAME SCAMBER** **: ${nasabtag} **

**ID SCAMBER** **: ${nasabid} **
`)
  
  interaction.editReply({embeds: [donembed]})
  }

if (interaction.commandName == "check") {
    let nasabid = interaction.options.getString('id');
    const nasab = db.fetch(`nasab_${nasabid}`, "true");
      const embup = new MessageEmbed()
      .setTitle('🟡 هاذ شخص ليس موجود في قائمة النصابين 🟡')
      .setColor("#7289da")
      .setDescription(`
ليس في قائمة النصابين ، لاكن هذا لا يعني انه مضمون.
`)
  if(!nasab) return interaction.editReply({embeds: [embup]})
                                      
      


      
  let nasabtag = db.get(`nasabt_${nasabid}`)
  let sexxxx = db.get(`nasabtr_${nasabid}`)
  let photoid = db.get(`nasabx_${nasabid}`)


          const donembed = new MessageEmbed()
            .setTitle('⛔ موجود في قائمة النصابين ، يرجى عدم التعامل معه. ⛔')
            .setColor("#da7274")
            .setDescription(`

 \`اسم النصاب\` **: ${nasabtag} **

 \`النصاب\` **: ${nasabid} **

\`القصة\` **: ${sexxxx} **

`)
  //وش سببب لو تعرف 
  interaction.editReply({embeds: [donembed]})
  }
      if(interaction.commandName == "ping") {
  interaction.editReply({ content: `
\`\`\`js
Latency is ${interaction.createdTimestamp - interaction.createdTimestamp}ms. 
API Latency is ${Math.round(client.ws.ping)}ms.
\`\`\`
`})
  }

        if(interaction.commandName == "help") {
        const helpmainembed = new MessageEmbed()
        .setDescription(`

> /check = **لفحص البائعين/مشترين**`)
          .setColor("#344955")

 interaction.editReply({embeds: [helpmainembed]})
  }
})
//process.env.token
client.login("MTIxMjM3MDY3NjI2NzA4OTk3MQ.GIwK42.FowBholhnbUv_dk6Ds9srFN09EL35hMk7ZfKCg"); 
