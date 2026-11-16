Playwright Test Framework

An end-to-end, API, accessibility, and visual test framework built with Playwright and TypeScript. It tests the practice site the-internet.herokuapp.com, and it’s organized so you can add tests for other applications later.

1. What You Need
Tool	Why	How to check
Node.js (LTS)	Runs Playwright and the scripts	node -v
npm	Installs packages (comes with Node)	npm -v
Git	Downloads and saves the project	git --version
Java 21	Needed only for Allure report generation	java -version
VS Code (recommended)	Editor	—

If a check fails, install the tool from its official site before continuing.

2. Get the Project
bash
git clone https://github.com/Velliangiri-Murugesh/DayToDayPlaywrightTask.git
cd DayToDayPlaywrightTask

Then install the packages and the browsers:

bash
npm install
npx playwright install chromium firefox

npm install reads package.json and downloads everything the project depends on. The playwright install command downloads the browsers the tests run in.

3. Set Up Your Local Secrets

The project reads login details and URLs from a file called .env. This file is git-ignored, so your real values never reach GitHub.

Step 1. Copy the template:

bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Mac / Linux
cp .env.example .env

Step 2. Open .env in VS Code and fill in the values:

BASE_URL=https://the-internet.herokuapp.com
STAGING_URL=https://the-internet.herokuapp.com
PROD_URL=https://the-internet.herokuapp.com
TEST_USERNAME=tomsmith
TEST_PASSWORD=SuperSecretPassword!

Step 3. Check that everything is set:

bash
node scripts/check-env.js

Expected output: All required .env values are set.

If you see Missing .env file or Missing values in .env: ..., fix the named value and run the check again.

Never paste your .env contents into a chat, issue, or commit.

4. Run Your First Test

Start with one small test to confirm the setup works:

bash
npx playwright test tests/ui/day2-dynamic-loading.spec.ts --project=chromium --grep-invert "@negative"

To watch the browser while it runs, add --headed:

bash
npx playwright test tests/ui/day2-dynamic-loading.spec.ts --project=chromium --headed

Expected result: 2 passed.

5. Project Structure
DayToDayPlaywrightTask/
├── .github/workflows/
│   └── playwright.yml          # CI pipeline (GitHub Actions)
├── config/
│   └── env.ts                  # The only file that reads process.env
├── fixtures/
│   └── loginFixtures.ts        # Custom fixture: a ready LoginPage for each test
├── pages/
│   └── LoginPage.ts            # Page Object: login page locators and actions
├── scripts/
│   ├── check-env.js            # Checks that .env has every required value
│   └── write-allure-env.js     # Writes the Allure Environment panel
├── test_data/
│   ├── user.json               # Test data (users and expected results)
│   └── test.txt                # File used by the upload test
├── tests/
│   ├── ui/                     # Browser tests (locators, forms, dialogs, login...)
│   ├── api/                    # API tests (no browser)
│   ├── a11y/                   # Accessibility checks (axe-core)
│   ├── visual/                 # Screenshot comparison
│   └── experiments/            # Deliberate-failure demos. Not run in CI.
├── utils/
│   └── helpers.ts              # Reusable functions (for example, loginAs)
├── .env.example                # Template for .env (committed)
├── .env                        # Your real values (never committed)
├── .gitignore
├── package.json                # npm scripts
└── playwright.config.ts        # Projects, reporters, and browser settings
What each layer is for
ui/: Tests that open a browser and interact with a page. They use the POM and fixtures.
api/: Tests that send HTTP requests directly with Playwright’s request fixture. They don’t open a page.
a11y/: Scans a page with axe-core and fails on serious or critical accessibility issues.
visual/: Compares a screenshot with a saved baseline image.
experiments/: Tests that fail on purpose to demonstrate a concept. They are not part of the regular run.
6. Test Tags

Tags are words in a test’s title or options. The --grep flag selects tests by tag, which is how the npm scripts pick which group to run.

Tag	Meaning	Used in
@smoke	Quick checks that run on every push	test:smoke, CI
@regression	Broader functional checks	test:regression, CI
@ui	Browser-based tests with data from JSON	test:regression, CI
@negative	Intentional failures that prove a check responds	Excluded from CI and test:all
@needs-session	Depends on a saved login file from a setup test	Excluded from the main run
@visual	Screenshot comparison	Local only
@wcag	Accessibility checks	test:a11y
@apiMock	Tests that replace a server response with a mock	Local

A test with two tags, such as @smoke and @ui, runs in both groups.

7. Run the Tests

The easiest way is with the npm scripts in package.json:

