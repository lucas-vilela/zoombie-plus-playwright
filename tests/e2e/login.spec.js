import { test } from '../support';


test('deve logar como administrador', async ({ page }) => {
    await page.loginPage.visit();

    await page.loginPage.submit('admin@zombieplus.com', 'pwd123');

    await page.moviesPage.isLoggedIn();
});

test('não deve logar com senha incorreta', async ({ page }) => {
    await page.loginPage.visit();

    await page.loginPage.submit('admin@zombieplus.com', 'pwd1234');

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';

    await page.toast.assertMessage(message);
});

test('não deve logar qunado o email é inválido', async ({ page }) => {
    await page.loginPage.visit();

    await page.loginPage.submit('www.marcaiquadras.com.br', 'pwd123');

    await page.loginPage.alertEmailHaveText('Email incorreto');
});

test('não deve logar qunado o email não é preenchido', async ({ page }) => {
    await page.loginPage.visit();

    await page.loginPage.submit('', 'pwd123');

    await page.loginPage.alertEmailHaveText('Campo obrigatório');
});

test('não deve logar qunado o senha não é preenchido', async ({ page }) => {
    await page.loginPage.visit();

    await page.loginPage.submit('admin@zombieplus.com', '');

    await page.loginPage.alertPasswordHaveText('Campo obrigatório');
});

test('não deve logar qunado nenhum campo é preenchido', async ({ page }) => {
    await page.loginPage.visit();

    await page.loginPage.submit('', '');

    await page.loginPage.alertEmailHaveText('Campo obrigatório');

    await page.loginPage.alertPasswordHaveText('Campo obrigatório');
});