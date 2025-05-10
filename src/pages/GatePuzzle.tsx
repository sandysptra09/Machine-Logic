'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// import components from heroui
import { Button } from '@heroui/react';


type SwitchState = {
    A: boolean;
    B: boolean;
    C: boolean;
    D: boolean;
};

type Level = {
    id: number;
    expression: (s: SwitchState) => boolean;
    description: string;
};

const levels: Level[] = [
    {
        id: 1,
        expression: ({ A, B }) => A && B,
        description: '(A AND B) = true',
    },
    {
        id: 2,
        expression: ({ C, D }) => C && !D,
        description: '(C AND NOT D) = true',
    },
    {
        id: 3,
        expression: ({ A, B, C, D }) => (A && B) || (C && !D),
        description: '(A AND B) OR (C AND NOT D) = true',
    },
    {
        id: 4,
        expression: ({ A, B, C }) => (A || B) && !C,
        description: '(A OR B) AND NOT C = true',
    },
];

export default function GatePuzzle() {

    // initial state of the puzzle
    const [currentLevel, setCurrentLevel] = useState(0);
    const [switches, setSwitches] = useState<SwitchState>({
        A: false,
        B: false,
        C: false,
        D: false,
    });
    const [isDoorOpen, setIsDoorOpen] = useState(false);
    const [hasGuessed, setHasGuessed] = useState(false);
    const [showError, setShowError] = useState(false);

    // evaluate expression when switches or currentLevel changes
    useEffect(() => {
        if (hasGuessed) {
            const result = levels[currentLevel].expression(switches);
            setIsDoorOpen(result);

            if (!result) {
                setShowError(true);
                setTimeout(() => {
                    resetGame();
                }, 2000);
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
        setSwitches({ A: false, B: false, C: false, D: false });
        setIsDoorOpen(false);
        setHasGuessed(false);
        setShowError(false);
    };

    // reset game
    const resetGame = () => {
        setCurrentLevel(0);
        resetLevel();
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
            <motion.h1
                className="text-3xl font-bold mb-6 text-yellow-400"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                🔐 Pintu Terkunci - Level {currentLevel + 1}
            </motion.h1>

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
                {hasGuessed && (
                    <motion.div
                        className={`text-2xl font-bold px-6 py-3 rounded-lg mt-2`}
                        key="result"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            backgroundColor: isDoorOpen ? '#16a34a' : '#dc2626',
                        }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {isDoorOpen ? '🚪 Pintu Terbuka!' : '❌ Salah! Mengulang dari awal...'}
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
