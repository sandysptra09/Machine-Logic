'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ReelProps {
    symbols: string[];
    spinning: boolean;
    resultSymbol: string | null;
}

const Reel = ({ symbols, spinning, resultSymbol }: ReelProps) => {
    const controls = useAnimation();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
        if (!isMounted || !resultSymbol) return;

        if (spinning) {
            controls.start({
                y: [-5, -1000],
                transition: { duration: 1.5, ease: "easeOut" }
            }).then(() => {
                controls.set({ y: -5 }); // reset posisinya
            });
        }
    }, [spinning, isMounted, resultSymbol]);

    return (
        <div className="w-20 h-20 overflow-hidden border-4 border-yellow-400 rounded-md bg-black">
            <motion.div animate={controls} className="flex flex-col">
                {[...symbols, ...symbols].map((symbol, idx) => (
                    <div key={idx} className="h-20 flex items-center justify-center text-4xl">
                        {resultSymbol || '?'}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Reel;