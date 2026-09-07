---
name: playwright-locators
description: Estrategia y prioridad de selectores en Playwright.
---

## Prioridad de locators

Usar siempre en este orden:

1. `getByRole()` — preferred
2. `getByLabel()` — para inputs con label asociado
3. `getByPlaceholder()` — para inputs con placeholder
4. `getByText()` — para contenido textual
5. `getByAltText()` — para imagenes
6. `getByTitle()` — para elementos con title
7. `getByTestId()` — ultimo recurso accesible
8. CSS / XPath — solo si no hay alternativa

## Reglas

- Prohibido usar XPath salvo ultima instancia.
- Evitar selectores CSS dependientes de estilos (`div.container > ul > li:nth-child(3)`).
- Si el elemento no tiene `data-testid`, pedirlo al equipo de frontend.
- No encadenar `.locator().locator()` mas de 2 niveles.
- Preferir siempre locators accesibles (Role, Label) por encima de testid.

## Ejemplos

```typescript
// Correcto
page.getByRole('button', { name: 'Enviar' });
page.getByLabel('Email');
page.getByPlaceholder('Buscar...');

// Aceptable solo si no hay alternativa accesible
page.getByTestId('submit-form');

// Evitar
page.locator('div > form > button.btn-primary');
page.locator('//*[@id="root"]/div[2]/button');
```