Command	What it runs
npm run test:smoke	Smoke tests (@smoke)
npm run test:regression	UI and regression tests (@regression or @ui)
npm run test:api	API tests in tests/api
npm run test:a11y	Accessibility tests in tests/a11y
npm run test:visual	Visual tests in tests/visual
npm run test:negative	Intentional-failure tests (@negative). These are expected to fail.
npm run test:all	Everything except @negative and @needs-session
npm run report:allure	Writes the Allure report and opens it in your browser
The saved-login tests (run in order)

The @needs-session test needs a saved login file, so the setup test has to run first:

bash
npx playwright test day17-auth-setup --project=chromium
npx playwright test day17-auth-reuse --project=chromium
Run one file
bash
npx playwright test tests/api/day12-api.spec.ts --project=chromium
Run in one browser

Add --project=chromium or --project=firefox.

Run with the browser window open

Add --headed to any command.

8. Reports

The framework writes several reports on each run:

Report	Location	How to view
Terminal list	Printed during the run	Automatic
Playwright HTML	playwright-report/	npx playwright show-report
JUnit XML (for CI tools)	test-results/results.xml	Open in any text editor
JSON	test-results/results.json	Open in any text editor
Allure	allure-report/	npm run report:allure
Allure notes
Allure needs Java 21. Check with java -version.
Run npm run report:allure after a test run. It writes the Environment panel, generates the report, and opens it.
Allure reads results from allure-results/, which is created by the test run.

Don’t add --reporter=list to a command when you want Allure results. A command-line reporter replaces the reporters in playwright.config.ts, so Allure gets nothing.

9. Debugging a Failed Test
Read the first Error: line. The first error is usually the real cause. Later errors often follow from it.
Open the HTML report: npx playwright show-report. Click the failed test to see the steps, the screenshot, and the error.
Open the trace: Failed tests keep a trace file in test-results/. Open it with:
bash
npx playwright show-trace test-results/<folder>/trace.zip

In the viewer, the Actions panel shows each step, and the Snapshot panel shows the page at that moment.

10. Continuous Integration (GitHub Actions)

The workflow in .github/workflows/playwright.yml runs on every push and pull request to main or master.

Each run:

Installs dependencies and Chromium.
Writes a .env file on the runner from GitHub Secrets.
Checks the environment.
Runs smoke, then UI and regression, then API, then accessibility.
Creates the saved login session and runs the session reuse test.
Uploads Allure results as an artifact if anything fails.
Set up the secrets

In your GitHub repository, go to Settings > Secrets and variables > Actions and add three repository secrets, one per value:

Name	Value
TEST_USERNAME	Your test username
TEST_PASSWORD	Your test password
BASE_URL	The site URL

Never create a single secret that holds several values. The workflow reads each secret by its own name.

11. Known Limitations
Visual tests don’t run in CI. The baseline image is for Windows (login-chromium-win32.png). Ubuntu needs its own baseline, so the visual step was removed from CI. Visual tests still run locally.
test:all includes tests/experiments/. That folder is excluded from Git but not from Playwright’s test run, so day34-flaky still runs in test:all. To skip it everywhere, add testIgnore: ['**/experiments/**'] to playwright.config.ts.
Smoke coverage is small. Only the login and logout checks are tagged @smoke. Add the tag to more stable tests to widen coverage on every push.
Old commits may be cached on GitHub. A secret file was removed from history earlier. Contact GitHub Support if you need the cached copies purged.
12. Troubleshooting
Problem	Likely cause	Fix
Missing .env file	.env not created	Copy .env.example to .env
Missing values in .env: X	A value is empty	Fill in the named value
Executable doesn't exist	Browser not installed	npx playwright install chromium firefox
ENOENT ... user.json	Saved-login file not created	Run day17-auth-setup first
allure-results does not exist	Test run used --reporter=...	Run again without the --reporter flag
Cannot find module after moving files	Import path is one level off	Count the ../ levels from the file’s folder
Test passes locally, fails in CI	Local file missing on runner, or OS-specific baseline	Check the first Error: line in the Actions log
Missing X server or $DISPLAY	Browser opened a window on a Linux runner	Use headless mode on CI (headless: !!process.env.CI)
13. Adding a New Test
Choose the layer folder: tests/ui, tests/api, tests/a11y, or tests/visual.
Create <name>.spec.ts in that folder.
Import from the shared files, not from @playwright/test directly, when you need a fixture:
typescript
import { test, expect } from '../../fixtures/loginFixtures';
Use LoginPage for login steps instead of raw locators.
Add a tag to the title or the options so the right script picks it up:
typescript
test('myNewTest', { tag: '@smoke' }, async ({ page }) => { /* ... */ });
Run it with npx playwright test tests/ui/<name>.spec.ts --project=chromium.

Don’t put credentials or URLs in a test file. Read them through config/env.ts, or from .env.