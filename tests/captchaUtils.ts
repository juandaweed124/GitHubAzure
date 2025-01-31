// captchaUtils.ts
import axios from 'axios';

const API_KEY = 'CAP-3E86B955744EF8B67891C64BF05A9FB5F9A881B9093BF50E44A295FE7B484C5E';  // Sustituye con tu API Key de CapSolver

// Función para resolver el CAPTCHA
export async function resolveCaptcha(page: any): Promise<string> {
  try {
    // Iniciar el proceso de resolución del CAPTCHA con CapSolver
    const response = await axios.post('https://api.capsolver.com/api/v1/captcha', {
      key: API_KEY, 
      method: 'recaptcha', // Si es un reCAPTCHA, usa 'recaptcha'. Para otros, revisa la documentación.
      site_url: page.url(), // URL de la página donde está el CAPTCHA
      site_key: await page.locator('div[data-sitekey]').getAttribute('data-sitekey')  // Obtén la clave del sitio desde la página
    });

    if (response.data.status === 'success') {
      const solution = response.data.solution;
      return solution;  // Regresa el token resuelto por CapSolver
    } else {
      throw new Error('No se pudo resolver el CAPTCHA');
    }
  } catch (error) {
    console.error('Error al resolver el CAPTCHA:', error);
    throw error;
  }
}

// Función para interactuar con el CAPTCHA resuelto
export async function solveCaptcha(page: any) {
  const captchaSolution = await resolveCaptcha(page);
  
  // Enviar la solución del CAPTCHA al sitio web
  await page.locator('textarea[name="g-recaptcha-response"]').fill(captchaSolution);
  await page.locator('button[type="submit"]').click();  // O el botón correspondiente para enviar el formulario
}
