import React from "react";

const Gameover = (props) => {
  let message = "";
  if (props.score <= 50) {
    message = "Y can do better";
  } else if (props.score >= 51 || props.score <= 100) {
    message = "It,s GOOD!";
  } else {
    message = "WOW!";
  }
  return (
    <div className="overlay">
      <div className="gameover_box">
        <h2>GAME OVER</h2>
        <p>Score was: {props.score} </p>
        <p>{message}</p>
        <button onClick={props.close}>X</button>
      </div>
    </div>
  );
};

export default Gameover;
