import React from 'react'

export default function Profile() {

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    const numero: number = getRandomInt(5)

    if(numero > 5) {
        throw Error('Invalid 3 Id.')
    }

    return (
        <div>Profile</div>
    )
}
