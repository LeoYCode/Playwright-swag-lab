import {PlaywrightTestConfig} from '@playwright/test';
import {VIEWPORTS} from './src/browserstack/browserstack';

const config: PlaywrightTestConfig = {
    globalSetup: require.resolve('./src/utils/global-setup'),
    testDir: './src/tests',
    /* Maximum time one test can run for. */
    timeout: 120000,
    expect: { timeout: 5000 },
    retries: 0,
    workers: process.env.CI ? 3 : 1,
    projects: [
        {
            name: 'chrome',
            testMatch: '**/*.spec.ts',
            use: {
                ignoreHTTPSErrors: false,
                browserName: 'chromium',
                headless: false,
                channel: 'chrome',
                viewport: VIEWPORTS.desktop,
                screenshot: 'only-on-failure',
            },
        },
        {
            name: 'chrome-headless',
            testMatch: '**/*.spec.ts',
            use: {
                ignoreHTTPSErrors: false,
                browserName: 'chromium',
                headless: true,
                channel: 'chrome',
                viewport: VIEWPORTS.desktop,
                screenshot: 'only-on-failure',
            },
        },
        {
            name: 'firefox',
            use: {
                browserName: 'firefox',
                headless: false,
                channel: 'firefox',
                viewport: VIEWPORTS.desktop,
                ignoreHTTPSErrors: true,
                screenshot: 'only-on-failure',
            },
        },
        {
            name: 'safari',
            use: {
                browserName: 'webkit',
                headless: false,
                channel: 'webkit',
                viewport: VIEWPORTS.desktop,
                ignoreHTTPSErrors: true,
                screenshot: 'only-on-failure',
            },
        },
        {
            name: 'markets',
            use: {
                browserName: 'chromium',
                headless: false,
                channel: 'chrome',
                ignoreHTTPSErrors: true,
            },
        },
    ],
    expect: {
        timeout: 5000,
    },
    reporter: [
        [
            'html',
            {
                outputFolder: 'artifacts/report',
                open: 'never',
            },
        ],
        [
            'junit',
            {
                outputFile: 'artifacts/results.xml',
                textContentAnnotations: ['test_description'],
                embedAttachmentsAsProperty: 'testrun_evidence',
                open: 'never',
            },
        ],
    ],
};
export default config;
