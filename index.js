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

// Danh sách các User ID
const targetUserIds = [
  '1373601932001677457', // Người 1
  '234567890123456789',  // Người 2
  '345678901234567890'   // Người 3
];

client.on('guildMemberAdd', async (member) => {
  if (member.guild.id !== process.env.GUILD_ID) return;

  if (targetUserIds.includes(member.user.id)) {
    const role = member.guild.roles.cache.get(process.env.ROLE_ID);
    if (!role) {
      console.error('❌ Không tìm thấy role.');
      return;
    }

    try {
      await member.roles.add(role);
      console.log(`✅ Đã gán role cho ${member.user.tag}`);
    } catch (err) {
      console.error('❌ Lỗi khi gán role:', err);
    }
  }
});

client.login(process.env.TOKEN);
