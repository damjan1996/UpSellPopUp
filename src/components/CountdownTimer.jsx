"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

const CountdownTimer = ({ initialMinutes = 5, onComplete }) => {
    const [seconds, setSeconds] = useState(initialMinutes * 60)

    useEffect(() => {
        if (seconds <= 0) {
            if (onComplete) onComplete()
            return
        }

        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [seconds, onComplete])

    const formatTime = () => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
    }

    // Berechne den Prozentsatz der verbleibenden Zeit
    const percentage = (seconds / (initialMinutes * 60)) * 100

    // Bestimme die Farbe basierend auf der verbleibenden Zeit
    let textColor = "text-green-500"
    if (percentage < 50) textColor = "text-amber-500"
    if (percentage < 20) textColor = "text-red-500"

    return (
        <div className="flex items-center gap-1.5">
            <Clock className={`h-4 w-4 ${textColor}`} />
            <span className={`font-mono text-sm font-medium ${textColor}`}>{formatTime()}</span>
        </div>
    )
}

export default CountdownTimer
