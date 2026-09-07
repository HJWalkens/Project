# README — Proyecto de Automatización Playwright + Jean + Claude

## Descripcion

Este repositorio contiene los artefactos generados durante la automatizacion del ticket Jira **[JC-2: Mostrar un Texto](https://dbdw2711.atlassian.net/browse/JC-2)** del proyecto *Jean + Claude*.

Incluye:
- Spec de Playwright con 6 tests (5 parametricos + 1 independiente).
- Page Object Model (`tests/pages/formularioPage.ts`).
- Documento de requerimiento generado por el analista.
- Skills de Claude para estandarizar futuras automatizaciones.

## Estructura

```
.
├── README.md
├── specs/
│   └── JC-2-Mostrar-un-Texto.md
├── tests/
│   ├── test1.spec.ts
│   └── pages/
│       └── formularioPage.ts
└── .claude/
    └── skills/
        ├── playwright-qa/
        ├── playwright-page-object/
        ├── playwright-locators/
        ├── playwright-fixtures/
        ├── playwright-assertions/
        ├── playwright-ci/
        ├── playwright-reporting/
        └── playwright-api-testing/
```

## Ejecucion

```bash
npm ci
npx playwright install --with-deps chromium
npx playwright test --project=chromium
```

## Resultado

```
Running 6 tests using 6 workers
  6 passed (17.3s)
```