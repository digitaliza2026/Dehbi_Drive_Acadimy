const { chromium } = require("C:\\Users\\J.P.M\\AppData\\Roaming\\npm\\node_modules\\playwright");
const T = "C:\\Users\\J.P.M\\Downloads\\dehbi-drive-academy\\screenshots";
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("http://localhost:5173/reservation");
  await page.waitForTimeout(3500);
  await page.screenshot({ path: T + "\\04-reservation-fix.png" });
  console.log("done");
  await browser.close();
})().catch(e => { console.error(e.message); process.exit(1); });
