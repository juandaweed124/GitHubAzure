import { Locator, Page, expect } from "@playwright/test"

export class LoginUser{

    private readonly usernameTextbox: Locator
    private readonly usuario: string = 'ANNARVALI';
 

    constructor(page: Page){
        this.usernameTextbox = page.getByRole('textbox', {name:'Usuario'});
        this.usernameTextbox.fill(this.usuario);
 
       
    }

}