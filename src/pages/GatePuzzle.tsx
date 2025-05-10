'use client';

import React, { useState, useEffect } from 'react';
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

    // evaluate expression when switches or currentLevel changes
    useEffect(() => {
        if (hasGuessed) {
            const level = levels[currentLevel];
            const result = level.expression(switches);
            setIsDoorOpen(result);
        }
    }, [switches, currentLevel, hasGuessed]);

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
            setSwitches({ A: false, B: false, C: false, D: false });
            setIsDoorOpen(false);
            setHasGuessed(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
            <h1 className="text-3xl font-bold mb-6 text-yellow-400">
                🔐 Pintu Terkunci - Level {currentLevel + 1}
            </h1>

            <div className="grid grid-cols-2 gap-4 mb-8">
                {Object.entries(switches).map(([key, value]) => (
                    <Button
                        key={key}
                        onPress={() => toggleSwitch(key as keyof SwitchState)}
                        variant="solid"
                        color={value ? 'success' : 'danger'}
                        disabled={hasGuessed}
                        className="w-32"
                    >
                        Switch {key}: {value ? 'ON' : 'OFF'}
                    </Button>
                ))}
            </div>

            {!hasGuessed && (
                <Button
                    onPress={handleGuess}
                    variant="solid"
                    color="primary"
                    className="mb-6"
                >
                    🔍 Cek Jawaban
                </Button>
            )}

            {hasGuessed && (
                <div
                    className={`text-2xl font-bold px-6 py-3 rounded-lg transition-colors duration-500 ${isDoorOpen ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                        }`}
                >
                    {isDoorOpen ? '🚪 Pintu Terbuka!' : '🔒 Pintu Terkunci'}
                </div>
            )}

            <p className="mt-6 text-sm text-gray-400 text-center max-w-xs">
                Buka pintu jika: <code>{levels[currentLevel].description}</code>
            </p>

            {hasGuessed && isDoorOpen && currentLevel < levels.length - 1 && (
                <Button
                    onPress={goToNextLevel}
                    variant="solid"
                    color="primary"
                    className="mt-6"
                >
                    ➡️ Lanjut ke Level {currentLevel + 2}
                </Button>
            )}

            {hasGuessed && isDoorOpen && currentLevel === levels.length - 1 && (
                <p className="mt-6 text-green-400 font-semibold text-xl">
                    🎉 Kamu sudah menyelesaikan semua level!
                </p>
            )}
        </div>
    );
}
