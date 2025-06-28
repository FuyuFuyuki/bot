const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('ready', () => {
  console.log(`🤖 Bot is online as ${client.user.tag}`);
});

const targetUserIds = [
  '1373601932001677457', 
  '1388553603878228110',  
  '1318270147387199569'   
];

client.on('guildMemberAdd', async (member) => {
  if (member.guild.id !== process.env.GUILD_ID) return;

  if (targetUserIds.includes(member.user.id)) {
    const role = member.guild.roles.cache.get(process.env.ROLE_ID);
    if (!role) {
      console.error('❌ Role not found.');
      return;
    }

    try {
      await member.roles.add(role);
      console.log(`✅ Role assigned to ${member.user.tag}`);
    } catch (err) {
      console.error('❌ Error assigning role to:', err);
    }
  }
});

client.login(process.env.TOKEN);
