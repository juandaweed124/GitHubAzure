import { Locator, Page } from "@playwright/test";

export class LoginUser {
    private readonly usernameTextbox: Locator;
    private readonly usuario: string = 'ANNARVALI';

    constructor(private readonly page: Page) {
        this.usernameTextbox = page.getByRole('textbox', { name: 'Usuario' });
    }

    async fillUsername() {
        await this.usernameTextbox.fill(this.usuario);
    }
}