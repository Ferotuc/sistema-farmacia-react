# Tarea 05 — Sistema de Farmacia con React.js

**Proyecto seleccionado:** Sistema de Farmacia  
**Tecnología seleccionada:** React.js

## Introducción

FarmaVida es una aplicación web desarrollada con React.js para administrar el inventario y las ventas de una farmacia. React permite dividir la interfaz en componentes reutilizables y actualizar únicamente las partes de la pantalla cuyos datos cambian.

## Objetivos

El objetivo general fue desarrollar una interfaz funcional con React.js. Los objetivos específicos fueron implementar un CRUD de medicamentos, registrar ventas, actualizar existencias, validar datos, calcular indicadores y conservar la información en el navegador.

## Funcionalidad

Cada medicamento posee nombre, laboratorio, categoría, precio, stock y fecha de vencimiento. El usuario puede registrar, consultar, buscar, editar y eliminar productos. Al registrar una venta, la aplicación comprueba las existencias, calcula el total y descuenta las unidades. El panel muestra productos registrados, unidades disponibles, stock bajo e ingresos acumulados.

La información se guarda mediante `localStorage`, por lo que permanece después de actualizar o cerrar la página. El botón “Restaurar datos” permite regresar al estado inicial para repetir una demostración.

## Conceptos de React aplicados

- **Componentes:** separan la interfaz en piezas reutilizables.
- **useState:** guarda medicamentos, ventas, búsqueda, formularios y ventanas abiertas.
- **useEffect:** sincroniza los datos con `localStorage`.
- **useMemo:** calcula filtros e indicadores cuando cambian sus dependencias.
- **Props:** pasan información a los componentes de indicadores y ventanas.
- **Eventos:** responden a clics, escritura y envío de formularios.
- **Renderizado condicional:** muestra formularios y mensajes solo cuando se necesitan.

## Aprendizaje y reflexión

Aprendí cómo React construye una interfaz mediante componentes y cómo `useState` provoca que la pantalla se actualice cuando cambia la información. Reforcé JavaScript, arreglos, objetos, funciones, eventos, formularios y operaciones CRUD.

Lo más interesante fue observar que no es necesario recargar toda la página: cuando registro una venta, React modifica el estado y actualiza inmediatamente las existencias, los ingresos y la tabla.

Antes no tenía claro cómo React sabía qué parte debía cambiar. Ahora comprendo que la interfaz depende del estado; al utilizar una función como `setMedicines`, React vuelve a renderizar los componentes afectados. También comprendí que `useEffect` puede reaccionar a un cambio y guardar los datos en `localStorage`.

## Conclusión

Se desarrolló un Sistema de Farmacia funcional con React.js que cumple las operaciones CRUD, controla existencias, registra ventas y conserva información. El proyecto permitió comprender de manera práctica los componentes, estados, efectos, eventos y renderizado dinámico.
