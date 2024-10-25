import { test } from '@playwright/test'
import { HOME_PAGE_URL } from './variables'

test('Open users page', async ({ page }) => {
  await page.goto('/users')
})

test('Has Add user button', async ({ page }) => {
  await page.goto('/users')
  await page.getByRole('button', { name: 'Add user' }).click()
})

test('Sort table by gender ', async ({ page }) => {
  await page.goto('HOME_PAGE_URL')
  await page.getByLabel('Gender').getByLabel('caret-up').locator('path').click()
})

test('Sort table by first name', async ({ page }) => {
  await page.goto('HOME_PAGE_URL')
  await page.getByLabel('First name').getByLabel('caret-up').locator('path').click()
})

test('Sort table by last name', async ({ page }) => {
  await page.goto('HOME_PAGE_URL')
  await page.getByLabel('Last name').getByLabel('caret-up').locator('path').click()
})

test('Sort table by age', async ({ page }) => {
  await page.goto('HOME_PAGE_URL')
  await page.getByLabel('age').getByLabel('caret-up').locator('path').click()
})

