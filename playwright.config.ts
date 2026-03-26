//IMports
import { defineConfig } from '@playwright/test';
import path from 'path';

//DEfines the specific configuration for this Playwright Project
export default defineConfig({
  //General testing-directory.
  testDir: './tests',
  //setup of reporters to report errors and logs after tests have run
  reporter: [
    ['list'],
    ['json', {  outputFile: 'test-results/JSON-Report/test-results.json' }]
  ],
  //setup of the automated server for testrunning
  webServer: {
    //command to stat the autoamted server when tests start, 
    command: `npx serve ${path.resolve(__dirname, 'setup')} -l 3000`,
    timeout: 6000,
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  //setup of general configuration for Playwright to use
  use: {
    //URL of standard test page. If no adress is given, tests will open this adress
    baseURL: 'http://localhost:3000',
    //run all tests in a headless Browser
    headless: true,
    //defines the size of the viewport
    viewport: { width: 900, height: 700 },
    launchOptions: {
      args: ['--use-gl=angle']
    }
  }
});