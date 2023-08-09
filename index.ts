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

const happybirthdays = [
  "hbd",
  "happy birthday",
  "happy bday",
  "hpy bday",
  "parabens",
];
// listen for the client to be ready
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.on("messageCreate", (msg) => {
  const parsedMessage = msg.content.toLowerCase().replace(
    /[^a-zA-Z0-9 ]/g,
    "",
  );

  const isHbdMessage = happybirthdays.includes(parsedMessage);

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

  if (mention && !isBotMsg && isHbdMessage) {
    mention.every((mntn) => {
      console.log(
        `${new Date().toLocaleDateString()}${msg.author}: ${msg.content}`,
      );
      !isBotMsg && msg.reply(`Happy birthday ${mntn.user}!`);
      return;
    });
  }

  if (!isBotMsg && isHbdMessage) {
    console.log("Happy birthday was said; posting message.");
    msg.channel.send("Happy birthday!");
    return;
  }
});
client.login(process.env.DISCORD_BOT_TOKEN);
