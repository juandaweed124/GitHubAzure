
import { test, expect } from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';
import { waitForDebugger } from 'inspector';
import path, { parse } from 'path';
import { LoginUser } from './pageobjects/LoginUser';
import { LoteManager } from './pageobjects/LoteManager';
import { getExcelData, readExcel } from './pageobjects/readExcel';

test('Guardar sesión en storageState.json', async ({ page, context }) => {
  await page.goto('https://valiqc-frontend-general-pruebas.azurewebsites.net/#/login');
  await page.getByRole('button', { name: 'Aceptar' }).click();

  // Realiza el login manualmente
  const loginUser = new LoginUser(page);
  await loginUser.fillUsername(); // <- Asegurarse de llenar el usuario antes de continuar
  const loginPage = new LoginPage(page);
  await loginPage.clickOnSedeButton();
  await page.waitForTimeout(1000);
  await loginPage.clickOnSedeNombre();
  await page.waitForTimeout(500);await page.pause();
  await loginPage.clickOnCaptcha(page); 
  
  await page.waitForTimeout(1000);
  await loginPage.clickOnLogin();

  // Esperar que la sesión se cargue completamente
  await page.waitForURL('https://valiqc-frontend-general-pruebas.azurewebsites.net/panel/inicio');

  console.log("✅ Login exitoso, guardando storageState...");

   // Guardar el estado de sesión con ruta absoluta
    const storagePath = path.resolve(__dirname, '../storageState.json');
    await context.storageState({ path: storagePath });

    console.log(`✅ storageState.json guardado en ${storagePath}`);
});