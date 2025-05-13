'use client'

import { useEffect, useRef } from 'react'
import { playSound } from '@/utils/soundPlayer'

export default function BGMSoundPlayer() {
    const hasPlayed = useRef(false)

    useEffect(() => {
        if (!hasPlayed.current) {
            playSound('bgm')
            hasPlayed.current = true
        }
    }, [])

    return null
}
