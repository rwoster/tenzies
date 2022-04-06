import { nanoid } from "nanoid";
import Confetti from "react-confetti";

import React from "react";
import Die from "./Die";

function App() {
    const generateNewDie = () => {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        };
    };

    const createDiceArray = () => {
        let array = [];
        for (let i = 0; i < 10; i++) {
            array.push(generateNewDie());
        }
        return array;
    };

    const [dice, setDice] = React.useState(createDiceArray());
    const [count, setCount] = React.useState(1);
    const [tenzies, setTenzies] = React.useState(false);

    const hold = (dieId) => {
        setDice((prevDice) =>
            prevDice.map((die) => {
                return die.id === dieId
                    ? { ...die, isHeld: !die.isHeld }
                    : die;
            })
        );
    };

    const rollDice = () => {
        setDice((prevDice) =>
            prevDice.map((die) => {
                return !die.isHeld ? generateNewDie() : die;
            })
        );
        setCount((prevCount) => prevCount + 1);
    };

    const diceEl = dice.map((die) => {
        return (
            <Die
                key={die.id}
                value={die.value}
                isHeld={die.isHeld}
                handleClick={() => hold(die.id)}
            />
        );
    });

    const resetGame = () => {
        setDice(createDiceArray());
        setCount(1);
        setTenzies(false);
    };

    React.useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const allSame = dice.every((die) => die.value);

        if (allHeld && allSame) {
            setTenzies(true);
            console.log("winner!");
        }
    }, [dice]);

    return (
        <main>
            {tenzies && (
                <Confetti
                    gravity={0.03}
                    wind={-0.005}
                    numberOfPieces={400}
                />
            )}
            <section className="top">
                <h1 className="top--title">Tenzies</h1>
                <p className="top--description">
                    Roll until all dice are the same. Click each die
                    to freeze it at its current value between rolls.
                </p>
            </section>
            <div className="die-container">{diceEl}</div>
            <button
                className="roll-btn"
                onClick={!tenzies ? rollDice : resetGame}
            >
                {!tenzies ? "Roll" : "New Game"}
            </button>
            <p className="count-container">
                <small>roll count:</small>{" "}
                <span className="count">{count}</span>
            </p>
        </main>
    );
}

export default App;
