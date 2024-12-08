'use client'
import useTokenCheck from '@/hooks/tokenCheck'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Home = () => {
    const token = useTokenCheck()
    const router = useRouter()

    useEffect(() => {
        const verifyToken = async () => {
            console.log(token, 'tokennnn')

            if (token == 'invalid') {
                router.push('/auth/login')
            }
        }
        if (token != 'unset') verifyToken()
    }, [token])

    return <div className="flex justify-center">kMKLMFAİPŞFMWifgkamwf</div>
}

export default Home
