import { test, expect } from '@playwright/test';
import { HOME_PAGE_URL, BASE_URL } from './variables'

test.describe('Fetch users', () => {
  const mockResponse = [
    { id: '1', firstName: 'John', lastName: 'Doe', age: 30, gender: 'MALE' },
    { id: '2', firstName: 'Jane', lastName: 'Smith', age: 25, gender: 'FEMALE' }
  ];

  const mockUpdatedUser =
    { id: '1', firstName: 'John', lastName: 'Doe', age: 31, gender: 'MALE' }

  const mockNewUser =
    { id: '3', firstName: 'Emily', lastName: 'Johnson', age: 42, gender: 'FEMALE' }

  test.beforeEach(async ({ page }) => {
    await page.route(`http://localhost:3030/users`, async route => {
      await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockResponse)
      });
    });
    await page.goto(HOME_PAGE_URL)
  });

  test('Display users', async ({ page }) => {
    const firstUserRow = page.getByRole('row',
      { name: `${mockResponse[0].gender} ${mockResponse[0].firstName} ${mockResponse[0].lastName} ${mockResponse[0].age} Edit` }
    )
    const secondUserRow = page.getByRole('row',
      { name: `${mockResponse[1].gender} ${mockResponse[1].firstName} ${mockResponse[1].lastName} ${mockResponse[1].age} Edit` }
    );

    await expect(firstUserRow).toBeTruthy();
    await expect(secondUserRow).toBeTruthy();

    const firstUserCells = await firstUserRow.getByRole('cell');
    const secondUserCells = await secondUserRow.getByRole('cell');

    expect(await firstUserCells.nth(0).innerText()).toBe(mockResponse[0].gender);
    expect(await firstUserCells.nth(1).innerText()).toBe(mockResponse[0].firstName);
    expect(await firstUserCells.nth(2).innerText()).toBe(mockResponse[0].lastName);
    expect(await firstUserCells.nth(3).innerText()).toBe(String(mockResponse[0].age));

    expect(await secondUserCells.nth(0).innerText()).toBe(mockResponse[1].gender);
    expect(await secondUserCells.nth(1).innerText()).toBe(mockResponse[1].firstName);
    expect(await secondUserCells.nth(2).innerText()).toBe(mockResponse[1].lastName);
    expect(await secondUserCells.nth(3).innerText()).toBe(String(mockResponse[1].age));
  });

  test('Update user', async ({ page }) => {

    await page.route(`${BASE_URL}/users/${mockResponse[1].id}`, (route, request) => {
      if (request.method() === 'PUT') {
        route.fulfill({
          status: 200,
          body: JSON.stringify(mockNewUser),
          contentType: 'application/json'
        });
      } else {
        route.continue();
      }
    });

    await page.getByRole('row', { name: 'MALE John Doe 30' }).getByRole('button').click();
    await page.locator('div[name="gender"]').click();
    await page.locator('div[title="FEMALE"]').click();
    await page.locator('input[name="firstName"]').click();
    await page.locator('input[name="firstName"]').fill(mockResponse[1].firstName);
    await page.locator('input[name="lastName"]').click();
    await page.locator('input[name="lastName"]').fill(mockResponse[1].lastName)
    await page.locator('input[name="age"]').click();
    await page.locator('input[name="age"]').fill((String(mockResponse[1].age)));
    await page.getByRole('button', { name: 'Save' }).click();

    await page.waitForTimeout(1000)

    await page.getByText('User updated')
  });

  test('Add user', async ({ page }) => {
    await page.route(`${BASE_URL}/users/`, (route, request) => {
      if (request.method() === 'POST') {
        route.fulfill({
          status: 200,
          body: JSON.stringify(mockUpdatedUser),
          contentType: 'application/json'
        });
      } else {
        route.continue();
      }
    });

    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Add user' }).click();
    await page.locator('div[name="gender"]').click();
    await page.locator(`div[title=${mockNewUser.gender}]`).click();
    await page.locator('input[name="firstName"]').click();
    await page.locator('input[name="firstName"]').fill(mockNewUser.firstName);
    await page.locator('input[name="lastName"]').click();
    await page.locator('input[name="lastName"]').fill(mockNewUser.lastName);
    await page.locator('input[name="age"]').click();
    await page.locator('input[name="age"]').fill(String(mockNewUser.age));
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(1000)
    await page.getByText('User added')
  });

  test('Delete user test', async ({ page }) => {
    await page.route('http://localhost:3030/users/2', (route, request) => {
      if (request.method() === 'DELETE') {
        route.fulfill({
          status: 200,
          body: JSON.stringify({ id: mockResponse[1].id }),
          contentType: 'application/json'
        });
      } else {
        route.continue()
      }
    });

    await page.goto('http://localhost:3000/');
    await page.getByRole('row', { name: `${mockResponse[1].gender} ${mockResponse[1].firstName} ${mockResponse[1].lastName} ${mockResponse[1].age} Edit`}).getByLabel('delete').click()
    await page.getByRole('button', { name: 'DELETE' }).click();
    await page.waitForTimeout(1000)
    await page.getByText('User deleted')
  });
});
