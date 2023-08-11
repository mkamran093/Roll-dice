import React from "react";
import "./dice.css";

const Dice = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  return (
    <div
      className="dice"
      style={styles}
      onClick={() => props.heldDice(props.id)}
    >
      <h2>{props.value}</h2>
    </div>
  );
};

export default Dice;
