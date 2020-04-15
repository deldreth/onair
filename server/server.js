const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());

const Gpio = require("onoff").Gpio;
const led = new Gpio(14, "out");

app.post("/onair/toggle", (req, res) => {
  const state = led.readSync();

  if (state === 0) {
    led.writeSync(1);
  } else {
    led.writeSync(0);
  }

  res.send(!state);
});

app.get("/onair/status", (req, res) => {
  res.send(!!led.readSync());
});

app.listen(port);
