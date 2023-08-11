import React, { useState, useEffect } from "react";
import "./App.css";
import Dice from "./components/Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [numbers, setNumbers] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = numbers.every((number) => number.isHeld);
    const firstValue = numbers[0].value;
    const allSameValue = numbers.every((number) => number.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You Won!");
    }
  }, [numbers]);

  function heldDice(id) {
    // const newArray = [];
    // for (let i = 0; i < 10; i++) {
    //   if (numbers[i].id === id) {
    //     newArray.push({
    //       ...numbers[i],
    //       isHeld: !numbers[i].isHeld,
    //     });
    //   } else {
    //     newArray.push(numbers[i]);
    //   }
    // }
    // setNumbers(newArray);

    setNumbers((oldNumbers) =>
      oldNumbers.map((number) => {
        return number.id === id
          ? { ...number, isHeld: !number.isHeld }
          : number;
      })
    );
  }

  function allNewDice() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return newArray;
  }

  function rollDice() {
    setNumbers((oldNumbers) =>
      oldNumbers.map((number) => {
        return number.isHeld
          ? number
          : { ...number, value: Math.floor(Math.random() * 6) + 1 };
      })
    );
  }

  const diceElements = numbers.map((number) => (
    <Dice
      key={number.id}
      value={number.value}
      isHeld={number.isHeld}
      heldDice={() => heldDice(number.id)}
    />
  ));

  return (
    <main>
      <div className="box">
        {tenzies && <Confetti />}
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice_container">{diceElements}</div>
        <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </div>
    </main>
  );
}
