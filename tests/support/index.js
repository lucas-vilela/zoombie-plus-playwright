const { test: base } = require('@playwright/test');

import { LoginPage } from '../pages/LoginPage';
import { Toast } from '../pages/Components';
import { MoviesPage } from '../pages/MoviesPage';
import { LandingPage } from '../pages/LandingPage';


const test = base.extend({
    page: async ({ page }, use) => {

        let context = page;

        context['landingPage'] = new LandingPage(page);
        context['loginPage'] = new LoginPage(page);
        context['toast'] = new Toast(page);
        context['moviesPage'] = new MoviesPage(page);

        await use(context);
    }
});

export { test };