
import Env from '../utils/env';

export const isBstack = Env.BROWSERSTACK_TEST === 'true';
export const isBstackLocal = Env.BROWSERSTACK_LOCAL === 'true';

export const credentials = {
    'browserstack.username': Env.BROWSERSTACK_USERNAME,
    'browserstack.accessKey': Env.BROWSERSTACK_ACCESS_KEY,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const common_capabilities = {
    project: 'swag labs',
    'browserstack.debug': 'true',
    'browserstack.video': 'true',
    'browserstack.console': 'verbose',
    'browserstack.networkLogs': 'true',
    'goog:chromeOptions': {
        'args': ["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"]
    },
    'browserstack.wsLocalSupport': 'true',
    acceptSslCert: 'true',
    browserstackLocal: 'true',
};

export const browsers = {
    chrome: {
        browser: 'chrome',
        browser_version: '122',
        os: 'Windows',
        os_version: '11',

        ...credentials,
        ...common_capabilities,
    },
    firefox: {
        browser: 'playwright-firefox',
        browser_version: 'latest',
        os: 'osx',
        os_version: 'Ventura',
        ...credentials,
        ...common_capabilities,
    },
    safari: {
        browser: 'playwright-webkit',
        browser_version: 'latest',
        os: 'osx',
        os_version: 'Ventura',
        ...credentials,
        ...common_capabilities,
    },
    edge: {
        browser: 'edge',
        browser_version: 'latest',
        os: 'Windows',
        os_version: '11',
        ...credentials,
        ...common_capabilities,
    },
    iphone: {
        browser: 'playwright-webkit',
        browser_version: 'latest',
        os: 'osx',
        os_version: 'Ventura',
        ...credentials,
        ...common_capabilities,
    },
    android: {
        browser: 'chrome',
        browser_version: 'latest',
        os: 'osx',
        os_version: 'Ventura',
        ...credentials,
        ...common_capabilities,
    },
};

export const VIEWPORTS = {
    desktop: {width: 1680, height: 1280},
    iPhone14Pro: {width: 393, height: 786},
    pixel7: {width: 412, height: 796},
};
