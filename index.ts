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

function findHappyBirthdayMessageMatch(
  { message }: { message: string },
): boolean {
  return happybirthdays.some((m) => message.includes(m));
}
// listen for the client to be ready
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.on("messageCreate", async(msg) => {
  const parsedMessage = msg.content.toLowerCase().replace(
    /[^a-zA-Z0-9 ]/g,
    "",
  );

  const isHbdMessage = findHappyBirthdayMessageMatch({
    message: parsedMessage,
  });

  const mention = msg.mentions.members;

  console.log("\n____");
  console.log({
    message: msg.content,
    parsedMessage,
    author: msg.author.username,
    date: new Date().toLocaleDateString(),
  });
  console.log("____\n");

  if (!client.user) {
    console.log("No client.user!");
    return;
  }
  const isBotMsg = client?.user.id === msg.author.id;

  if (mention && !isBotMsg && isHbdMessage) {
    console.log("Mention + Not a bot msg + isHbdMsg");
    mention.every((mntn) => {
      !isBotMsg && msg.reply(`Happy birthday ${mntn.user}!`);
      return;
    });
    return;
  }
  if (!isBotMsg && isHbdMessage) {
    console.log(
      `Happy birthday was said; posting message: ${
        new Date().toLocaleDateString()
      } - ${client.user}: Happy birthday!`,
    );
    msg.channel.send("Happy birthday!");
    return;
  }

  if (!mention) {
    console.log("Message didn't contain any mentions.");
    return;
  }

  if (isBotMsg) {
    console.log("isBotMsg");
    return;
  }
});
client.login(process.env.DISCORD_BOT_TOKEN);
