import "./App.css";
import React, { Component } from "react";
import Circle from "./Circle";
import Button from "./Button";
import { circles } from "./circles.js";
import Gameover from "./Gameover";

import startMussic from "./assets/02 Story.flac";
import stopMusic from "./assets/01. Sega Intro.flac";
import click from "./assets/briefcase-lock-1.wav";

const clickSound = new Audio(click);
const startSound = new Audio(startMussic);
const stopSound = new Audio(stopMusic);

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    current: -1,
    showGameOver: false,
    level: 4,
    mcircles: circles.slice(0, this.level),
    pace: 1500,
    rounds: 0,
    gameOn: false,
    // showStopBut: false,
    // showStartBut: true,
  };

  timer = undefined;

  clickPlay = () => {
    if (clickSound.paused) {
      clickSound.play();
    } else {
      clickSound.currentTime = 0;
    }
  };

  startPlay = () => {
    if (startSound.paused) {
      startSound.play();
    } else {
      startSound.currentTime = 0;
    }
  };

  clickHandler = (i) => {
    clickSound.play();
    this.clickPlay();
    if (this.state.current !== i) {
      this.setState({ score: this.state.score - 1 });
      // this.stopHandler();
      return;
    }

    console.log("clickHandler, circle nummber:", i);
    this.setState({
      score: this.state.score + 1,
      // rounds: this.state.rounds - 1,
      // it give possibilities to "collect" mistakes through game
      rounds: -1,
    });
  };

  nextCircle = () => {
    if (this.state.rounds >= 5) {
      // how many "mistakes" we can do before stop game automatically
      this.stopHandler();
      return;
    }

    let RL = this.state.level - 1;
    let nextActive;

    do {
      nextActive = getRndInteger(0, RL);
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
    });
    console.log("rounds", this.state.rounds);
    console.log("active circle:", this.state.current);

    // this.timer = setTimeout(this.nextCircle, 1000);
    this.timer = setTimeout(this.nextCircle, this.state.pace);
  };

  levelHandler = (gameLelel) => {
    this.setState({
      level: gameLelel,
      circles: circles.slice(0, gameLelel),
    });
    // console.log("levelHandler result:", this.state.level);
    // console.log(gameLelel, circles.slice(0, gameLelel));
  };

  startHandler = () => {
    startSound.play();
    startSound.loop = true;
    this.nextCircle();
    this.setState({ gameOn: true });
  };

  stopHandler = () => {
    startSound.pause();
    stopSound.play();
    clearTimeout(this.timer);
    this.setState({ showGameOver: true, gameOn: false, rounds: 0 });
  };

  closeHandler = () => {
    window.location.reload();
    this.setState({ showGameOver: false, score: 0, current: -1 });
  };

  render() {
    return (
      <div>
        <h1>Speedgame</h1>
        <h1>
          level:
          <Button className="level low" click={() => this.levelHandler(4)}>
            Low
          </Button>
          <Button className="level middle" click={() => this.levelHandler(6)}>
            Middle
          </Button>
          <Button className="level high" click={() => this.levelHandler(8)}>
            High
          </Button>
        </h1>
        <h2>Your score:{this.state.score}</h2>
        <div className="circles">
          {circles.slice(0, this.state.level).map((_, i) => (
            <Circle key={i} id={i} click={() => this.clickHandler(i)} active={this.state.current === i} disabled={this.state.gameOn} />
          ))}
        </div>
        <div>
          {!this.state.gameOn && <Button click={this.startHandler}>START</Button>}
          {this.state.gameOn && <Button click={this.stopHandler}>STOP</Button>}
        </div>

        {this.state.showGameOver && <Gameover close={this.closeHandler} score={this.state.score} />}
      </div>
    );
  }
}

export default App;

//   {circles.map((circle, i) => (
