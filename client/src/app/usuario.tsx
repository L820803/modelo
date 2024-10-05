'use client'

import React from 'react'
import { Usuario } from './page'
import api from '@/service/api';

export default function Usuarios({ user }: { user: Usuario[] }) {

    const [usuarios, setUsuarios] = React.useState<Usuario[]>([]);

    const [loading, setLoading] = React.useState<boolean>(false)

    React.useEffect(() => {

        fetchData()

    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await api<Usuario[]>('/user');
            setUsuarios(response)
        } catch (error: any) {
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <div className='flex gap-28 p-32'>
            <div>
                <label className='font-bold mb-7'>Servidor: </label>
                <ul>
                    {
                        user.map((u, i) => (<li key={i}>{u.name}</li>))
                    }
                </ul>
            </div>
            <div>
                <label className='font-bold mb-7'>{loading ? "Carregando..." : "Client"}</label>
                <ul>
                    {
                        usuarios.map((u, i) => (<li key={i}>{u.name}</li>))
                    }
                </ul>
            </div>
        </div>
    )
}
