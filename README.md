# Intro

React `useDeviceHelper` hook to have different values for a variable
based on a breakpoints and device specific information.

This hook is nothing but a superset of a combination of the following
two libraries:

-   [use-breakpoint](https://github.com/wintercounter/use-breakpoint)
-   [Bowser](https://github.com/lancedikson/bowser)

# Demo

TBA

# Install

```bash
npm i use-device-helper
```

# Setup

## Add provider

Add `DeviceHelperProvider` in your React tree.

```jsx
import { DeviceHelperProvider } from 'use-device-helper'

...
    <DeviceHelperProvider>
        ...
    </DeviceHelperProvider>
...
```

## Override default breakpoint settings

Click [here](https://github.com/wintercounter/use-breakpoint#override-default-settings)
to read how to override the default breakpoint settings.

# Usage

```js
const { isMobile, isSafari, isMacOS, isWindows } = useDeviceHelper()
```

> You can also access the values with suffix and prefix, but you need
> to rename the variables because it contains invalid character:
> `const { 'isMobile+': isMobile } = useDeviceHelper()`

Component example

```jsx
import useDeviceHelper from 'use-device-helper'

const MyCmp = () => {
    const columns = useDeviceHelper([1, 2], ['mobile', [2, 1]])

    return <Grid cols={columns} />
}

// Or using inline
const MyCmp = () => {
    return <Grid cols={useDeviceHelper([1, 2], ['mobile', [2, 1]])} />
}
```

Satisfies Component example

```jsx
import useDeviceHelper from 'use-device-helper'

const MyCmp = () => {
    const { value: columns, satisfies } = useDeviceHelper([1, 2], ['mobile', [2, 1]], {
        windows: { 'internet-explorer': '>9' }
    })

    return satisfies ? <Flex /> : <Grid cols={columns} />
}
```

# Other usages

## With passing values

```js
import { useDeviceHelper } from 'use-device-helper'

...

// Signature: useDeviceHelper(defaultValue, breakpointValues, satisfyObject?)
const example = useDeviceHelper(false, ['mobile', true])

// Example will be `true` if screen is mobile size.
// Example will be `false` otherwise
```

## Satisfy condition

```js
import { useDeviceHelper } from 'use-device-helper'

...

// Signature: useDeviceHelper(defaultValue, breakpointValues)
const { value, satisfy } = useDeviceHelper('none', ['mobile', 'is mobile'], {macos: {chrome: '>80'}})

// `value` will work like the example above.
// `satisfy` will return `true` only if device is a MacOS machine with Chrome 80+

```

## Without passing values

In case you don't specify any value to the hook, it'll return a generated
object including boolean values for each breakpoint keys that's being
defined in options.

It'll return the following object with the basic setup.

```
{
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
    },
    engine: {
        name: string
        version: string
    },
    os: {
        name: string
        version: string
        versionName: string
    },
    platform: {
        type: string
        vendor: string
        model: string
    },
    isLandscape: boolean,
    isPortrait: boolean,
    isHDPI: boolean,
    isMicro: boolean,
    isMobile: boolean,
    isTablet: boolean,
    isSmall: boolean,
    isMedium: boolean,
    isLarge: boolean,
    'is-Micro': boolean,
    'is|Micro': boolean,
    'isMicro+': boolean,
    'is-Micro+': boolean,
    'is|Micro+': boolean,
    'isMicro-': boolean,
    'is-Micro-': boolean,
    'is|Micro-': boolean,
    'is-Mobile': boolean,
    'is|Mobile': boolean,
    'isMobile+': boolean,
    'is-Mobile+': boolean,
    'is|Mobile+': boolean,
    'isMobile-': boolean,
    'is-Mobile-': boolean,
    'is|Mobile-': boolean,
    'is-Tablet': boolean,
    'is|Tablet': boolean,
    'isTablet+': boolean,
    'is-Tablet+': boolean,
    'is|Tablet+': boolean,
    'isTablet-': boolean,
    'is-Tablet-': boolean,
    'is|Tablet-': boolean,
    'is-Small': boolean,
    'is|Small': boolean,
    'isSmall+': boolean,
    'is-Small+': boolean,
    'is|Small+': boolean,
    'isSmall-': boolean,
    'is-Small-': boolean,
    'is|Small-': boolean,
    'is-Medium': boolean,
    'is|Medium': boolean,
    'isMedium+': boolean,
    'is-Medium+': boolean,
    'is|Medium+': boolean,
    'isMedium-': boolean,
    'is-Medium-': boolean,
    'is|Medium-': boolean,
    'is-Large': boolean,
    'is|Large': boolean,
    'isLarge+': boolean,
    'is-Large+': boolean,
    'is|Large+': boolean,
    'isLarge-': boolean,
    'is-Large-': boolean,
    'is|Large-': boolean
}
```

> _Rules-of-Hooks_ are still true in this case as well. Make sure
> your component will **ALWAYS** run it without any condition!

## Modifiers

All breakpoint names coming with modifiers included.

### Orientation prefix

-   `` (none): all
-   `-`: Landscape
-   `|`: Portrait

### Range suffix

You can also control your value to behave as `and up` and `and down`.

-   `` (none): all
-   `+`: `and up`
-   `-`: `and down`

### Examples

-   `['|mobile', 300]`: on mobile, on portrait
-   `['|mobile+', 300]`: on mobile and up, on portrait
-   `['mobile+', 300]`: on mobile and up, both portrait and landscape
-   `['mobile', 300]`: on mobile, both portrait and landscape
-   `['tablet-', 300]`: on tablet and below, both portrait and landscape
-   `['mobile-', 300]`: on mobile and down, both portrait and landscape

# Disclaimer

This hook is nothing but a superset of a combination of the following
two libraries:

-   [use-breakpoint](https://github.com/wintercounter/use-breakpoint)
-   [Bowser](https://github.com/lancedikson/bowser)

# FAQ

## Is there any best practice suggestion?

Yes! Use as fewer hooks as possible. It's always faster to have a single
`isMobile` variable and have simple conditions based on it. It's even better
if you can solve your size related cases using pure CSS Media Queries.

## Why not using an `Object`? Why the `Array` structure?

Object's cannot guarantee the order of the defined keys. It is crucial
to check for values in the correct order because `useBreakpoint` uses
eager evaluation and `mediaQuery` must maintain the defined order of
the generated Media Queries.

## Which rule is being prioritized?

The hook uses _eager_ evaluation, so the first truthy breakpoint value
gets returned.
