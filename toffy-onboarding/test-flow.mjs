import { chromium } from '@playwright/test';

async function runDemo() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 } // iPhone 14 Pro size
  });
  const page = await context.newPage();

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

  // Leadership Part 1 - SpeedRound (6 questions)
  // Answer Yes/No for each
  const speedRound1 = ['Yes', 'No', 'No', 'Yes', 'No', 'Yes'];
  for (let i = 0; i < 6; i++) {
    const buttons = await page.locator('.flex.gap-1\\.5 button').all();
    const idx = i * 2 + (speedRound1[i] === 'Yes' ? 0 : 1);
    if (buttons[idx]) {
      await buttons[idx].click();
      await page.waitForTimeout(200);
    }
  }
  await page.click('button:has-text("Done")');
  console.log('Completed Leadership Part 1');
  await page.waitForTimeout(1000);

  // Leadership Part 2 - SpeedRound (5 questions)
  const speedRound2 = ['Yes', 'No', 'Yes', 'No', 'Yes'];
  for (let i = 0; i < 5; i++) {
    const buttons = await page.locator('.flex.gap-1\\.5 button').all();
    const idx = i * 2 + (speedRound2[i] === 'Yes' ? 0 : 1);
    if (buttons[idx]) {
      await buttons[idx].click();
      await page.waitForTimeout(200);
    }
  }
  await page.click('button:has-text("Done")');
  console.log('Completed Leadership Part 2');
  await page.waitForTimeout(1000);

  // 5 Things intro
  await page.click('button:has-text("Check essentials")');
  console.log('Starting 5 Things assessment');
  await page.waitForTimeout(1000);

  // 5 Things - SpeedRound (5 questions)
  const speedRound3 = ['Yes', 'Yes', 'No', 'Yes', 'Yes'];
  for (let i = 0; i < 5; i++) {
    const buttons = await page.locator('.flex.gap-1\\.5 button').all();
    const idx = i * 2 + (speedRound3[i] === 'Yes' ? 0 : 1);
    if (buttons[idx]) {
      await buttons[idx].click();
      await page.waitForTimeout(200);
    }
  }
  await page.click('button:has-text("Done")');
  console.log('Completed 5 Things');
  await page.waitForTimeout(1000);

  // Sensitivities intro
  await page.click('button:has-text("Continue")');
  console.log('Starting Sensitivities assessment');
  await page.waitForTimeout(1000);

  // 5 Sliders - just click Set on each
  for (let i = 0; i < 5; i++) {
    await page.click('button:has-text("Set")');
    console.log(`Completed slider ${i + 1}/5`);
    await page.waitForTimeout(1000);
  }

  console.log('Done with new sections! Taking screenshot...');
  await page.screenshot({ path: 'flow-complete.png' });

  // Keep browser open for viewing
  console.log('Browser will stay open. Press Ctrl+C to close.');
  await page.waitForTimeout(60000);

  await browser.close();
}

runDemo().catch(console.error);
