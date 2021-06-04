import React from 'react'
import { useDeviceHelper } from './hook'
import { DeviceHelperProvider } from './provider'
import './story.css'

const Component = () => {
    const value = useDeviceHelper(
        'none',
        [
            ['micro', 'is micro'],
            ['mobile', 'is mobile'],
            ['tablet', 'is tablet'],
            ['small', 'is small'],
            ['medium', 'is medium'],
            ['large', 'is large']
        ],
        { macos: {} }
    )

    console.log(value)

    return (
        <div className="wrapper">
            Example code
            <pre>
                {`const value = useDeviceBreakpoints('none', [
      ['micro', 'is micro'],
      ['mobile', 'is mobile'],
      ['tablet', 'is tablet'],
      ['small', 'is small'],
      ['medium', 'is medium'],
      ['large', 'is large']
  ],
  {macos: {chrome: '>80'}})`}
            </pre>
            <div>`{value?.value}` is the current value. Resize to change.</div>
            <p>
                <span>
                    {value?.platform?.vendor} - {value?.platform?.type}
                </span>
                <br />
                <span>
                    {value?.browser?.name} - v{value?.browser?.version}
                </span>
                <br />
                <span>{value?.engine?.name}</span>
                <br />
                <span>
                    {value?.os?.name} - v{value?.os?.version} - {value?.os?.versionName}
                </span>
                <br />
                <br />
                <span>
                    Is Chrome MacOS({`{ macos: { chrome: ">80" } }`})? {value?.satisfies ? 'true' : 'false'}
                </span>
            </p>
        </div>
    )
}

export default {
    title: 'useDeviceBreakpoints',
    component: Component,
    decorators: [fn => <DeviceHelperProvider>{fn()}</DeviceHelperProvider>]
}

export const Basic = () => <Component />
