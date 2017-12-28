const Bot = require('slackbots')
const http = require('http')

let TIMEOUT_INTERVAL = 60000
let CHANNEL = 'general'
let PORT = process.env.PORT
let SLACK_TOKEN = process.env.SLACK_TOKEN

if (process.env.NODE_ENV === 'development') {
  TIMEOUT_INTERVAL = 3000
  CHANNEL = 'test'
  PORT = 8080
  // SLACK_TOKEN = ''
}

console.log('Using Slack token: ' + SLACK_TOKEN)

// create a bot
const settings = {
  token: SLACK_TOKEN,
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
let lastDateSent = null

const sendMessage = () => {
  const today = new Date()
  if (lastDateSent !== null && today.getDate() === lastDateSent.getDate()) {
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
        lastDaySent = today
      })
  }
  timeout = setTimeout(sendMessage, TIMEOUT_INTERVAL)
}
sendMessage()

http
  .createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Stephany Bot online! Last message sent on: ' + lastDateSent)
  })
  .listen(process.env.PORT)
