import { Client, Events, GatewayIntentBits } from "discord.js";

// create a new Client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// listen for the client to be ready
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.on("messageCreate", (msg) => {
  if (!client.user) {
    console.log("No client.user!");
    return;
  }

  const isBotMsg = client?.user.id === msg.author.id;

  if (isBotMsg) {
    console.log("Message is from bot; return early.");
    return;
  }

  const mention = msg.mentions.members;

  if (!mention) {
    console.log("Message didn't contain any mentions.");
    return;
  }

  if (mention && !isBotMsg) {
    mention.every((mntn) => {
      console.log("Mention?");
      console.log(mntn.user.id);

      !isBotMsg && msg.reply(`Happy birthday ${mntn.user}!`);
      return;
    });

    return;
  }
  if (!isBotMsg && msg.content.includes("happy birthday")) {
    console.log("Happy birthday was said; posting message.");
    msg.channel.send("Happy birthday!");
    return;
  }
});
// login with the token from .env.local
client.login(process.env.DISCORD_BOT_TOKEN);
