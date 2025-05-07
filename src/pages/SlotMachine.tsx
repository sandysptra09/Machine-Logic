'use client';
import React, { useState, useEffect } from 'react';
import Reel from '@/components/Reel/Reel';
import { playSound } from '@/utils/sounds';

const OPERANDS = [true, false];
const OPERATORS = ['AND', 'OR', 'NOT'] as const;
type Operator = typeof OPERATORS[number];

const SYMBOLS_MAP = {
    true: '✅', false: '❌',
    AND: '＆', OR: '｜', NOT: '¬'
};

const evaluateLogic = (op1: boolean, operator: Operator, op2?: boolean) => {
    switch (operator) {
        case 'AND': return op1 && op2!;
        case 'OR': return op1 || op2!;
        case 'NOT': return !op1; // Abaikan op2
        default: return false;
    }
};

export default function SlotMachine() {
    // Game State
    const [operand1, setOperand1] = useState<boolean>(true);
    const [operand2, setOperand2] = useState<boolean>(false);
    const [operator, setOperator] = useState<Operator>('AND');
    const [result, setResult] = useState<boolean | null>(null);
    const [feedback, setFeedback] = useState('');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [spinning, setSpinning] = useState(false);
    const [explanation, setExplanation] = useState('');

    // High Score Effect
    useEffect(() => {
        setHighScore(Number(localStorage.getItem('highScore')) || 0);
    }, []);

    // Timer Effect
    useEffect(() => {
        if (timeLeft > 0 && !spinning) {
            const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft, spinning]);

    // Updated Spin Function
    const spin = () => {
        playSound('spin');
        setSpinning(true);
        setFeedback('');
        setExplanation('');

        setTimeout(() => {
            const newOperator = OPERATORS[Math.floor(Math.random() * OPERATORS.length)];
            const newOperand1 = OPERANDS[Math.floor(Math.random() * OPERANDS.length)];
            const newOperand2 = newOperator !== 'NOT'
                ? OPERANDS[Math.floor(Math.random() * OPERANDS.length)]
                : false;

            // Calculate result FIRST
            const newResult = evaluateLogic(newOperand1, newOperator, newOperand2);

            // Then update all states ATOMICALLY
            setOperator(newOperator);
            setOperand1(newOperand1);
            setOperand2(newOperand2);
            setResult(newResult); // Use the pre-calculated result

            // Generate explanation immediately
            const explanationMap = {
                AND: `${newOperand1} AND ${newOperand2} = ${newResult}`,
                OR: `${newOperand1} OR ${newOperand2} = ${newResult}`,
                NOT: `NOT ${newOperand1} = ${newResult}`
            };
            setExplanation(explanationMap[newOperator]);

            setSpinning(false);
        }, 1500);
    };

    // Simplified Handle Answer
    const handleAnswer = (userAnswer: boolean) => {
        if (result === null) return; // Guard clause

        const isCorrect = userAnswer === result;
        setFeedback(isCorrect ? '✅ Benar!' : '❌ Salah!');
        playSound(isCorrect ? 'win' : 'lose');

        if (isCorrect) {
            setScore(prev => {
                const newScore = prev + 1;
                if (newScore > highScore) {
                    localStorage.setItem('highScore', String(newScore));
                    setHighScore(newScore);
                }
                return newScore;
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center">
            <div className="w-full max-w-md p-6 bg-zinc-900 rounded-lg border-4 border-yellow-500">
                <h1 className="text-3xl font-bold mb-4 text-center">🎰 MachineLogic Quiz</h1>

                {/* Reels */}
                <div className="flex justify-center gap-4 mb-6">
                    {/* Reel 1 (Operand 1) */}
                    <Reel
                        symbols={['✅', '❌']}
                        spinning={spinning}
                        onStop={(symbol) => setOperand1(symbol === '✅')}
                    />

                    {/* Reel 2 (Operator) */}
                    <Reel
                        symbols={['＆', '｜', '¬']}
                        spinning={spinning}
                        onStop={(symbol) => {
                            const opMap: Record<string, Operator> = { '＆': 'AND', '｜': 'OR', '¬': 'NOT' };
                            setOperator(opMap[symbol]);
                        }}
                    />

                    {/* Reel 3 (Operand 2) - Always visible */}
                    <Reel
                        symbols={operator !== 'NOT' ? ['✅', '❌'] : ['⬜']} // Netral kalau NOT
                        spinning={spinning}
                        onStop={(symbol) => {
                            if (operator !== 'NOT') setOperand2(symbol === '✅');
                        }}
                    />
                </div>

                {/* Controls */}
                <button
                    onClick={spin}
                    disabled={spinning || timeLeft <= 0}
                    className="bg-yellow-500 text-black font-bold py-2 px-6 rounded mb-4 w-full hover:bg-yellow-400 disabled:opacity-50"
                >
                    {spinning ? '⏳ Spinning...' : '🎲 SPIN'}
                </button>

                {/* Answer Buttons */}
                <div className="flex gap-4 mb-4">
                    <button
                        onClick={() => handleAnswer(true)}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex-1"
                    >
                        ✅ True
                    </button>
                    <button
                        onClick={() => handleAnswer(false)}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex-1"
                    >
                        ❌ False
                    </button>
                </div>

                {/* Feedback */}
                {feedback && (
                    <div className="mb-4">
                        <p className="text-xl font-bold text-center">{feedback}</p>
                        {explanation && (
                            <p className="text-sm text-yellow-300 mt-2 text-center">
                                Penjelasan: <span className="italic">{explanation}</span>
                            </p>
                        )}
                    </div>
                )}

                {/* Stats */}
                <div className="flex justify-between text-sm text-gray-400">
                    <span>Skor: {score}</span>
                    <span>High Score: {highScore}</span>
                    <span>Waktu: {timeLeft}s</span>
                </div>
            </div>
        </div>
    );
}