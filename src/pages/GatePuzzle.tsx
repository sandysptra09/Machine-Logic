'use client';

import React, { useState, useEffect } from 'react';

export default function GatePuzzle() {
    const [switches, setSwitches] = useState({
        A: false,
        B: false,
        C: false,
        D: false,
    });

    const [isDoorOpen, setIsDoorOpen] = useState(false);

    // Evaluasi boolean expression
    useEffect(() => {
        const { A, B, C, D } = switches;
        const result = (A && B) || (C && !D);
        setIsDoorOpen(result);
    }, [switches]);

    // Handle toggle saklar
    const toggleSwitch = (key: keyof typeof switches) => {
        setSwitches(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
            <h1 className="text-3xl font-bold mb-6 text-yellow-400">🔐 Pintu Terkunci</h1>

            <div className="grid grid-cols-2 gap-6 mb-8">
                {Object.entries(switches).map(([key, value]) => (
                    <button
                        key={key}
                        onClick={() => toggleSwitch(key as keyof typeof switches)}
                        className={`px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 ${value ? 'bg-green-500' : 'bg-red-500'
                            }`}
                    >
                        Switch {key}: {value ? 'ON' : 'OFF'}
                    </button>
                ))}
            </div>

            <div className={`text-2xl font-bold px-6 py-3 rounded-lg transition-colors duration-500 ${isDoorOpen ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}>
                {isDoorOpen ? '🚪 Pintu Terbuka!' : '🔒 Pintu Terkunci'}
            </div>

            <p className="mt-6 text-sm text-gray-400">
                Buka pintu jika: <code>(A AND B) OR (C AND NOT D) = true</code>
            </p>

        </div>
    );
}
