---
name: playwright-page-object
description: Estandar para crear Page Object Model con Playwright y TypeScript.
---

## Reglas

- Cada pagina debe tener su clase en `tests/pages/`.
- El nombre del archivo debe coincidir con el nombre de la pagina (ej: `loginPage.ts`).
- Usar constructores que reciban `Page` como parametro.
- Definir locators como privados y metodos publicos.
- Los metodos deben devolver elementos o ejecutar acciones, nunca aserciones.
- Una clase por pagina, no agrupar varias paginas en un mismo archivo.
- Exportar la clase con `export class`.
- Importar tipos `Page`, `Locator` desde `@playwright/test`.

## Estructura recomendada

```typescript
// filepath: tests/pages/loginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.getByLabel('Usuario');
    this.passwordInput = page.getByLabel('Contrasena');
    this.submitButton = page.getByRole('button', { name: 'Ingresar' });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```