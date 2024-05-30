import Env from '../utils/env';
import {browsers} from './browserstack';
import * as util from './browserstack-helper';

require('dotenv').config();

export default class BstackService {
    public caps: { build?: string };

    public setBstackBuildCaps(project) {
        this.caps = browsers[project];
        this.caps.build = Env.BROWSERSTACK_BUILD
        this.caps['browserstack.local'] = Env.BROWSERSTACK_LOCAL || 'false';
    }

    public async startBrowser(playwright) {
        // eslint-disable-next-line @typescript-eslint/return-await
        return await playwright.chromium.connect({
            wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
                JSON.stringify(this.caps)
            )}`,
        });
    }

    public async setTestResult(page, testInfo) {
        const testResult = {
            action: 'setSessionStatus',
            arguments: {
                status: util.evaluateSessionStatus(testInfo.status),
                reason: util.nestedKeyValue(testInfo, ['error', 'message']),
            },
        };
        await page.evaluate(() => {
        }, `browserstack_executor: ${JSON.stringify(testResult)}`);
    }

    public async setSessionName(page, testInfo) {
        const sessionName = {
            action: 'setSessionName',
            arguments: {
                name: `${testInfo.project.name}/${testInfo.file.split('/').slice(-2).join('/')}`,
            },
        };
        await page.evaluate(() => {
        }, `browserstack_executor: ${JSON.stringify(sessionName)}`);
    }

    public async getSessionDetails(page) {
        const session = await page.evaluate(() => {
            },
            'browserstack_executor: {"action": "getSessionDetails"}');
        return JSON.parse(session);
    }
}
