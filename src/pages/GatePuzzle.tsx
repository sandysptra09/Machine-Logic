'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// import components from heroui
import { Button, Progress } from '@heroui/react';

// import utils
import { levels, SwitchState } from '@/utils/levels';

export default function GatePuzzle() {

    // initial state of the puzzle
    const [currentLevel, setCurrentLevel] = useState(0);
    const [switches, setSwitches] = useState<SwitchState>({
        A: false,
        B: false,
        C: false,
        D: false,
        E: false,
        F: false,
    });
    const [isDoorOpen, setIsDoorOpen] = useState(false);
    const [hasGuessed, setHasGuessed] = useState(false);
    const [showError, setShowError] = useState(false);

    // initialize state for countdown
    const [timeLeft, setTimeLeft] = useState(15);
    const [countdownActive, setCountdownActive] = useState(true);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // initialize state for timeout
    const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);

    // start countdown
    useEffect(() => {
        if (countdownActive && !hasGuessed) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev === 1) {
                        clearInterval(timerRef.current!);
                        setCountdownActive(false);
                        setShowTimeoutMessage(true);
                        setTimeout(() => {
                            setShowTimeoutMessage(false);
                            resetGame();
                        }, 2000);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timerRef.current!);
    }, [countdownActive, hasGuessed]);

    // evaluate expression when switches or currentLevel changes
    useEffect(() => {
        if (hasGuessed) {
            clearInterval(timerRef.current!);
            const result = levels[currentLevel].expression(switches);
            setIsDoorOpen(result);

            if (!result) {
                setShowError(true);
                setTimeout(() => resetGame(), 2000);
            }
        }
    }, [hasGuessed]);

    // handle switch toggle
    const toggleSwitch = (key: keyof SwitchState) => {
        if (hasGuessed) return;
        setSwitches(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    // handle guess
    const handleGuess = () => {
        setHasGuessed(true);
        setCountdownActive(false);
    };

    // handle next level
    const goToNextLevel = () => {
        if (currentLevel < levels.length - 1) {
            setCurrentLevel(prev => prev + 1);
            resetLevel();
        }
    };

    // reset level
    const resetLevel = () => {
        setSwitches({ A: false, B: false, C: false, D: false, E: false, F: false });
        setIsDoorOpen(false);
        setHasGuessed(false);
        setShowError(false);
        setTimeLeft(15);
        setCountdownActive(true);
    };

    // reset game
    const resetGame = () => {
        setCurrentLevel(0);
        resetLevel();
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
            <motion.h1
                className="text-3xl font-bold mb-4 text-yellow-400"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                🔐 Pintu Terkunci - Level {currentLevel + 1}
            </motion.h1>

            <div className="w-full max-w-md mb-4">
                <motion.div
                    animate={timeLeft <= 5 ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
                    transition={timeLeft <= 5 ? { duration: 0.5, repeat: Infinity } : {}}
                >
                    <Progress
                        value={(timeLeft / 15) * 100}
                        color="danger"
                    />
                </motion.div>

                <p className={`text-sm text-center mt-1 ${timeLeft <= 5 ? 'text-red-500' : 'text-gray-400'}`}>
                    Sisa waktu: {timeLeft} detik
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                {Object.entries(switches).map(([key, value]) => (
                    <motion.div key={key} whileTap={{ scale: 0.9 }}>
                        <Button
                            onPress={() => toggleSwitch(key as keyof SwitchState)}
                            variant="solid"
                            color={value ? 'success' : 'danger'}
                            disabled={hasGuessed}
                            className="w-32"
                        >
                            Switch {key}: {value ? 'ON' : 'OFF'}
                        </Button>
                    </motion.div>
                ))}
            </div>

            {!hasGuessed && (
                <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                        onPress={handleGuess}
                        variant="solid"
                        color="primary"
                        className="mb-6"
                    >
                        🔍 Cek Jawaban
                    </Button>
                </motion.div>
            )}

            <AnimatePresence>
                {(hasGuessed || showTimeoutMessage) && (
                    <motion.div
                        className={`text-2xl font-bold px-6 py-3 rounded-lg mt-2 ${showTimeoutMessage
                            ? 'bg-red-600'
                            : isDoorOpen
                                ? 'bg-green-600'
                                : 'bg-red-600'
                            }`}
                        key={showTimeoutMessage ? 'timeout' : 'result'}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {showTimeoutMessage
                            ? '⏰ Waktu habis! Mengulang dari awal...'
                            : isDoorOpen
                                ? '🚪 Pintu Terbuka!'
                                : '❌ Salah! Mengulang dari awal...'}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.p
                className="mt-6 text-sm text-gray-400 text-center max-w-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                Buka pintu jika: <code>{levels[currentLevel].description}</code>
            </motion.p>

            {hasGuessed && isDoorOpen && currentLevel < levels.length - 1 && (
                <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                        onPress={goToNextLevel}
                        variant="solid"
                        color="primary"
                        className="mt-6"
                    >
                        ➡️ Lanjut ke Level {currentLevel + 2}
                    </Button>
                </motion.div>
            )}

            {hasGuessed && isDoorOpen && currentLevel === levels.length - 1 && (
                <motion.p
                    className="mt-6 text-green-400 font-semibold text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    🎉 Kamu sudah menyelesaikan semua level!
                </motion.p>
            )}
        </div>
    );
}
