const APP_NAME = process.env.APP_NAME || "demo-ingestor"
const ENV = process.env.ENV || "prod"

const MAX_RSP_TIME = 100

var StatsD = require('node-dogstatsd').StatsD
c = new StatsD('localhost', 8125)

var tags = ["app:" + APP_NAME, "env:" + ENV]
console.log(tags)

function eventsProcessor() {
    var start = Date.now();
    saveEvent(function (err) {
        var millis = Date.now() - start;
        c.timing('events.saving.time', millis, tags)
        
        if (err === null) {
            c.increment("processed_events", tags)
            c.gauge('events.db.connections', getRandomIntInclusive(1, 300), tags)

            logMsg ={l0:{l1:{l2:{l3:{l4:{l5:{l6:{l7:{l8:{l9:{milis:millis}}}}}}}}}}}
            // console.log("event saved [ms]", millis)
            // console.log(logMsg)
            console.log(JSON.stringify(logMsg))
        } else {
            c.increment("failed_events", tags)
            c.gauge('events.db.connections', 0, tags)
            console.log("event failed [ms]", millis)
        }
    });
}

function saveEvent(cbk) {

    function shouldFail() {
        var now = new Date()
        if (now.getSeconds() === 0 && (now.getMinutes() % 3 === 0)) {
            return true
        }
        return false
    }

    setTimeout(cbk, getRandomIntInclusive(0, MAX_RSP_TIME), shouldFail() ? true : null);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function simulateIncomingRequest() {
    for (i = 0; i < 10; i++) {
        eventsProcessor()
    }
}

setInterval(simulateIncomingRequest, 1 * 1000)

exitOnSignal('SIGINT');
exitOnSignal('SIGTERM');
process.stdin.resume();

function exitOnSignal(signal) {
  process.on(signal, function() {
    process.exit(1);
  });
}