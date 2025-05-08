'use client';
import React, { useState, useEffect, useRef } from 'react';

// import components
import Reel from '@/components/Reel/Reel';

// import utils
import { playSound } from '@/utils/soundPlayer';

const TRUE_EMOJI = '✅';
const FALSE_EMOJI = '❌';

const FIRST_AND_THIRD_REEL = [TRUE_EMOJI, FALSE_EMOJI];
const SECOND_REEL = ['AND', 'OR', 'NOT'];

export default function SlotMachine() {
    const [spinning, setSpinning] = useState(false);
    const [results, setResults] = useState<string[]>(['', '', '']);
    const [reelTriggers, setReelTriggers] = useState([false, false, false]);
    const [answerResult, setAnswerResult] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [time, setTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const [finalSymbols, setFinalSymbols] = useState<string[]>(['', '', '']);

    const startTimer = () => {
        setTime(0);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTime(prev => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const handleSpin = () => {
        if (spinning) return;

        playSound('spin');

        const randoms = [
            FIRST_AND_THIRD_REEL[Math.floor(Math.random() * FIRST_AND_THIRD_REEL.length)],
            SECOND_REEL[Math.floor(Math.random() * SECOND_REEL.length)],
            FIRST_AND_THIRD_REEL[Math.floor(Math.random() * FIRST_AND_THIRD_REEL.length)],
        ];

        setFinalSymbols(randoms);
        setSpinning(true);
        setResults(['', '', '']);
        setReelTriggers([true, false, false]);
        setAnswerResult(null);
        startTimer();

        setTimeout(() => setReelTriggers([true, true, false]), 600);
        setTimeout(() => setReelTriggers([true, true, true]), 1200);
        setTimeout(() => {
            setSpinning(false);
            setResults(randoms);
        }, 2000);
    };

    const handleStop = (symbol: string, index: number) => {
        setResults(prev => {
            const updated = [...prev];
            updated[index] = symbol;
            return updated;
        });
    };

    const isReadyToGuess = results.every(Boolean) && !spinning;

    const emojiToBool = (emoji: string): boolean => {
        return emoji === TRUE_EMOJI;
    };

    const evaluateLogic = (): boolean => {
        const val1 = emojiToBool(results[0]);
        const op = results[1];
        const val2 = emojiToBool(results[2]);

        switch (op) {
            case 'AND':
                return val1 && val2;
            case 'OR':
                return val1 || val2;
            case 'NOT':
                return !val1;
            default:
                return false;
        }
    };

    const handleGuess = (guess: boolean) => {
        const correct = evaluateLogic();
        const isCorrect = guess === correct;

        setAnswerResult(isCorrect ? '✅ Benar!' : '❌ Salah!');
        if (isCorrect) {
            playSound('win');
            setScore(prev => {
                const newScore = prev + 1;
                if (newScore > highScore) setHighScore(newScore);
                return newScore;
            });
        } else {
            playSound('lose');
            setScore(0);
            stopTimer();
        }
    };

    useEffect(() => {
        return () => {
            stopTimer();
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center">
            <div className="w-full max-w-md p-6 bg-zinc-900 rounded-lg border-4 border-yellow-500">
                <h1 className="text-3xl font-bold mb-4 text-center">🎰 MachineLogic Quiz</h1>

                {/* Reels */}
                <div className="flex justify-center gap-4 mb-6">
                    <Reel
                        symbols={FIRST_AND_THIRD_REEL}
                        spinning={reelTriggers[0]}
                        resultSymbol={finalSymbols[0]}
                    />
                    <Reel
                        symbols={SECOND_REEL}
                        spinning={reelTriggers[1]}
                        resultSymbol={finalSymbols[1]}
                    />
                    <Reel
                        symbols={FIRST_AND_THIRD_REEL}
                        spinning={reelTriggers[2]}
                        resultSymbol={finalSymbols[2]}
                    />
                </div>

                {/* Spin Button */}
                <button
                    onClick={handleSpin}
                    disabled={spinning}
                    className="w-full px-6 py-2 bg-yellow-600 text-black font-bold rounded hover:bg-yellow-500 disabled:opacity-50 mb-4"
                >
                    🎲 SPIN
                </button>

                {/* Logic Guess */}
                {isReadyToGuess && (
                    <div className="flex gap-4 justify-center mb-4">
                        <button
                            onClick={() => handleGuess(true)}
                            className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded text-black font-bold hover:bg-green-400"
                        >
                            ✅ True
                        </button>
                        <button
                            onClick={() => handleGuess(false)}
                            className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded text-black font-bold hover:bg-red-400"
                        >
                            ❌ False
                        </button>
                    </div>
                )}

                {/* Feedback */}
                {answerResult && (
                    <div className="text-xl text-center font-semibold mt-2">
                        {answerResult}
                    </div>
                )}

                {/* Footer Info */}
                <div className="flex justify-between text-sm text-gray-400 mt-6">
                    <span>Skor: {score}</span>
                    <span>High Score: {highScore}</span>
                    <span>Waktu: {time}s</span>
                </div>
            </div>
        </div>
    );
}
