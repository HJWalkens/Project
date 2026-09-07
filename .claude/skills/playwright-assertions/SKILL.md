---
name: playwright-assertions
description: Guia de aserciones con Playwright Test.
---

## Reglas

- Usar `expect(locator).toBeVisible()` en lugar de `waitFor()`.
- Usar `expect(locator).toHaveText()` para texto exacto.
- Usar `expect(locator).toContainText()` para texto parcial.
- Usar `expect(page).toHaveURL()` para validar navegacion.
- Usar `expect.soft()` cuando un fallo no debe abortar el test.
- No usar aserciones dentro de Page Objects (solo en specs).
- Usar `toHaveCount()` para validar listas.

## Catalogo de aserciones comunes

| Asercion | Uso |
|---|---|
| `toBeVisible()` | Elemento visible en pantalla |
| `toBeHidden()` | Elemento no visible |
| `toBeEnabled()` / `toBeDisabled()` | Estado del boton/input |
| `toHaveValue()` | Valor de un input |
| `toHaveText()` | Texto exacto |
| `toContainText()` | Texto parcial |
| `toHaveURL()` | URL actual |
| `toHaveTitle()` | Titulo de la pagina |
| `toHaveCount(n)` | Cantidad de elementos |

## Ejemplo

```typescript
// filepath: tests/login.spec.ts
import { test, expect } from '@playwright/test';

test('login exitoso redirige al dashboard', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByRole('heading', { name: 'Iniciar sesion' })).toBeVisible();
  await expect(page).toHaveURL(/\/login$/);

  await page.getByLabel('Email').fill('user@test.com');
  await page.getByLabel('Contrasena').fill('123456');
  await page.getByRole('button', { name: 'Ingresar' }).click();

  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('Bienvenido')).toBeVisible();
});
```