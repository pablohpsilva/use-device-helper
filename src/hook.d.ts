import { UseBreakpoint } from './types';
export interface UserDeviceBreakpoints extends UseBreakpoint {
    browser: {
        name: string;
        version: string;
    };
    engine: {
        name: string;
        version: string;
    };
    os: {
        name: string;
        version: string;
    };
    platform: {
        type: string;
        vendor: string;
        model: string;
    };
}
export declare const useDeviceBreakpoints: () => UserDeviceBreakpoints;
