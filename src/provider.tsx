import React, { createContext, useState } from 'react'
import { BreakpointProvider, useResize } from '@w11r/use-breakpoint'

// eslint-disable-next-line
const Bowser = require('bowser/bundled')

const getWindow = () => {
    if (typeof window !== 'undefined') {
        return window
    }

    return {
        navigator: {
            userAgent:
                // eslint-disable-next-line
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
        }
    }
}

const browserParserFunc = () => {
    const browser = Bowser.parse(getWindow().navigator.userAgent)
    const browserParser = Bowser.getParser(getWindow().navigator.userAgent)

    const isSafari = browserParser.satisfies({ safari: '>1' }) ?? false
    const isChrome = browserParser.satisfies({ chrome: '>1' }) ?? false
    const isInternetExplorer = browserParser.satisfies({ 'internet explorer': '>1' }) ?? false
    const isIE = browserParser.satisfies({ 'internet explorer': '>1' }) ?? false
    const isOpera = browserParser.satisfies({ opera: '>1' }) ?? false
    const isFirefox = browserParser.satisfies({ firefox: '>1' }) ?? false
    const isKonqueror = browserParser.satisfies({ konqueror: '>1' }) ?? false
    const isLynx = browserParser.satisfies({ lynx: '>1' }) ?? false
    const isSamsungBrowser = browserParser.satisfies({ samsung: '>1' }) ?? false
    const isIOS = browser?.os?.name?.toLowerCase() === 'ios'
    const isAndroid = browser?.os?.name?.toLowerCase() === 'android'
    const isMacOS = browser?.os?.name?.toLowerCase() === 'macos'
    const isWindows = browser?.os?.name?.toLowerCase() === 'windows'
    const isWindowsPhone =
        browser?.platform?.type?.toLowerCase() === 'mobile' && browser?.os?.name?.toLowerCase().includes('windows')
    const isIPhone = isIOS && browser?.platform?.model?.toLowerCase() === 'iphone'
    const isIPad = isIOS && browser?.platform?.model?.toLowerCase() === 'ipad'
    const isIPod = isIOS && browser?.platform?.model?.toLowerCase() === 'ipod'

    const defaultState = {
        userAgent: getWindow().navigator.userAgent,
        browser,
        browserParser,
        isSafari,
        isChrome,
        isInternetExplorer,
        isIE,
        isOpera,
        isFirefox,
        isIOS,
        isAndroid,
        isMacOS,
        isWindows,
        isWindowsPhone,
        isSamsungBrowser,
        isKonqueror,
        isLynx,
        isIPhone,
        isIPad,
        isIPod
    }

    return defaultState
}

export const defaultState = browserParserFunc()

export const Context = createContext(defaultState)

export const DeviceHelperProvider = ({ children }) => {
    const [values, setValues] = useState(defaultState)

    useResize(() => {
        const { userAgent } = getWindow().navigator
        if (values?.userAgent !== userAgent) {
            console.log('set!')
            const defaultState = browserParserFunc()
            setValues(defaultState)
        }
    })

    return (
        <Context.Provider value={values}>
            <BreakpointProvider>{children}</BreakpointProvider>
        </Context.Provider>
    )
}

export default DeviceHelperProvider
