const { test: base } = require('@playwright/test');

import { Login } from '../actions/Login';
import { Toast } from '../actions/Components';
import { Movies } from '../actions/Movies';
import { Leads } from '../actions/Leads';


const test = base.extend({
    page: async ({ page }, use) => {

        let context = page;

        context['leads'] = new Leads(page);
        context['login'] = new Login(page);
        context['toast'] = new Toast(page);
        context['movies'] = new Movies(page);

        await use(context);
    }
});

export { test };