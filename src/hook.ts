import { useMemo } from 'react'
import useBreakpoint from '@w11r/use-breakpoint'

import { UseBreakpoint } from './types'

const Bowser = require('bowser/bundled')

export interface UserDeviceBreakpoints extends UseBreakpoint {
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
    }
    platform: {
        type: string
        vendor: string
        model: string
    }
}

export const useDeviceBreakpoints = (): UserDeviceBreakpoints => {
    const breakpointsChanges = useBreakpoint()
    const browser = Bowser.parse(window.navigator.userAgent)

    const deviceBreakpointsValue: UserDeviceBreakpoints = useMemo(() => {
        return {
            ...breakpointsChanges,
            ...browser
        }
    }, [breakpointsChanges])

    return deviceBreakpointsValue
}
