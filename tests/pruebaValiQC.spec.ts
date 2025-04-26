import { chromium, expect } from '@playwright/test';
import { test } from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';
import { waitForDebugger } from 'inspector';
import path, { parse } from 'path';
import { LoginUser } from './pageobjects/LoginUser';
import { LoteManager } from './pageobjects/LoteManager';
import { getExcelData, readExcel } from './pageobjects/readExcel';

// Login Vali QC //


test('Crear Unidad de medida', async ({ page }) => {
  
  await page.goto('https://valiqc-frontend-general-pruebas.azurewebsites.net/#/login');
  // Login
  const loginUser = new LoginUser(page);
  await loginUser.fillUsername();
  const loginPage = new LoginPage(page);
  await loginPage.clickOnSedeButton();
  await page.waitForTimeout(500);
  await loginPage.clickOnSedeNombre();
  await page.waitForTimeout(500);
  await loginPage.clickOnLogin();

  console.log("✅ Login exitoso");

  // CREAR UNIDAD DE MEDIDA Y SECCIÓN
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Control Calidad Interno' }).click();
  await page.getByText('keyboard_arrow_right Configuración Unidades de MedidaSecciónAnalí').click();
  await expect(page.locator('#accordion-header-1')).toContainText('Unidades de Medida');
  await page.getByText('Unidades de Medida', { exact: true }).click();
  await page.getByRole('button', { name: 'Crear' }).click();
  await page.getByLabel('Unidad').fill('Unidad de medida automatizada 1');
  await page.locator('#mat-mdc-slide-toggle-6-button').click();
  await page.getByRole('button', { name: 'Guardar' }).click();
  await expect(page.getByRole('alert', { name: 'Registro creado' })).toBeVisible();
  await page.waitForTimeout(500);
  console.log("✅ Unidad de medida creada correctamente");


});
//Test de prueba Automatizacion Capacitación


