import { test } from '../support';

const { executeSQL } = require('../support/database');

let data = require('../support/fixtures/movies.json');


test('deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data.create;

    // garantir que o filme não exista
    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}';`);

    // logar como admin
    await page.loginPage.visit();
    await page.loginPage.submit('admin@zombieplus.com', 'pwd123');
    await page.moviesPage.isLoggedIn();

    await page.moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year);

    await page.toast.assertMessage('Cadastro realizado com sucesso!');
});