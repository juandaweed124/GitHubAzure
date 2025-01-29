import { Locator, Page, expect } from "@playwright/test"

export class LoginPage{

    private readonly passwordTextbox: Locator
    private readonly clickSedeButton: Locator
    private readonly loginButton: Locator
    private readonly clickNombreSede: Locator
    private readonly contraseña: string = 'VALIQCANNAR';
    private readonly Captcha: Locator

    constructor(page: Page){
        this.loginButton = page.getByRole('button', {name:'Acceder'});
        this.clickSedeButton = page.locator('#mat-select-value-1');
        this.clickNombreSede =  page.getByRole('option', { name: 'sede 45' });
        this.passwordTextbox = page.getByRole('textbox', {name:'Contraseña'});
        this.passwordTextbox.fill(this.contraseña);
        this.Captcha = page.getByLabel('No soy un robot');
       
    }

    async fillPassword(Password:string){
       await this.passwordTextbox.fill(Password)
    }

    async clickOnSedeButton(){
        await this.clickSedeButton.click()
        
     }

    async clickOnSedeNombre(){
        await this.clickNombreSede.click()

    }
    
    async clickOnLogin(){
       await this.loginButton.click()
       
    }
    
    async clickOnCaptcha(page: Page) {
        // Esperar y seleccionar el iframe del reCAPTCHA
        const iframes = await page.frames();
        const captchaIframe = iframes.find(frame => frame.url().includes('recaptcha/api2/anchor'));
        
        if (!captchaIframe) {
            throw new Error('No se encontró el iframe del reCAPTCHA.');
        }
        
        // Esperar a que el checkbox del CAPTCHA esté visible dentro del iframe
        const captchaCheckbox = captchaIframe.locator('#recaptcha-anchor');
        await captchaCheckbox.waitFor();
        
        // Mover el ratón hacia el CAPTCHA y hacer clic
        await captchaCheckbox.hover();
        await captchaCheckbox.click();
    }
}