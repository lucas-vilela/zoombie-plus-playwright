import { test } from '../support';

const { executeSQL } = require('../support/database');

let data = require('../support/fixtures/movies.json');


test('deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data.create;

    // garantir que o filme não exista
    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}';`);

    // logar como admin
    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', 'pwd123');
    await page.login.isLoggedIn();

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year);

    await page.toast.assertMessage('Cadastro realizado com sucesso!');
});

test('não deve cadastrar quando os campos obrigatórios não forem preenchidos', async ({ page }) => {

    // logar como admin
    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', 'pwd123');
    await page.login.isLoggedIn();

    await page.movies.goForm();
    await page.movies.submit();

    await page.movies.assertAlertMessages(
        [
            'Por favor, informe o título.',
            'Por favor, informe a sinopse.',
            'Por favor, informe a empresa distribuidora.',
            'Por favor, informe o ano de lançamento.'
        ]);
});