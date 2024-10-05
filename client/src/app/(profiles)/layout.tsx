'use client'

import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const naviLinks = [
    { name: 'Profile', href: '/profile' },
    { name: 'Config', href: '/config' },
    { name: 'Info', href: '/info' },
]

export default function ProfilesLayout({ children }: { children: React.ReactNode }) {

    const pathName = usePathname()

    return (
        <div className='p-10 flex flex-col'>
            <div className='flex gap-3'>
                {
                    naviLinks.map((link) => {
                        const isAction = pathName.startsWith(link.href)
                        return (
                            <Link
                                className={`p-3 w-32 flex justify-between rounded mb-4 ${isAction ? 'bg-green-700 text-white' : 'bg-slate-700 text-white'}`}
                                key={link.href}
                                href={link.href}>
                                    <span>{link.name}</span>
                                    <i>icone</i>
                                </Link>
                        )
                    })
                }
            </div>
            <section>
                {children}
            </section>
        </div>
    )
}
