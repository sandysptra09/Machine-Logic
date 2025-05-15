'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// import components from heroui
import { Button } from '@heroui/react';

// import components
import Reel from '@/components/Reel/Reel';

// import utils
import { playSound } from '@/utils/soundPlayer';

// set constants for emojis and symbols
const TRUE_EMOJI = '✅';
const FALSE_EMOJI = '❌';

// set constants for reels
const FIRST_AND_THIRD_REEL = [TRUE_EMOJI, FALSE_EMOJI];
const SECOND_REEL = ['∧', '∨', '¬'];

export default function SlotMachine() {
    // initialize state from intro
    const [showIntro, setShowIntro] = useState(true);

    // initialize state 
    const [spinning, setSpinning] = useState(false);
    const [results, setResults] = useState<string[]>(['', '', '']);
    const [reelTriggers, setReelTriggers] = useState([false, false, false]);
    const [answerResult, setAnswerResult] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [time, setTime] = useState(10);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [finalSymbols, setFinalSymbols] = useState<string[]>(['', '', '']);
    const [hasGuessed, setHasGuessed] = useState(false);

    // function start game
    const startGame = () => {
        setShowIntro(false);
    };

    // get high score in localstorage in first time reload
    useEffect(() => {
        const storedHighScore = localStorage.getItem('highScore');
        if (storedHighScore) {
            setHighScore(parseInt(storedHighScore, 10));
        }
        return () => stopTimer();
    }, []);

    // 
    const startTimer = () => {
        setTime(10);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTime(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    if (!hasGuessed) handleTimeout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // set stop timmer
    const stopTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };

    // function handle timeout
    const handleTimeout = () => {
        setAnswerResult('⏰ Waktu habis! ❌ Salah!');
        setScore(0);
        playSound('lose');
        setHasGuessed(true);
    };

    // function handle spin
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
        setHasGuessed(false);
        startTimer();

        setTimeout(() => setReelTriggers([true, true, false]), 600);
        setTimeout(() => setReelTriggers([true, true, true]), 1200);
        setTimeout(() => {
            setSpinning(false);
            setResults(randoms);
        }, 2000);
    };

    // // function handle stop
    // const handleStop = (symbol: string, index: number) => {
    //     setResults(prev => {
    //         const updated = [...prev];
    //         updated[index] = symbol;
    //         return updated;
    //     });
    // };

    // set ready to guess
    const isReadyToGuess = results.every(Boolean) && !spinning;

    // set emoji to boolean
    const emojiToBool = (emoji: string): boolean => emoji === TRUE_EMOJI;

    // set logic explanation
    const evaluateLogic = (): boolean => {
        const val1 = emojiToBool(results[0]);
        const op = results[1];
        const val2 = emojiToBool(results[2]);

        switch (op) {
            case '∧': return val1 && val2;
            case '∨': return val1 || val2;
            case '¬': return !val1;
            default: return false;
        }
    };

    // function handle guess
    const handleGuess = (guess: boolean) => {
        if (hasGuessed) return;
        setHasGuessed(true);
        stopTimer();

        const correct = evaluateLogic();
        const isCorrect = guess === correct;

        setAnswerResult(isCorrect ? '✅ Benar!' : '❌ Salah!');
        if (isCorrect) {
            playSound('win');
            setScore(prev => {
                const newScore = prev + 1;
                if (newScore > highScore) {
                    setHighScore(newScore);
                    localStorage.setItem('highScore', newScore.toString());
                }
                return newScore;
            });
        } else {
            playSound('lose');
            setScore(0);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-gray-800 p-6 rounded-xl max-w-md text-center border border-yellow-400"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >
                            <h2 className="text-2xl font-bold text-yellow-400 mb-4">🎰 Selamat Datang di Slot Machine!</h2>
                            <p className="text-sm text-gray-300 mb-4">
                                Putar reel dan tebak hasil logikanya! Kamu punya waktu 10 detik untuk menjawab dengan benar.
                                Skormu akan bertambah jika benar — hati-hati, salah tebak bikin skormu balik ke nol!
                            </p>
                            <Button onPress={startGame} color="primary">
                                🚀 Mulai Permainan
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!showIntro && (
                <div className="w-full max-w-md p-6 bg-gradient-to-b from-gray-900 to-black rounded-lg border-4 border-yellow-500">
                    <h1 className="text-3xl font-bold mb-4 text-center">🎰 Slot Machine Logic </h1>

                    <div className="flex justify-center gap-4 mb-6">
                        <Reel symbols={FIRST_AND_THIRD_REEL} spinning={reelTriggers[0]} resultSymbol={finalSymbols[0]} />
                        <Reel symbols={SECOND_REEL} spinning={reelTriggers[1]} resultSymbol={finalSymbols[1]} />
                        <Reel symbols={FIRST_AND_THIRD_REEL} spinning={reelTriggers[2]} resultSymbol={finalSymbols[2]} />
                    </div>

                    <Button onPress={handleSpin} isLoading={spinning} spinnerPlacement='start' color='warning' radius='sm' className='w-full px-6 py-2 text-black font-semibold text-md disabled:opacity-50 mb-4'>
                        {spinning ? 'Spinning...' : 'Spin'}
                    </Button>

                    {isReadyToGuess && (
                        <div className="flex gap-4 justify-center mb-4">
                            <Button color='success' radius='sm' onPress={() => handleGuess(true)} disabled={hasGuessed} className='flex items-center gap-2 px-4 text-white font-semibold text-md disabled:opacity-50'>✅ True</Button>
                            <Button radius='sm' onPress={() => handleGuess(false)} disabled={hasGuessed} className='flex items-center gap-2 bg-red-500 px-4 py-2 text-white font-semibold text-md disabled:opacity-50'>❌ False</Button>
                        </div>
                    )}

                    {answerResult && (
                        <div className="text-xl text-center font-semibold mt-2">
                            {answerResult}
                        </div>
                    )}

                    <div className="flex justify-between text-sm text-gray-400 mt-6">
                        <span>Skor: {score}</span>
                        <span>High Score: {highScore}</span>
                        <span>Waktu: {time}s</span>
                    </div>
                </div>
            )}
        </div>
    );
}
