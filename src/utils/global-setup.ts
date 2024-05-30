// global-setup.js
import colors from 'cli-color';
import dotenv from "dotenv"
import {FullConfig} from '@playwright/test';
import {isBstackLocal} from '../browserstack/browserstack';
import Env from './env';

const {bsLocal, BS_LOCAL_ARGS} = require('../base/fixture');

async function globalSetup(config: FullConfig) {

    // Get test environment
    dotenv.config({
        path: `./env/.${Env.TEST_ENVIRONMENT}.env`
    });

    // Setup BrowserStack Tunnel
    if (isBstackLocal) {
        console.log(colors.magenta('---------------Global set up started--------------'));
        console.log(colors.yellow('Establishing browserstack local tunnel connection..'));
        bsLocal.startSync(BS_LOCAL_ARGS);
        if (bsLocal.isRunning()) {
            console.log(colors.green('Browserstack Local STARTED..'));
        } else {
            throw new Error('Browserstack Local is not started. Try Again..');
        }
        console.log(colors.magenta('--------------Global set up done------------------'));
    }
}

export default globalSetup;
