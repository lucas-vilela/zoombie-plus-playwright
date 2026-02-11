import { expect } from "@playwright/test";
import { Toast } from "./Components";

export class Login {
    constructor(page) {
        this.page = page;
    }

    async do(email, password, userName) {
        await this.visit();
        await this.submit(email, password);
        await this.isLoggedIn(userName);
    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/login');
        const loginForm = this.page.locator('.login-form');

        await expect(loginForm).toBeVisible();
    }

    async submit(email, password) {
        if (email) {
            await this.page.getByPlaceholder('E-mail').fill(email);
        }
        if (password) {
            await this.page.getByPlaceholder('Senha').fill(password);
        }
        await this.page.getByRole('button', { name: 'Entrar' }).click();
    }

    async alertEmailHaveText(expectedText) {
        const alert = this.page.locator('.email-alert');

        await expect(alert).toHaveText(expectedText);
    }

    async alertPasswordHaveText(expectedText) {
        const alert = this.page.locator('.password-alert');

        await expect(alert).toHaveText(expectedText);
    }

    async isLoggedIn(userName = 'Admin') {
        const loggedUser = this.page.locator('.logged-user');

        await expect(loggedUser).toHaveText(`Olá, ${userName}`);
    }

}