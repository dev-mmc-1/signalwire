const express = require('express')
const { RestClient } = require('@signalwire/node')
const app = express()

// console.log(express)
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.json('Hello World!')
})

// app routes ////
app.get("/ivr", (req, res, next) => {
    res.send("Sample IVR")
});

function respondAndLog(res, response) {
    console.log(response.toString());
    res.send(response.toString());
}

app.post("/entry", (req, res, next) => {
    var response = new RestClient.LaML.VoiceResponse();
    gather = response.gather({ timeout: 5, numDigits: 1, action: formatUrl('mainmenu') })
    gather.say("Hello! Press 1 for sales, 2 for recruiting or 4 for accounting.")
    console.log('AFROZ', gather);
    respondAndLog(res, response);
});

app.post("/mainmenu", (req, res, next) => {
    
    var response = new RestClient.LaML.VoiceResponse();

    switch (req.body.Digits) {
        case "2":
            // dial = response.dial({ timeout: 20, action: formatUrl('voicemail', "?Email=" + JOBS_EMAIL + "&Message=Recruiting") });
            var recruiters = RECRUITERS_GROUP.split(',')
            // this makes it so the recruiters are dialed all at the same time, first one to pick up wins
            recruiters.forEach(function (item) {
                dial.number(item);
            });
            break;
        case "4":
            // dial = response.dial({ timeout: 20, action: formatUrl('voicemail', "?Email=" + ACCOUNT_EMAIL + "&Message=Accounting") });
            dial.number(ACCOUNTING_GROUP);
            break;
        default:
            // dial = response.dial({ timeout: 20, action: formatUrl('primarysalesdial') });
            dial.number(PRIMARY_SALES);
    }

    respondAndLog(res, response);
});

// methods should be in a different file in production ////
function formatUrl(action, querystring = '') {
    return "/" + action + querystring;
  }

app.listen(4000, () => console.log(`Example app listening on port ${4000}`))