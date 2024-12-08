import { useShortTermStorage } from '@/hooks/store'
import { useEffect, useState } from 'react'
import Request from '@/utils/request'

type Token = string | 'unset' | 'invalid'

const useTokenCheck = (): Token => {
    const { getKeyValue, setKeyValue } = useShortTermStorage()
    const [token, setToken] = useState<Token>('unset')

    useEffect(() => {
        const tokenCheck = async () => {
            let token
            const tokenFromRedux = getKeyValue('authToken')
            if (tokenFromRedux) token = tokenFromRedux
            else {
                const tokenFromLocalStorage = localStorage.getItem('authToken')
                if (tokenFromLocalStorage) {
                    token = tokenFromLocalStorage
                    setKeyValue('authToken', token)
                }
            }

            if (!token) setToken('invalid')
            else if (!getKeyValue('currentUser')) {
                console.log('whoami check')

                try {
                    const response = await Request.get({ endpoint: '/auth/whoami' })

                    setKeyValue('currentUser', response.data)
                    setToken(token)
                } catch (error) {
                    setToken('invalid')
                    console.error('Error during fetch:', error)
                }
            } else setToken(token)
        }
        tokenCheck()
    }, [])

    return token
}

export default useTokenCheck
