'use client'

import React, { useEffect, useState } from 'react'
import { booleanMaterials } from '@/data/booleanMaterials'
import TruthTable from '@/components/Tables/TruthTable'

// import utils
import { playSound } from '@/utils/soundPlayer'

export default function Homepage() {
    
    const [started] = useState(true)
    useEffect(() => {
    if (started) {
        playSound('bgm')
    }
    }, [started])

    return (
        <div className='max-w-5xl mx-auto px-6 py-12 flex flex-col gap-6'>
            <h1 className="text-2xl font-bold text-emerald-600 mb-4">
                Belajar Aljabar Boolean
            </h1>

            {booleanMaterials.map((item, index) => (
                <div
                    key={index}
                    className="bg-white/5 backdrop-blur p-6 rounded-xl border border-white/10 shadow-md space-y-4"
                >
                    {item.title && (
                        <h2 className="text-xl font-semibold text-white">
                            {item.title}
                        </h2>
                    )}
                    {item.content_1 && (
                        <p className="text-sm text-white/90 whitespace-pre-line">
                            {item.content_1}
                        </p>
                    )}

                    {item.title_2 && (
                        <h3 className="text-lg font-semibold text-white">{item.title_2}</h3>
                    )}

                    {item.content_2 && Array.isArray(item.content_2) && (
                        <ul className="list-disc list-inside text-sm text-white/90 mt-2 space-y-1">
                            {item.content_2.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    )}

                    {item.title_2 === 'Operator Logika Dasar' && <TruthTable />}

                    {item.title_4 && (
                        <h3 className="text-lg font-semibold text-white">
                            {item.title_4}
                        </h3>
                    )}
                    {item.content_4 && (
                        <p className="text-sm text-white/90 whitespace-pre-line">
                            {item.content_4}
                        </p>
                    )}
                    {item.title_5 && (
                        <h3 className="text-lg font-semibold text-white">
                            {item.title_5}
                        </h3>
                    )}
                    {item.content_5 && (
                        <p className="text-sm text-white/90 whitespace-pre-line">
                            {item.content_5}
                        </p>
                    )}
                    {item.title_6 && (
                        <h3 className="text-lg font-semibold text-white">
                            {item.title_6}
                        </h3>
                    )}
                    {item.content_6 && (
                        <p className="text-sm text-white/90 whitespace-pre-line">
                            {item.content_6}
                        </p>
                    )}
                </div>
            ))}
        </div>
    )
}
