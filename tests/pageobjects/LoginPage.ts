import { Locator, Page, expect } from "@playwright/test"

export class LoginPage{

    private readonly passwordTextbox: Locator
    private readonly clickSedeButton: Locator
    private readonly loginButton: Locator
    private readonly clickNombreSede: Locator
    private readonly contraseña: string = 'VALIQCANNAR';

    constructor(page: Page){
        this.loginButton = page.getByRole('button', {name:'Acceder'});
        this.clickSedeButton = page.locator('ngx-select div');
        this.clickNombreSede =  page.getByRole('link', { name: 'sede 45' });
        this.passwordTextbox = page.getByRole('textbox', {name:'Contraseña'});
        this.passwordTextbox.fill(this.contraseña);
       
    }

    async fillPassword(Password:string){
       await this.passwordTextbox.fill(Password)
    }

    async clickOnSedeButton(){
        await this.clickSedeButton.nth(3).click()
        
     }

    async clickOnSedeNombre(){
        await this.clickNombreSede.click()

    }
    
    async clickOnLogin(){
       await this.loginButton.click()
       
    }
    


}