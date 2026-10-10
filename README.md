# FarmaVida — Sistema de Farmacia con React.js

Proyecto independiente para la **Tarea 05**. Es una aplicación frontend creada con React.js para administrar medicamentos y ventas de una farmacia.

## Funcionalidades

- Registrar, consultar, buscar, editar y eliminar medicamentos (CRUD).
- Registrar ventas, calcular el total y descontar existencias.
- Alertar cuando un producto tiene diez unidades o menos.
- Mostrar productos, unidades, stock bajo e ingresos.
- Guardar automáticamente los datos en `localStorage`.
- Restaurar los datos iniciales para repetir la demostración.
- Diseño adaptable a computadora y teléfono.

## Ejecutar el proyecto

```powershell
cd "C:\Users\USUARIO\Documents\fernando\sistema-farmacia-react"
npm install
npm run dev
```

Abrir la dirección que muestre la terminal, normalmente <http://localhost:5173>.

## Estructura

- `src/App.jsx`: componentes, estado, eventos y lógica.
- `src/data.js`: medicamentos iniciales.
- `src/styles.css`: diseño visual.
- `src/main.jsx`: inicia React y coloca la aplicación en la página.
- `index.html`: documento HTML base que contiene `#root`.

## Conceptos de React utilizados

- Componentes `App`, `Stat` y `Modal`.
- `useState` para manejar datos que cambian.
- `useEffect` para sincronizar con `localStorage`.
- `useMemo` para búsquedas y estadísticas calculadas.
- Props para comunicar componentes.
- Renderizado de listas con `map` y claves.
- Eventos como `onClick`, `onChange` y `onSubmit`.
- Renderizado condicional de formularios y mensajes.
