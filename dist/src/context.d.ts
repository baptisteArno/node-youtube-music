declare const _default: {
    body: (lang?: string | undefined) => {
        context: {
            capabilities: {};
            client: {
                clientName: string;
                clientVersion: string;
                experimentIds: never[];
                experimentsToken: string;
                hl: string;
                locationInfo: {
                    locationPermissionAuthorizationStatus: string;
                };
                musicAppInfo: {
                    musicActivityMasterSwitch: string;
                    musicLocationMasterSwitch: string;
                    pwaInstallabilityStatus: string;
                };
                utcOffsetMinutes: number;
            };
            request: {
                internalExperimentFlags: {
                    key: string;
                    value: string;
                }[];
                sessionIndex: {};
            };
            user: {
                enableSafetyMode: boolean;
            };
        };
    };
};
export default _default;
