import { test } from '../support';


test('deve logar como administrador', async ({ page }) => {
    await page.login.visit();

    await page.login.submit('admin@zombieplus.com', 'pwd123');

    await page.login.isLoggedIn('Admin');
});

test('não deve logar com senha incorreta', async ({ page }) => {
    await page.login.visit();

    await page.login.submit('admin@zombieplus.com', 'pwd1234');

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';

    await page.toast.assertMessage(message);
});

test('não deve logar qunado o email é inválido', async ({ page }) => {
    await page.login.visit();

    await page.login.submit('www.marcaiquadras.com.br', 'pwd123');

    await page.login.alertEmailHaveText('Email incorreto');
});

test('não deve logar qunado o email não é preenchido', async ({ page }) => {
    await page.login.visit();

    await page.login.submit('', 'pwd123');

    await page.login.alertEmailHaveText('Campo obrigatório');
});

test('não deve logar qunado o senha não é preenchido', async ({ page }) => {
    await page.login.visit();

    await page.login.submit('admin@zombieplus.com', '');

    await page.login.alertPasswordHaveText('Campo obrigatório');
});

test('não deve logar qunado nenhum campo é preenchido', async ({ page }) => {
    await page.login.visit();

    await page.login.submit('', '');

    await page.login.alertEmailHaveText('Campo obrigatório');

    await page.login.alertPasswordHaveText('Campo obrigatório');
});