test('Crear Seccion', async ({ page }) => {
  await page.goto('https://valiqc-frontend-general-pruebas.azurewebsites.net/#/login');
  // Login
  const loginUser = new LoginUser(page);
  await loginUser.fillUsername();
  const loginPage = new LoginPage(page);
  await loginPage.clickOnSedeButton();
  await page.waitForTimeout(500);
  await loginPage.clickOnSedeNombre();
  await page.waitForTimeout(500);
  await loginPage.clickOnLogin();

  console.log("✅ Login exitoso");

//Crear seccion
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Control Calidad Interno' }).click();
  await page.getByText('keyboard_arrow_right Configuración Unidades de MedidaSecciónAnalí').click();
  await page.getByText('Sección').click();
  await page.getByRole('button', { name: 'Crear' }).click();
  await page.getByRole('textbox', { name: 'Sección' }).click();
  await page.getByRole('textbox', { name: 'Sección' }).fill('Seccion automatizada 1');
  await page.getByText('Constante Z', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Constante Z' }).fill('3');
  await page.locator('#mat-mdc-slide-toggle-6-button').click();
  await page.getByRole('button', { name: 'Guardar' }).click();
  await expect(page.getByRole('alert', { name: 'Registro creado' })).toBeVisible();
  
  console.log("✅ Sección creada exitosamente");
  await page.waitForTimeout(1000);

});
  
  
test('Crear Analito', async ({ page }) => {
  await page.goto('https://valiqc-frontend-general-pruebas.azurewebsites.net/#/login');
  // Login
  const loginUser = new LoginUser(page);
  await loginUser.fillUsername();
  const loginPage = new LoginPage(page);
  await loginPage.clickOnSedeButton();
  await page.waitForTimeout(500);
  await loginPage.clickOnSedeNombre();
  await page.waitForTimeout(500);
  await loginPage.clickOnLogin();

  console.log("✅ Login exitoso");

//Crear Analito
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Control Calidad Interno' }).click();
  await page.getByText('keyboard_arrow_right Configuración Unidades de MedidaSecciónAnalí').click();
  await page.getByText('Analítos').nth(0).click();
  await page.getByRole('button', { name: 'Crear' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).fill('Analito automatizado 2');
  await page.getByRole('spinbutton', { name: 'Nivel' }).click();
  await page.getByRole('spinbutton', { name: 'Nivel' }).fill('3');
    await page.locator('#mat-mdc-form-field-label-14').getByText('Sección').click();
  await page.locator('#mat-option-54').getByText('Seccion Automatizada 1').click();
  await page.locator('#mat-select-value-5').click();
  await page.getByText('Cuantitativo').click();
  await page.locator('#mat-mdc-slide-toggle-6-button').click();
  await page.getByRole('button', { name: 'Guardar' }).click();
  await expect(page.getByRole('alert', { name: 'Registro creado' })).toBeVisible();

  
  console.log("✅ Analito creado exitosamente");
  await page.waitForTimeout(1000);
  await page.close();
});


  test('Crear Lote', async ({ page }) => {
    await page.goto('https://valiqc-frontend-general-pruebas.azurewebsites.net/#/login');
      // Realizar el inicio de sesión
    // Login
  const loginUser = new LoginUser(page);
  await loginUser.fillUsername();
  const loginPage = new LoginPage(page);
  await loginPage.clickOnSedeButton();
  await page.waitForTimeout(500);
  await loginPage.clickOnSedeNombre();
  await page.waitForTimeout(500);
  await loginPage.clickOnLogin();
      // Finalizar el inicio de sesión
  await page.getByRole('button', { name: 'Control Calidad Interno' }).click();
  await page.getByText('keyboard_arrow_right Configuración Unidades de MedidaSecciónAnalí').click();
  await expect(page.locator('#accordion-header-1')).toContainText('Lotes');
      // Inicia Crear Lote
      const loteManager = new LoteManager(page);
      const nombreLote1 = await loteManager.generarNombreLote();
      console.log(nombreLote1); // Output: Ejemplo de nombre aleatorio: oQzP3LwS
      await loteManager.seleccionarFechaActual();
     // Activar el botón toggle
     await page.locator('#mat-mdc-slide-toggle-6-button').first().click();
      await page.getByRole('button', { name: 'Guardar' }).click();
      await expect(page.getByRole('alert', { name: 'Registro creado' })).toBeVisible();
      await page.waitForTimeout(1000);
  });



  test('Lote Materiales de Control QCI', async ({ page }) => {
    await page.goto('https://valiqc-frontend-general-pruebas.azurewebsites.net/#/login');
    // Realizar el inicio de sesión
  // Login
const loginUser = new LoginUser(page);
await loginUser.fillUsername();
const loginPage = new LoginPage(page);
await loginPage.clickOnSedeButton();
await page.waitForTimeout(500);
await loginPage.clickOnSedeNombre();
await page.waitForTimeout(500);
await loginPage.clickOnLogin();
    // Finalizar el inicio de sesión

//Crear Material de control
await page.waitForTimeout(1000);
await page.getByRole('button', { name: 'Control Calidad Interno' }).click();
await page.getByText('keyboard_arrow_right Configuración Unidades de MedidaSecciónAnalí').click();
await page.getByText('Materiales de Control').nth(0).click();
await page.getByRole('button', { name: 'Crear' }).click();
await page.getByRole('textbox', { name: 'M. de control' }).click();
await page.getByRole('textbox', { name: 'M. de control' }).fill('Material de control automatizado 1');
await page.locator('#mat-mdc-slide-toggle-6-button').click();
await page.getByRole('button', { name: 'Guardar' }).click();
await expect(page.getByRole('alert', { name: 'Registro creado' })).toBeVisible();
await page.close();
});

  test('Consumo de excel', async ({ page }) => {
    const excelFileName = 'ExcelPrueba.xlsx';
    const excelFilePath = path.join(__dirname, '.', 'pageobjects', excelFileName);

    // Leer datos del Excel
    const { descripcion, nivel, dropdownValue } = await getExcelData(excelFilePath);

    if (!dropdownValue) {
        console.error('Error: El valor de dropdownValue está vacío o no se obtuvo correctamente del Excel.');
        return;
    }

    await page.goto('https://valiqc-frontend-general-pruebas.azurewebsites.net/#/login');

    // Realizar el inicio de sesión
    const loginUser = new LoginUser(page);
    await loginUser.fillUsername();
    const loginPage = new LoginPage(page);
    await loginPage.clickOnSedeButton();
    await page.waitForTimeout(500);
    await loginPage.clickOnSedeNombre();
    await page.waitForTimeout(500);
    await loginPage.clickOnLogin();
    
    // Crear Analito Cuanti
    await page.getByRole('button', { name: 'Control Calidad Interno' }).click();
    await page.getByText('keyboard_arrow_right Configuración Unidades de MedidaSecciónAnalí').click();
    await page.getByText('Analítos').nth(0).click();
    await page.getByRole('button', { name: 'Crear' }).click();

    // Ingresar datos desde Excel
    await page.getByRole('textbox', { name: 'Nombre' }).click();
    await page.getByRole('textbox', { name: 'Nombre' }).fill(descripcion);
    await page.getByRole('spinbutton', { name: 'Nivel' }).click();
    await page.getByRole('spinbutton', { name: 'Nivel' }).fill(nivel);

    // Seleccionar valor de la lista desplegable de programas
    console.log(`Valor de dropdownValue: '${dropdownValue.trim()}'`);

    // Abrir la lista desplegable
    await page.locator('#mat-mdc-form-field-label-14').click();

    // Esperar a que las opciones estén en el DOM
    await page.waitForSelector('.mat-mdc-option', { state: 'visible' });

    // Obtener todas las opciones disponibles en el dropdown
    const options = await page.$$('.mat-mdc-option');
    console.log(`Se encontraron ${options.length} opciones en la lista desplegable`);

    // Verificar el texto de cada opción
    let optionFound = false;
    for (const option of options) {
        const text = (await option.textContent())?.trim();
        console.log(`Opción encontrada: '${text}'`);

        if (text === dropdownValue.trim()) {
            console.log(`Seleccionando opción: '${text}'`);
            await option.click();
            optionFound = true;
            break;
        }
    }

    // Si no encontró la opción, manejar el error
    if (!optionFound) {
        console.error(`Error: No se encontró la opción '${dropdownValue.trim()}' en la lista desplegable.`);
    }

    // Continuar con la selección de otros campos
    await page.locator('#mat-select-value-5').click();
    await page.getByText('Cuantitativo').click();
    await page.locator('#mat-mdc-slide-toggle-6-button').click();
    await page.getByRole('button', { name: 'Guardar' }).click();
    await expect(page.getByRole('alert', { name: 'Registro creado' })).toBeVisible();
    await page.waitForTimeout(1000);
    await page.close();
});



  
/*
test('Crear Analito Cuali QCI', async ({ page }) => {
  await page.goto('https://valiqc-frontend-general-pruebas.azurewebsites.net/#/login');
  const Login = new LoginPage(page)
  await Login.LoginWithCredentials('ANNARVALI', 'VALIQCANNAR')
  await expect (page.getByRole('img', {name: 'logo IT Healt'})).toBeVisible();
  await page.locator('a').filter({ hasText: 'Control Calidad Interno' }).click();
  await page.locator('a').filter({ hasText: /^Configuración$/ }).nth(1).click();
  await page.getByText('Analítos').first().click();
  await page.getByText('Crear').click();
  await page.locator('#desAnalytes').click();
  await page.locator('#desAnalytes').fill('Analito Cuanti QA Auto');
  await page.getByLabel('Nivel *').click();
  await page.getByLabel('Nivel *').fill('3');
  await page.locator('#mat-input-1').click();
  await page.getByText('Seccion Juan Simulacion').click();
  await page.getByLabel('Tipo resultado *').locator('div').nth(1).click();
  await page.getByText('Cualitativo', { exact: true }).click();
  await page.locator('#mat-slide-toggle-6 div').first().click();
  await page.getByRole('button', { name: 'Aceptar' }).click();
});


test('Ingreso de Datos y visualizacion de graficas CCI', async ({ page }) => {
  // Login //
  await page.goto('https://valiqc-frontend-general-pruebas.azurewebsites.net/#/login');
  const Login = new LoginPage(page)
  await Login.LoginWithCredentials('ANNARVALI', 'VALIQCANNAR')
  // Modulo //
  await page.locator('a').filter({ hasText: 'Control Calidad Interno' }).click();
  await page.locator('a').filter({ hasText: /^Ingreso de datos$/ }).click();
  await page.getByText('Cuantitativos', { exact: true }).click();
  await page.locator('#mat-input-0').click();
  await page.getByRole('option', { name: 'seccion juan simulacion' }).locator('span').click();
  await page.locator('#mat-input-1').click();
  await page.getByRole('option', { name: 'Material de Control Juan Simulacion' }).locator('span').click();
  await page.locator('#mat-input-2').click();
  await page.getByRole('option', { name: 'LoteSimulacionJuan99999' }).locator('span').click();
  await page.getByLabel('Test *').locator('div').nth(1).click();
  await page.getByText('Analito Cuanti Juan Simulacion | ng/mL | Metodo Juan Simulacion | Reactivos Juan').click();
  await page.getByText('Buscar').click();
  // Ingreso de datos Nivel 1
  await page.waitForTimeout(6000);
  await page.locator('input[type="number"]').first().click();
  await page.locator('input[type="number"]').first().fill('115');
  // Ingreso de datos Nivel 2 
  await page.locator('input[type="number"]').nth(1).click();
  await page.locator('input[type="number"]').nth(1).fill('65');
  // Ingreso de datos Nivel 3
  await page.locator('input[type="number"]').nth(2).click();
  await page.locator('input[type="number"]').nth(2).fill('85');
  await page.pause()
  // Ingreso de Comentarios
  await page.getByLabel('Comentarios').click();
  await page.getByLabel('Comentarios').fill('Automatizacion De prueba 03/12/2023');
  await page.getByText('Aplicar').click();
  await page.getByText('Multi Levey Jennings').click();
});




// EVENTOS DE REGRESION QCE Demo Emisor //

test('Login ValiQC Demo Emisor', async ({ page }) => {
  await page.goto('http://valiqc-demo-emisor.ithealth.co/#/login');
  const Login = new LoginPage(page)
  await Login.LoginWithCredentials('ANNARVALI', 'VALIQCANNAR')

//  await page.pause()
  await page.locator('a').filter({ hasText: 'Control Calidad Externo' }).click();
  await page.locator('a').filter({ hasText: 'Administración' }).nth(1).click();
  await page.getByText('Rondas').click();
  await page.getByLabel('Cliente *').locator('div').nth(1).click();
  await page.getByRole('option', { name: 'demo cliente1' }).locator('span').click();
  await page.getByLabel('Sede*').locator('span').click();
  await page.getByText('Sede Principal', { exact: true }).click();
  await page.getByLabel('Programa *').locator('span').click();
  await page.getByRole('option', { name: 'IT HEALTH - CUANTI' }).locator('span').click();
  await page.getByRole('button', { name: 'Buscar' }).click();
  await expect(page.getByLabel('Change sorting for Nrosample')).toBeVisible();
  await page.waitForTimeout(4000)
  await page.getByRole('button', { name: 'Crear' }).click();
  await page.waitForTimeout(4000)
  await page.getByLabel('Rondas *').click();
  await page.getByLabel('Rondas *').fill('1');
  await page.getByLabel('Muestra *').locator('div').nth(1).click();
  await page.getByRole('option', { name: 'QA-18-10' }).locator('span').click();
  await page.locator('#fechaInicio').press('ArrowRight');
  await page.locator('#fechaInicio').fill('31/10/2023');
  await page.locator('#fechaFin').click();
  await page.locator('#fechaFin').fill('31/10/2044')
  await page.pause()
  // await page.getByRole('button', { name: 'Aceptar' }).click();
 
});

test('Creacion Programa QCE', async ({ page }) => {
  await page.goto('http://valiqc-demo-emisor.ithealth.co/#/login');
  const Login = new LoginPage(page)
  await Login.LoginWithCredentials('ANNARVALI', 'VALIQCANNAR')

//  await page.pause()
  await page.locator('a').filter({ hasText: 'Control Calidad Externo' }).click();
  await page.locator('a').filter({ hasText: /^Configuración$/ }).nth(2).click();
  await page.getByText('Creación Programa').click();
  await page.getByRole('button', { name: 'Crear' }).click();
  await page.getByRole('dialog').getByRole('textbox').click();
  await page.getByRole('dialog').getByRole('textbox').fill('Programa Juan');
  await page.locator('#mat-slide-toggle-6 div').first().click();
  await page.pause()
  // await page.getByRole('button', { name: 'Aceptar' }).click();
});

*/