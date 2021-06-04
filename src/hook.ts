import { useContext, useMemo } from 'react'
import useBreakpoint from '@w11r/use-breakpoint'

import { deviceBreakpointContext } from './provider'
import { UseBreakpoint } from './types'

export interface UserDeviceHelper extends UseBreakpoint {
    value?: any
    satisfies?: boolean
    userAgent: string
    isSafari: boolean
    isChrome: boolean
    isInternetExplorer: boolean
    isIE: boolean
    isOpera: boolean
    isFirefox: boolean
    isIOS: boolean
    isAndroid: boolean
    isMacOS: boolean
    isWindows: boolean
    isWindowsPhone: boolean
    isSamsungBrowser: boolean
    isKonqueror: boolean
    isLynx: boolean
    isIPhone: boolean
    isIPad: boolean
    isIPod: boolean
    browser: {
        name: string
        version: string
    }
    engine: {
        name: string
        version: string
    }
    os: {
        name: string
        version: string
        versionName: string
    }
    platform: {
        type: string
        vendor: string
        model: string
    }
}

export const useDeviceHelper = (
    defaultValue?: any,
    breakpointPossibleValues?: any[],
    satisfies?: { [key: string]: any }
): UserDeviceHelper => {
    const { userAgent, browser, browserParser, ...helpers } = useContext(deviceBreakpointContext)
    // @ts-ignore
    const breakpointValues = useBreakpoint(defaultValue, breakpointPossibleValues)

    const deviceBreakpointsValue: UserDeviceHelper = useMemo(() => {
        let resultValue =
            typeof breakpointValues !== 'string'
                ? {
                      ...breakpointValues
                  }
                : { value: breakpointValues }

        if (satisfies) {
            resultValue = { ...resultValue, satisfies: browserParser.satisfies(satisfies) ?? false }
        }

        return {
            ...browser,
            ...resultValue,
            ...helpers,
            userAgent
        }
    }, [breakpointValues, userAgent])

    return deviceBreakpointsValue
}

export default useDeviceHelper
