import { test } from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';
import { LoginUser } from './pageobjects/LoginUser';

test('Setup: Guardar sesión', async ({ page }) => {
  await page.goto('https://valiqc-frontend-general-pruebas.azurewebsites.net/#/login');

  const loginUser = new LoginUser(page);
  await page.waitForTimeout(2000); // Esperar que cargue el input
  await loginUser.fillUsername();

  const loginPage = new LoginPage(page);
  await loginPage.clickOnSedeButton();
  await page.waitForTimeout(1000);
  await loginPage.clickOnSedeNombre();
  await page.waitForTimeout(500);

  console.log("⚠️ Resuelve manualmente el CAPTCHA.");
  await page.pause(); // DETIENE la ejecución hasta que resuelvas el CAPTCHA

  await loginPage.clickOnLogin();
  await page.waitForTimeout(5000); // Esperar la redirección

  // Guardar la sesión después del login
  await page.context().storageState({ path: 'storageState.json' });
  console.log("⚠️ Sesión guardada correctamente.");
});
