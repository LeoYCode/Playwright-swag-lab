export const isHash = (entity) =>
    Boolean(entity && typeof entity === 'object' && !Array.isArray(entity));

export const nestedKeyValue = (hash, keys) =>
    // eslint-disable-next-line @typescript-eslint/no-shadow
    keys.reduce((hash, key) => (isHash(hash) ? hash[key] : undefined), hash);

export const isUndefined = (val) => val === undefined || val === null || val === '';

export const evaluateSessionStatus = (status) => {
    if (!isUndefined(status)) {
        // eslint-disable-next-line no-param-reassign
        status = status.toLowerCase();
    }
    if (status === 'passed') {
        return 'passed';
    }
    if (status === 'failed' || status === 'timed out') {
        return 'failed';
    }
    return '';
};
