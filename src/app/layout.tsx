'use client'
import Loader from '@/components/common/Loader'
import useColorMode from '@/hooks/useColorMode'
import store from '@/store/store'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const [loading, setLoading] = useState<boolean>(false)
    // useEffect(() => {
    //     setTimeout(() => setLoading(false), 2000)
    // }, [])
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <Provider store={store}>
                    <div className="dark:bg-boxdark-2 dark:text-bodydark">{loading ? <Loader /> : children}</div>
                </Provider>
            </body>
        </html>
    )
}
