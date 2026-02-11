const { test: base } = require('@playwright/test');

import { LoginPage } from '../pages/LoginPage';
import { Toast } from '../pages/Components';
import { MoviesPage } from '../pages/MoviesPage';
import { LandingPage } from '../pages/LandingPage';


const test = base.extend({
    page: async ({ page }, use) => {
        await use({
            ...page,
            loginPage: new LoginPage(page),
            moviesPage: new MoviesPage(page),
            landingPage: new LandingPage(page),
            toast: new Toast(page)
        });
    }
});

export { test };