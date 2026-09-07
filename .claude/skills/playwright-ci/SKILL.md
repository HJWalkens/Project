---
name: playwright-ci
description: Configuracion de Playwright en pipelines de CI/CD.
---

## Reglas

- Usar `project: 'chromium'` por defecto en CI.
- Definir `retries` solo en CI, nunca local.
- Paralelizar con `workers` segun capacidad del runner.
- Cachear `node_modules/` y `~/.cache/ms-playwright/`.
- Instalar solo los navegadores necesarios (`--with-deps chromium`).
- Fallar el pipeline si hay `test.only` o `.skip` sin justificar.

## Comandos recomendados

```bash
# Instalar dependencias y navegador
npm ci
npx playwright install --with-deps chromium

# Ejecutar tests en CI
npx playwright test --project=chromium --reporter=line,html

# Subir reporte como artefacto
# (configurar en .github/workflows/playwright.yml)
```

## GitHub Actions example

```yaml
# filepath: .github/workflows/playwright.yml
name: Playwright Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test
        env:
          CI: true
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

## Variables de entorno

| Variable | Proposito |
|---|---|
| `CI=true` | Activa retries y reduce verbosidad |
| `BASE_URL` | URL del entorno bajo test |
| `API_TOKEN` | Token para endpoints protegidos |