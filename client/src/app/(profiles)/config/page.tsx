import React from 'react'
import { notFound } from 'next/navigation'

export default function Config() {

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    const numero: number = getRandomInt(5)

    if(numero > 3) {
        notFound()
    }

    return (
        <div>Config</div>
    )
}
