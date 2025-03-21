import Die from './components/Die';
import { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice());
    const buttonRef = useRef(null);

    const firstValue = dice[0].value;
    const sameValue = dice.every((d) => d.value === firstValue);
    const allTrue = dice.every((d) => d.isHeld);
    const gameWon = allTrue && sameValue;

    useEffect(() => {
        if (gameWon) buttonRef.current.focus();
    }, [gameWon]);

    function generateAllNewDice() {
        return new Array(10).fill(0).map(() => ({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }));
    }

    function handleDiceRoll() {
        if (gameWon) {
            setDice(generateAllNewDice());
        } else {
            setDice((prevDice) =>
                prevDice.map((d) => {
                    return d.isHeld
                        ? d
                        : { ...d, value: Math.ceil(Math.random() * 6) };
                })
            );
        }
    }

    function hold(id) {
        setDice((prevDice) =>
            prevDice.map((d) => {
                return d.id === id ? { ...d, isHeld: !d.isHeld } : d;
            })
        );
    }

    const diceElements = dice.map((d) => (
        <Die
            key={d.id}
            id={d.id}
            value={d.value}
            isHeld={d.isHeld}
            hold={hold}
        />
    ));

    return (
        <main>
            {gameWon && (
                <Confetti
                    drawShape={(ctx) => {
                        ctx.beginPath();
                        for (let i = 0; i < 22; i++) {
                            const angle = 0.35 * i;
                            const x = (0.2 + 1.5 * angle) * Math.cos(angle);
                            const y = (0.2 + 1.5 * angle) * Math.sin(angle);
                            ctx.lineTo(x, y);
                        }
                        ctx.stroke();
                        ctx.closePath();
                    }}
                />
            )}
            <div aria-live='polite' className='sr-only'>
                {gameWon && (
                    <p>
                        Congratulations! You won! Press "New Game" to start
                        again.
                    </p>
                )}
            </div>
            <h1 className='title'>Tenzies</h1>
            <p className='instructions'>
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className='dice-container'>{diceElements}</div>
            <button
                ref={buttonRef}
                className='roll-dice'
                onClick={handleDiceRoll}
            >
                {gameWon ? 'New Game' : 'Roll'}
            </button>
        </main>
    );
}
