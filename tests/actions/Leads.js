import { expect } from '@playwright/test';
export class Leads {

    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('http://localhost:3000');
    }

    async openLeadModal() {
        await this.page.getByText(/Aperte o play/).click();
        await expect(this.page.getByTestId('modal').getByRole('heading'))
            .toHaveText('Fila de espera');
    }

    async submitLeadForm(name, email) {
        if (name) {
            await this.page.getByPlaceholder('Informe seu nome').fill(name);
        }
        if (email) {
            await this.page.getByPlaceholder('Informe seu email').fill(email);
        }
        await this.page.getByTestId('modal')
            .getByRole('button', { name: 'Quero entrar na fila!' }).click();
    }


    async assertAlertMessages(messages) {
        await expect(this.page.locator('.alert')).toHaveText(messages);
    }
}