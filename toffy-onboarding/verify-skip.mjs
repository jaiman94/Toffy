import { chromium } from '@playwright/test';

async function verifySkip() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        viewport: { width: 390, height: 844 } // iPhone 14 Pro size
    });
    const page = await context.newPage();

    try {
        await page.goto('http://localhost:5173');
        console.log('Opened app');

        // Wait for welcome screen
        await page.waitForTimeout(1000);

        // Click Get Started
        await page.click('button:has-text("Get Started")');
        console.log('Clicked Get Started');
        await page.waitForTimeout(800);

        // Fill pet profile - name
        await page.fill('input[placeholder*="Max"]', 'Buddy');
        await page.waitForTimeout(300);

        // Select breed - click dropdown and search
        await page.click('button:has-text("Select breed")');
        await page.waitForTimeout(300);
        await page.fill('input[placeholder="Search..."]', 'Golden');
        await page.waitForTimeout(300);
        await page.click('text=Golden Retriever');
        await page.waitForTimeout(300);

        // Select age
        await page.click('button:has-text("1-2 years")');
        await page.waitForTimeout(300);

        // Continue to chat
        await page.click('button:has-text("Continue")');
        console.log('Entered chat screen');
        await page.waitForTimeout(1000);

        // Chat flow - click through intro
        await page.click('button:has-text("Let\'s do it")');
        await page.waitForTimeout(1000);

        // Living situation - select House with yard
        await page.click('text=House');
        console.log('Selected living situation');
        await page.waitForTimeout(1000);

        // Training goal - select Potty Training
        await page.click('text=Potty');
        console.log('Selected training goal');
        await page.waitForTimeout(1000);

        // Leadership intro
        await page.click('button:has-text("Let\'s go")');
        console.log('Starting Leadership assessment');
        await page.waitForTimeout(1000);

        // Leadership Part 1 - SpeedRound
        for (let i = 0; i < 6; i++) {
            const buttons = await page.locator('.flex.gap-1\\.5 button').all();
            if (buttons[i * 2]) {
                await buttons[i * 2].click();
                await page.waitForTimeout(100);
            }
        }
        await page.click('button:has-text("Done")');
        console.log('Completed Leadership Part 1');
        await page.waitForTimeout(2000); // Wait for thinking

        // Leadership Part 2 - SpeedRound
        for (let i = 0; i < 5; i++) {
            const buttons = await page.locator('.flex.gap-1\\.5 button').all();
            if (buttons[i * 2]) {
                await buttons[i * 2].click();
                await page.waitForTimeout(100);
            }
        }
        await page.click('button:has-text("Done")');
        console.log('Completed Leadership Part 2');
        await page.waitForTimeout(2000); // Wait for thinking

        // 5 Things intro
        await page.click('button:has-text("Check essentials")');
        console.log('Starting 5 Things assessment');
        await page.waitForTimeout(1000);

        // 5 Things - SpeedRound
        for (let i = 0; i < 5; i++) {
            const buttons = await page.locator('.flex.gap-1\\.5 button').all();
            if (buttons[i * 2]) {
                await buttons[i * 2].click();
                await page.waitForTimeout(100);
            }
        }
        await page.click('button:has-text("Done")');
        console.log('Completed 5 Things');
        await page.waitForTimeout(2000); // Wait for thinking

        // Severity Slider
        await page.click('button:has-text("Set")');
        console.log('Set severity');
        await page.waitForTimeout(2000); // Wait for thinking

        // Training Time
        await page.click('text=15-30 min');
        console.log('Selected training time');
        await page.waitForTimeout(1500);

        // Notification reminder - This is what we want to test!
        console.log('Checking for skip button...');
        const skipButton = page.locator('button:has-text("Maybe later")');
        await skipButton.waitFor({ state: 'visible', timeout: 5000 });
        console.log('Skip button found!');

        await skipButton.click();
        console.log('Clicked Skip button');
        await page.waitForTimeout(1000);

        // Verify it proceeds to "Let's see my plan!"
        const finalButton = page.locator('button:has-text("Let\'s see my plan!")');
        await finalButton.waitFor({ state: 'visible', timeout: 5000 });
        console.log('Proceeded to final screen successfully!');

        await page.screenshot({ path: 'skip-verification.png' });
        console.log('Screenshot saved as skip-verification.png');

    } catch (error) {
        console.error('Verification failed:', error);
        await page.screenshot({ path: 'verification-error.png' });
    } finally {
        await browser.close();
    }
}

verifySkip().catch(console.error);
