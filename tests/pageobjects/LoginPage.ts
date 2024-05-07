import { Locator, Page, expect } from "@playwright/test"

export class LoginPage{

    private readonly usernameTextbox: Locator
    private readonly passwordTextbox: Locator
    private readonly clickSedeButton: Locator
    private readonly loginButton: Locator
    private readonly clickNombreSede: Locator

    constructor(page: Page){
        this.usernameTextbox = page.getByRole('textbox', {name:'Usuario'})
        this.passwordTextbox = page.getByRole('textbox', {name:'Contraseña'})
        this.loginButton = page.getByRole('button', {name:'Acceder'})
        this.clickSedeButton = page.locator('ngx-select div')
        this.clickNombreSede =  page.getByRole('link', { name: 'sede 45' })
        
    }

    async fillUsername(Username:string){
       await this.usernameTextbox.fill(Username)
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
    
    async LoginWithCredentials(Username:string, Password:string){
        await this.fillUsername(Username)
        await this.fillPassword(Password)
        await this.clickOnSedeButton()
        await this.clickOnSedeNombre()
        await this.clickOnLogin()
    }

}