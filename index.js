const Bot = require("slackbots");

const TIMEOUT_INTERVAL = 1000;
// create a bot
const settings = {
  token: "xoxb-281244216276-0ixvRD1FnkXn2qoF5xzddGmx",
  name: "StephanyBot"
};
const bot = new Bot(settings);
bot.on("start", function() {
  bot.postMessageToChannel(
    "general",
    "Hello channel. I am StephanyBot, I automate 95.7% of the work done by Stephanie."
  );
});

let timeout = null;
let lastDaySent = null;

const sendMessage = () => {
  const today = new Date();
  if (today.getDate() === lastDaySent) {
    // already sent message today
    return;
  }
  if (today.getDay() === 5 && today.getHours() === 15) {
    bot.postMessageToChannel("general", "Do your time reporting! Today!");
    lastDaySent = today.getDate();
  }
  timeout = setTimeout(sendMessage, TIMEOUT_INTERVAL);
};
timeout = setTimeout(sendMessage, TIMEOUT_INTERVAL);
