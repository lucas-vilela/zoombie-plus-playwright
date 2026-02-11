import { expect } from "@playwright/test";
import { type } from "node:os";

export class Movies {
    constructor(page) {
        this.page = page;
    }

    async goForm() {
        const addButton = this.page.locator('a[href="/admin/movies/register"]');
        await addButton.click();
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click();
    }

    async create(title, overview, company, release_year, cover) {
        await this.goForm();

        await this.page.getByLabel("Titulo do filme").fill(title);
        await this.page.getByLabel("Sinopse").fill(overview);

        await this.page.locator('#select_company_id .react-select__dropdown-indicator')
            .click();

        await this.page.locator('.react-select__option')
            .filter({ hasText: company })
            .click();

        await this.page.locator('#select_year .react-select__dropdown-indicator')
            .click();

        await this.page.locator('.react-select__option')
            .filter({ hasText: release_year })
            .click();

        await this.page.locator('input[name="cover"]')
            .setInputFiles(`tests/support/fixtures/${cover}`);

        await this.submit();
    }

    async assertAlertMessages(messages) {
        await expect(this.page.locator('.alert')).toHaveText(messages);
    }
}