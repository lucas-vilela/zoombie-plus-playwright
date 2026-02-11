// @ts-nocheck
import { expect } from '@playwright/test';
import { test } from '../support';

import { faker } from '@faker-js/faker';


test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  let randomName = faker.person.fullName();
  let randomEmail = faker.internet.email();

  // visit
  await page.landingPage.visit();

  // openLeadModal
  await page.landingPage.openLeadModal();

  // submitLeadForm
  await page.landingPage.submitLeadForm(randomName, randomEmail);

  // assertToastMessage
  await page.toast.assertMessage('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!');

});

test('não deve cadastrar quando o email já existe', async ({ page, request }) => {

  let randomName = faker.person.fullName();
  let randomEmail = faker.internet.email();

  // populating the lead with the same email to test the duplicate email scenario
  const newLead =  await request.post('http://localhost:3333/leads', {
    data: {
      name: randomName,
      email: randomEmail
    }
  });

  expect(newLead.ok()).toBeTruthy();

  // visit
  await page.landingPage.visit();

  // openLeadModal
  await page.landingPage.openLeadModal();

  // submitLeadForm
  await page.landingPage.submitLeadForm(randomName, randomEmail);

  // assertToastMessage
  await page.toast.assertMessage('O endereço de e-mail fornecido já está registrado em nossa fila de espera.');

});

test('não deve cadastrar um lead na fila de espera', async ({ page }) => {

  // visit
  await page.landingPage.visit();

  // openLeadModal
  await page.landingPage.openLeadModal();

  // submitLeadForm
  await page.landingPage.submitLeadForm('João da Silva', 'test.com');

  // assertAlertMessages
  await page.landingPage.assertAlertMessages(['Email incorreto']);

});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {

  // visit
  await page.landingPage.visit();

  // openLeadModal
  await page.landingPage.openLeadModal();

  // submitLeadForm
  await page.landingPage.submitLeadForm('test@test.com');

  // assertAlertMessages
  await page.landingPage.assertAlertMessages(['Campo obrigatório']);

});

test('não deve cadastrar quando email não é preenchido', async ({ page }) => {

  // visit
  await page.landingPage.visit();

  // openLeadModal
  await page.landingPage.openLeadModal();

  // submitLeadForm
  await page.landingPage.submitLeadForm('João da Silva');

  // assertAlertMessages
  await page.landingPage.assertAlertMessages(['Campo obrigatório']);
});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {

  // visit
  await page.landingPage.visit();

  // openLeadModal
  await page.landingPage.openLeadModal();

  // submitLeadForm
  await page.landingPage.submitLeadForm();

  // assertAlertMessages
  await page.landingPage.assertAlertMessages(['Campo obrigatório', 'Campo obrigatório']);

});