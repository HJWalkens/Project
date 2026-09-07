/**
 * =================================================================
 *  Archivo : test1.spec.ts
 *  Proyecto: Test de Formulario (cursotesting.com.ar/test/test1.html)
 *  Framework: Playwright Test + TypeScript
 *  Patron:   Page Object Model (consume tests/pages/formularioPage.ts)
 *
 *  Cobertura funcional:
 *    - Test 1 (parametrico): Validar el boton "Mostrar" con varios textos.
 *    - Test 2: Validar el boton "Limpiar".
 *
 *  Notas de implementacion (QA):
 *    - Se sigue el estandar definido por el skill `playwright-qa`:
 *        * Locators accesibles (getByRole, getByPlaceholder) heredados
 *          desde el POM.
 *        * Sin XPath.
 *        * Sin waitForTimeout / sleeps (todo se sincroniza con auto-wait
 *          de Playwright sobre los `expect(...)`).
 *        * async/await en todas las acciones.
 *        * Datos parametrizados: el Test 1 itera sobre un array de
 *          textos (data-driven) para detectar regresiones de borde
 *          (espacios, longitud, caracteres especiales).
 *    - Cada test es independiente: arma su propio escenario desde cero
 *      (FIRST-I) gracias al beforeEach que recarga la pagina.
 *    - El POM encapsula selectores y acciones; los tests leen como
 *      especificacion funcional.
 * =================================================================
 */

import { test, expect } from '@playwright/test';
import { FormularioPage } from './pages/formularioPage';

// ------------------------------------------------------------------------
// Data set para el Test 1 (data-driven / parametrico).
// Variamos intencionalmente: texto simple, con espacios internos, largo,
// y con caracteres no-alfanumericos. Si el boton "Mostrar" tuviera un bug
// con strings de cierta forma (por ejemplo, no escapara correctamente al
// asignar innerHTML), alguno de estos casos lo detectaria.
// ------------------------------------------------------------------------
const TEXTOS_A_MOSTRAR: ReadonlyArray<string> = [
  'Matris Ti Poul',          // caso original del spec
  'Hola mundo',              // caso simple
  'Texto con espacios',      // espacios multiples internos
  'Una frase mas larga para validar que el boton Mostrar maneja correctamente strings de mayor longitud sin truncar ni alterar el contenido.', // caso largo
  '¿Acentos y simbolos? ¡Si! @2026', // caracteres especiales
];

test.describe('Test de Formulario - Mostrar y Limpiar', () => {
  // ------------------------------------------------------------------------
  // beforeEach: precondicion comun a todos los tests.
  // - Navega a la pagina.
  // - Valida el titulo como "smoke test" previo: si la pagina no carga
  //   o el encabezado cambio, fallamos rapido antes de seguir.
  // ------------------------------------------------------------------------
  test.beforeEach(async ({ page }) => {
    // Instanciamos el POM con la pagina de Playwright del test actual.
    // Cada test obtiene su propia instancia y, por lo tanto, sus propios
    // locators lazy.
    const formulario = new FormularioPage(page);

    // Accion + verificacion combinadas en un unico metodo del POM:
    // garantiza que el test nunca arranque con un estado previo raro.
    await formulario.navegarYValidarTitulo();
  });

  // ------------------------------------------------------------------------
  // TEST 1 (parametrico): Validar el boton "Mostrar" con varios textos.
  //
  //   - data-driven: se generan N sub-tests a partir de TEXTOS_A_MOSTRAR.
  //   - Cada sub-test es independiente (FIRST-I): el beforeEach recarga
  //     la pagina antes de cada uno.
  //   - Su unica responsabilidad es validar el flujo "Mostrar". No toca
  //     el boton "Limpiar".
  // ------------------------------------------------------------------------
  for (const texto of TEXTOS_A_MOSTRAR) {
    test(`debe mostrar el texto "${texto}" al presionar el boton Mostrar`, async ({
      page,
    }) => {
      // Arrange: instanciamos el POM y validamos el estado inicial limpio.
      const formulario = new FormularioPage(page);

      await test.step('Precondicion: input vacio y resultado sin contenido', async () => {
        // El input debe estar visible y vacio al cargar la pagina.
        await expect(formulario.input).toBeVisible();
        await formulario.verificarInputVacio();
        // El contenedor #resultado-div existe en el DOM pero esta vacio.
        await expect(formulario.resultado).toBeEmpty();
      });

      // Act: completar el input y presionar "Mostrar".
      await test.step(`Accion: escribir "${texto}" y presionar "Mostrar"`, async () => {
        await formulario.escribirEnInput(texto);
        await formulario.clickMostrar();
      });

      // Assert: el texto se refleja en el area de resultado y el input
      // mantiene su valor.
      await test.step('Verificacion: el texto se muestra y el input conserva su valor', async () => {
        await formulario.verificarResultadoMuestra(texto);
        await formulario.verificarInputContiene(texto);
      });
    });
  }

  // ------------------------------------------------------------------------
  // TEST 2: Validar el boton "Limpiar".
  //   - Reproduce su propio escenario desde cero (no comparte estado con
  //     el Test 1). Para poder limpiar, primero debe haber algo escrito:
  //     por eso usa "Mostrar" solo como precondicion, no como objetivo.
  // ------------------------------------------------------------------------
  test('debe limpiar el texto y el input al presionar el boton Limpiar', async ({
    page,
  }) => {
    // Texto propio de este test: distinto del Test 1 a proposito para
    // reforzar que cada test genera sus propios datos (independencia).
    const textoDePartida = 'Texto a limpiar';

    // Arrange: instanciamos el POM.
    const formulario = new FormularioPage(page);

    // Sub-paso "Precondicion": dejar el escenario preparado (hay texto
    // escrito y visible en el area de resultado). Esta validacion no es
    // el objetivo del test, es el "punto de partida" antes de limpiar.
    await test.step('Precondicion: escribir texto y mostrarlo', async () => {
      await formulario.escribirEnInput(textoDePartida);
      await formulario.clickMostrar();
      // Confirmamos que el escenario previo a la accion es correcto:
      // el resultado debe ser visible y contener el texto.
      await formulario.verificarResultadoMuestra(textoDePartida);
      // Tambien verificamos el input: debe contener el valor escrito.
      await formulario.verificarInputContiene(textoDePartida);
    });

    // Act: unico objetivo del test -> pulsar "Limpiar".
    await test.step('Accion: presionar el boton "Limpiar"', async () => {
      await formulario.clickLimpiar();
    });

    // Assert: tras "Limpiar" el input vuelve a estar vacio (y por lo tanto
    // vuelve a verse el placeholder) y el area de resultado queda sin
    // texto / no visible.
    await test.step('Verificacion: input vacio y resultado limpio/oculto', async () => {
      await formulario.verificarInputVacio();
      await formulario.verificarPlaceholderInput();
      await formulario.verificarResultadoLimpio();
    });
  });

});