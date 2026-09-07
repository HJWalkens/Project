# Documento de Requerimiento — JC-2: Mostrar un Texto

| Campo | Detalle |
|---|---|
| **ID Jira** | [JC-2](https://dbdw2711.atlassian.net/browse/JC-2) |
| **Proyecto** | Jean + Claude (JC) |
| **Tipo de issue** | Feature |
| **Resumen** | Mostrar un Texto |
| **Reportero** | Jean Walkens HONORE (dbdw2711@gmail.com) |
| **Asignado** | Jean Walkens HONORE (dbdw2711@gmail.com) |
| **Estado actual** | Por hacer |
| **Fecha de creación** | 2026-09-06 |
| **Fecha de vencimiento** | 2026-09-16 |
| **Entorno** | https://cursotesting.com.ar/test/test1.html |
| **Prioridad** | Sin asignar |
| **Labels** | Sin labels |
| **Componentes** | Sin componentes |
| **Story Points** | Sin estimar |

---

## 1. Descripción general

Como usuario del sitio de pruebas **cursotesting.com.ar/test/test1.html**, se requiere poder **ingresar un texto libre** en el campo de entrada (placeholder *"Escribe algo…"*) y, al presionar el botón **Mostrar**, visualizar dicho texto debajo de los botones de acción, con el formato **`Escribiste: <texto>`**. Adicionalmente, mediante el botón **Limpiar**, se debe poder borrar el contenido mostrado para iniciar un nuevo ingreso.

El objetivo es validar la correcta interacción del formulario de entrada de texto y sus dos acciones principales (mostrar y limpiar), garantizando persistencia visual del texto hasta que el usuario decida limpiarlo.

---

## 2. User Story

```
COMO  usuario del sitio de pruebas
QUIERO ingresar un texto en el campo de entrada y visualizarlo al presionar "Mostrar"
PARA  confirmar visualmente que el valor capturado es el correcto.
```

---

## 3. Precondiciones

- El usuario debe tener acceso a la URL: **https://cursotesting.com.ar/test/test1.html**.
- El navegador debe cargar completamente la página (DOM listo y scripts inicializados).
- El campo de texto debe estar visible y habilitado.
- Los botones **Mostrar** y **Limpiar** deben estar visibles, habilitados y no bloqueados por overlays.
- El campo debe mostrar el placeholder por defecto: *"Escribe algo…"* antes de la primera interacción.

---

## 4. Condiciones / Reglas de negocio

| # | Regla |
|---|---|
| **RN-01** | El botón **Mostrar** permanece **siempre visible y habilitado/activado** independientemente del estado del campo de texto (con o sin contenido). Al presionarlo, ejecuta la acción de mostrar el resultado, incluso si el campo está vacío. |
| **RN-02** | El texto mostrado debajo de los botones debe respetar el formato: **`Escribiste: <texto_ingresado>`** (en negrita la etiqueta `Escribiste:`). |
| **RN-03** | El botón **Limpiar** debe borrar el contenido visible del área de resultado y opcionalmente limpiar el campo de entrada. |
| **RN-04** | El sistema debe permitir múltiples ciclos de ingreso/mostrar/limpiar sin necesidad de recargar la página. |
| **RN-05** | Los caracteres especiales (espacios, acentos, símbolos, números) deben preservarse tal como fueron ingresados. |
| **RN-06** | El largo máximo aceptado por el campo depende del atributo `maxlength` del input (a verificar); no se debe truncar silenciosamente. |
| **RN-07** | El botón **Mostrar** permanece **siempre visible y habilitado**, incluso si el campo de texto está vacío. Al presionarlo en ese estado, el sistema **igualmente** muestra debajo de los botones el texto `**Escribiste:**` (sin contenido a la derecha). |
| **RN-08** | Tras presionar **Limpiar**, el foco debería regresar al campo de entrada para favorecer la accesibilidad. |

---

## 5. Criterios de aceptación (Gherkin)

```gherkin
Escenario: Mostrar texto válido en el formulario
  Dado que el usuario está en la página "https://cursotesting.com.ar/test/test1.html"
  Y el campo de texto está vacío
  Cuando el usuario escribe "Hola Mundo" en el campo
  Y presiona el botón "Mostrar"
  Entonces debajo de los botones se debe visualizar "Escribiste: Hola Mundo"
  Y la etiqueta "Escribiste:" debe aparecer en negrita

Escenario: Mostrar texto con caracteres especiales
  Dado que el usuario está en la página
  Cuando el usuario escribe "¡Hola, ¿cómo estás? 123!" en el campo
  Y presiona el botón "Mostrar"
  Entonces el sistema debe mostrar "Escribiste: ¡Hola, ¿cómo estás? 123!"

Escenario: Botón Limpiar borra el resultado mostrado
  Dado que el usuario ya visualizó un texto mediante el botón "Mostrar"
  Cuando el usuario presiona el botón "Limpiar"
  Entonces el texto mostrado debajo de los botones debe desaparecer
  Y el campo de entrada debe quedar vacío (o mantener su valor según implementación)

Escenario: Validar ciclo repetido de Mostrar y Limpiar
  Dado que el usuario ya limpió el formulario
  Cuando el usuario ingresa un nuevo texto "NuevoTexto"
  Y presiona el botón "Mostrar"
  Entonces debe visualizarse "Escribiste: NuevoTexto"

Escenario: Mostrar con campo vacío (botón siempre visible)
  Dado que el usuario está en la página
  Y el campo de texto está vacío
  Cuando el usuario presiona directamente el botón "Mostrar"
  Entonces el botón "Mostrar" sigue visible y habilitado
  Y debajo de los botones se muestra el texto "**Escribiste:**" (sin contenido a la derecha)
```

---

## 6. Fuera de alcance (Out of Scope)

- Persistencia del texto entre recargas de página.
- Validaciones complejas del lado servidor (sanitización XSS, SQL Injection, etc.).
- Internacionalización (i18n) del mensaje `Escribiste:`.
- Soporte para ingreso de texto enriquecido (HTML, Markdown, imágenes).
- Accesibilidad avanzada (lectores de pantalla, navegación por teclado más allá del flujo básico).

---

## 7. Supuestos

- El sitio **cursotesting.com.ar/test/test1.html** es un entorno de testing público y estable.
- La aplicación es 100% client-side (HTML + JS), sin interacción con backend.
- El navegador mínimo soportado es Chrome (última versión) — alineado con el stack de pruebas automatizadas con Playwright.

---

## 8. Riesgos identificados

| # | Riesgo | Mitigación |
|---|---|---|
| **R1** | El selector del campo de texto cambia entre versiones | Usar `placeholder` o `label` en lugar de `id`/`class` específicos |
| **R2** | La estructura del DOM del área de resultado puede variar | Esperar por el texto `Escribiste:` en lugar de un selector fijo |
| **R3** | El botón **Limpiar** podría no vaciar el campo de entrada | Definir y documentar el comportamiento esperado (ver RN-03) |

---

## 9. Trazabilidad

| Artefacto | Enlace |
|---|---|
| Issue Jira | [JC-2](https://dbdw2711.atlassian.net/browse/JC-2) |
| Proyecto | [Jean + Claude](https://dbdw2711.atlassian.net/browse/JC) |
| Tablero | Jean + Claude (next-gen) |

---

## 10. Definición de Hecho (DoD)

- [ ] El comportamiento de **Mostrar** funciona con texto válido.
- [ ] El comportamiento de **Limpiar** funciona según RN-03.
- [ ] Se valida el ciclo repetido de Mostrar/Limpiar.
- [ ] Se ejecutan pruebas automatizadas con Playwright (cobertura mínima de los 5 escenarios Gherkin).
- [ ] No hay errores en la consola del navegador durante la ejecución.
- [ ] La historia se mueve a **Listo** en el tablero Jean + Claude.

---

> 📝 **Nota del analista:** Este documento fue generado a partir del ticket [JC-2](https://dbdw2711.atlassian.net/browse/JC-2) del proyecto *Jean + Claude*. Se recomienda revisar las reglas **RN-01**, **RN-03** y **RN-08** con el equipo de desarrollo para alinearlas con el comportamiento actual de la página `test1.html`.