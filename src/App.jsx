import React, { useState } from "react";
import "./App.css";
import Dice from "./components/Dice";
import { nanoid } from "nanoid";

export default function App() {
  const [numbers, setNumbers] = useState(allNewDice());

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
        <div className="content">
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="dice_container">{diceElements}</div>
        <button onClick={() => setNumbers(allNewDice())}>Roll</button>
      </div>
    </main>
  );
}
