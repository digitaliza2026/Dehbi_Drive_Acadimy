const { chromium } = require("C:\\Users\\J.P.M\\AppData\\Roaming\\npm\\node_modules\\playwright");
const T = "C:\\Users\\J.P.M\\Downloads\\dehbi-drive-academy\\screenshots";
const fs = require("fs");
if (!fs.existsSync(T)) fs.mkdirSync(T);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();

  // 1. Loading screen
  await page.goto("http://localhost:5173/");
  await page.screenshot({ path: T + "\\01-loader.png" });
  console.log("✓ 01 loading screen");

  // 2. Hero after 2s spec loader
  await page.waitForTimeout(2500);
  await page.screenshot({ path: T + "\\02-hero.png" });
  console.log("✓ 02 hero —", await page.title());

  // 3. Formations
  await page.click("a[href='/formations']");
  await page.waitForTimeout(2800);
  await page.screenshot({ path: T + "\\03-formations.png" });
  console.log("✓ 03 formations");

  // 4. Reservation (parallel fetch + skeleton)
  await page.click("a[href='/reservation']");
  await page.waitForTimeout(2800);
  await page.screenshot({ path: T + "\\04-reservation.png" });
  console.log("✓ 04 reservation");

  // 5. Admin login
  await page.goto("http://localhost:5173/admin/login");
  await page.waitForTimeout(800);
  await page.fill("input[type=text]", "admin");
  await page.fill("input[type=password]", "admin123");
  await page.click("button[type=submit]");
  await page.waitForTimeout(2200);
  await page.screenshot({ path: T + "\\05-dashboard.png" });
  console.log("✓ 05 admin dashboard @", page.url());

  // 6. Galerie upload modal
  await page.goto("http://localhost:5173/admin/galerie");
  await page.waitForTimeout(700);
  await page.click("button:has-text('Ajouter')");
  await page.waitForTimeout(600);
  await page.screenshot({ path: T + "\\06-upload-modal.png" });
  console.log("✓ 06 drag-drop upload modal");

  // 7. Settings security section
  await page.keyboard.press("Escape");
  await page.goto("http://localhost:5173/admin/parametres");
  await page.waitForTimeout(700);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);
  await page.screenshot({ path: T + "\\07-security.png" });
  console.log("✓ 07 security section");

  // 8. API smoke
  const health = await page.evaluate(() => fetch("/api/health").then(r => r.json()));
  const formations = await page.evaluate(() => fetch("/api/formations").then(r => r.json()));
  const creneaux = await page.evaluate(() => fetch("/api/creneaux").then(r => r.json()));
  console.log("✓ API health:", JSON.stringify(health));
  console.log("✓ formations:", formations.length, "| creneaux:", creneaux.length);

  await browser.close();
  console.log("\n🚗 All checks passed.");
})().catch(e => { console.error("FAIL:", e.message); process.exit(1); });
