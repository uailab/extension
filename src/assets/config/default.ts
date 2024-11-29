interface DefaultConfig {
    useMorganLogRequest: boolean;
    mode: 'developing' | 'production';
};

const defaultConfig: DefaultConfig = process.env.PRODUCTION == "true" ? {
    useMorganLogRequest: false,
    mode: 'production'
}  : {
    useMorganLogRequest: true,
    mode: 'developing'
};

export default defaultConfig;