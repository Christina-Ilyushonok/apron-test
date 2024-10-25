import { test } from '@playwright/test'

const HOME_PAGE_URL = 'http://localhost:3000/'

test('Form fields are required', async ({ page }) => {
  await page.goto('HOME_PAGE_URL')
  await page.getByRole('button', { name: 'Add user' }).click()
  await page.getByRole('button', { name: 'Save' }).click()
  await page.getByText('Gender is required')
  await page.getByText('First name is required')
})
