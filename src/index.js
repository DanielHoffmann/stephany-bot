const Bot = require('slackbots')

let TIMEOUT_INTERVAL = 60000
let CHANNEL = 'general'
if (process.env.NODE_ENV === 'development') {
  TIMEOUT_INTERVAL = 3000
  CHANNEL = 'test'
}

console.log('Using Slack token: ' + process.env.SLACK_TOKEN)

// create a bot
const settings = {
  token: process.env.SLACK_TOKEN,
  name: 'StephanyBot',
}

const bot = new Bot(settings)
bot.on('start', function() {
  bot.postMessageToChannel(
    CHANNEL,
    `Hello #${CHANNEL} I am StephanyBot, I automate ${90 +
      Math.round(Math.random() * 1000) / 100}% of the work done by Stephanie.`
  )
})

let timeout = null
let lastDaySent = null

const sendMessage = () => {
  const today = new Date()
  if (today.getDate() === lastDaySent) {
    // already sent message today
    return
  }
  if (today.getDay() === 5 && today.getHours() === 15) {
    // fridays 15:00
    bot
      .postMessageToChannel(
        CHANNEL,
        `<!channel> do your time reporting! Today!`
      )
      .then(() => {
        lastDaySent = today.getDate()
      })
  }
  timeout = setTimeout(sendMessage, TIMEOUT_INTERVAL)
}
sendMessage()
