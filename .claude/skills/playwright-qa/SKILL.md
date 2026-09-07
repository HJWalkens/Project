---
name: playwright-qa
description: Estandar para crear tests automatizados con Playwright y TypeScript.
---

## Reglas

- Usar Playwright con TypeScript.
- Importar test y expect desde @playwright/test.
- Usar async/await.
- Preferir getByRole(), getByLabel() y otros locators accesibles.
- No utilizar XPath salvo que sea estrictamente necesario.
- No utilizar page.waitForTimeout().
- No utilizar sleeps.
- Cada test debe tener un objetivo claro.
- Utilizar expect() para las validaciones.
- Los nombres de los tests deben describir el comportamiento esperado.
- Mantener los tests independientes.
- Evitar datos hardcodeados cuando puedan parametrizarse.
- Utilizar Page Object Model cuando el proyecto lo requiera.