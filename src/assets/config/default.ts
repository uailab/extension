interface DefaultConfig {
    mode: 'developing' | 'production';
    useMorganLogRequest: boolean;
    logError: {
        message: boolean;
        data: boolean;
    };
};

const defaultConfig: DefaultConfig = process.env.PRODUCTION == "true" ? {
    useMorganLogRequest: false,
    logError: {
        message: false,
        data: false
    },
    mode: 'production'
}  : {
    useMorganLogRequest: true,
    logError: {
        message: true,
        data: true
    },
    mode: 'developing'
};

export default defaultConfig;