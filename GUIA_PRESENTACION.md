# Guía para presentar FarmaVida

## Guion de 6 a 8 minutos

### Presentación

“Buenos días. Para la Tarea 05 seleccioné el Sistema de Farmacia y lo desarrollé con React.js. El proyecto se llama FarmaVida y permite administrar medicamentos, existencias y ventas.”

### ¿Qué es React?

“React es una biblioteca de JavaScript para construir interfaces mediante componentes. Un componente es una pieza de la pantalla. En este proyecto existen componentes para la aplicación, los indicadores y las ventanas de formularios.”

### Explicación del código

1. Mostrar `index.html`: “Aquí está el elemento `root`, donde React coloca la aplicación”.
2. Mostrar `src/main.jsx`: “Este archivo inicia React y renderiza el componente App”.
3. Mostrar `src/App.jsx`: señalar `useState`, `useEffect` y `useMemo`.
4. Mostrar `src/data.js`: “Aquí se encuentran los datos iniciales”.
5. Mostrar `src/styles.css`: “Aquí está el diseño visual”.

### Demostración

1. Mostrar los cuatro indicadores.
2. Buscar “Paracetamol”.
3. Registrar un medicamento de prueba.
4. Editar su precio o stock.
5. Registrar una venta y observar cómo cambian existencias e ingresos.
6. Intentar vender más unidades de las disponibles para demostrar la validación.
7. Eliminar el producto de prueba.
8. Actualizar la página para demostrar que `localStorage` conservó la información.
9. Presionar “Restaurar datos” para regresar al estado inicial.

### Aprendizaje obligatorio

“Aprendí a crear componentes y a manejar información dinámica con `useState`. Reforcé JavaScript, arreglos, objetos, formularios y eventos. Lo más interesante fue que React actualiza la pantalla inmediatamente sin recargar la página. Antes no sabía cómo React detectaba los cambios; ahora comprendo que cuando se actualiza el estado, React vuelve a renderizar las partes afectadas. También aprendí a usar `useEffect` para guardar los datos en `localStorage`.”

### Cierre

“En conclusión, FarmaVida cumple con el CRUD de medicamentos, control de stock, registro de ventas y persistencia local. El proyecto demuestra componentes, estados, efectos, propiedades, eventos y renderizado dinámico en React.”

## Fragmentos importantes para mostrar

- `useState`: estados que cambian la interfaz.
- `useEffect`: almacenamiento automático.
- `filtered` con `useMemo`: búsqueda dinámica.
- `saveMedicine`: crear y editar.
- `registerSale`: validar, calcular y descontar stock.
- `.map`: convertir los medicamentos en filas de la tabla.
