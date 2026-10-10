import { useEffect, useMemo, useState } from 'react';
import { emptyMedicine, initialMedicines } from './data.js';

const readStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const money = (value) => new Intl.NumberFormat('es-GT', {
  style: 'currency', currency: 'GTQ'
}).format(value);

const formatDate = (value) => new Intl.DateTimeFormat('es-GT', {
  dateStyle: 'medium', timeZone: 'UTC'
}).format(new Date(value));

export default function App() {
  const [medicines, setMedicines] = useState(() => readStorage('farmavida-medicamentos', initialMedicines));
  const [sales, setSales] = useState(() => readStorage('farmavida-ventas', []));
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(emptyMedicine);
  const [editingId, setEditingId] = useState(null);
  const [modal, setModal] = useState(null);
  const [saleQuantity, setSaleQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => localStorage.setItem('farmavida-medicamentos', JSON.stringify(medicines)), [medicines]);
  useEffect(() => localStorage.setItem('farmavida-ventas', JSON.stringify(sales)), [sales]);

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    return medicines.filter((item) => [item.nombre, item.laboratorio, item.categoria]
      .some((field) => field.toLowerCase().includes(term)));
  }, [medicines, search]);

  const summary = useMemo(() => ({
    productos: medicines.length,
    unidades: medicines.reduce((total, item) => total + item.stock, 0),
    stockBajo: medicines.filter((item) => item.stock <= 10).length,
    ingresos: sales.reduce((total, sale) => total + sale.total, 0)
  }), [medicines, sales]);

  const notify = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(''), 2800);
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyMedicine);
    setModal('medicine');
  };

  const openEdit = (medicine) => {
    setEditingId(medicine.id);
    setForm({ ...medicine });
    setModal('medicine');
  };

  const saveMedicine = (event) => {
    event.preventDefault();
    const normalized = { ...form, precio: Number(form.precio), stock: Number(form.stock) };
    if (!normalized.nombre.trim() || !normalized.laboratorio.trim() || !normalized.categoria.trim()) {
      return notify('Completa todos los campos obligatorios.');
    }
    if (normalized.precio <= 0 || normalized.stock < 0 || !Number.isInteger(normalized.stock)) {
      return notify('Revisa el precio y las existencias.');
    }
    if (editingId) {
      setMedicines((items) => items.map((item) => item.id === editingId ? { ...normalized, id: editingId } : item));
      notify('Medicamento actualizado correctamente.');
    } else {
      const id = medicines.reduce((max, item) => Math.max(max, item.id), 0) + 1;
      setMedicines((items) => [...items, { ...normalized, id }]);
      notify('Medicamento registrado correctamente.');
    }
    setModal(null);
  };

  const deleteMedicine = (id) => {
    if (!window.confirm('¿Deseas eliminar este medicamento?')) return;
    setMedicines((items) => items.filter((item) => item.id !== id));
    notify('Medicamento eliminado.');
  };

  const openSale = (medicine) => {
    setForm(medicine);
    setSaleQuantity(1);
    setModal('sale');
  };

  const registerSale = (event) => {
    event.preventDefault();
    const quantity = Number(saleQuantity);
    if (!Number.isInteger(quantity) || quantity <= 0) return notify('La cantidad debe ser mayor que cero.');
    if (quantity > form.stock) return notify(`Stock insuficiente. Solo hay ${form.stock} unidades.`);
    const sale = {
      id: Date.now(), medicamento: form.nombre, cantidad: quantity,
      total: Number((form.precio * quantity).toFixed(2)), fecha: new Date().toISOString()
    };
    setMedicines((items) => items.map((item) => item.id === form.id ? { ...item, stock: item.stock - quantity } : item));
    setSales((items) => [...items, sale]);
    setModal(null);
    notify(`Venta registrada. Total: ${money(sale.total)}`);
  };

  const resetDemo = () => {
    if (!window.confirm('¿Deseas restaurar los datos iniciales?')) return;
    setMedicines(initialMedicines);
    setSales([]);
    notify('Datos de demostración restaurados.');
  };

  return (
    <>
      <header className="topbar">
        <div className="brand"><span className="logo">✚</span><div><strong>FarmaVida</strong><small>Gestión farmacéutica</small></div></div>
        <button className="ghost" onClick={resetDemo}>Restaurar datos</button>
      </header>

      <main>
        <section className="hero">
          <div><span className="eyebrow">PANEL DE CONTROL</span><h1>Inventario de farmacia</h1><p>Controla medicamentos, existencias y ventas de manera sencilla.</p></div>
          <button className="primary" onClick={openCreate}>+ Nuevo medicamento</button>
        </section>

        <section className="stats">
          <Stat label="Productos" value={summary.productos} note="medicamentos registrados" />
          <Stat label="Unidades" value={summary.unidades} note="disponibles en inventario" />
          <Stat label="Stock bajo" value={summary.stockBajo} note="requieren atención" warning />
          <Stat label="Ingresos" value={money(summary.ingresos)} note={`${sales.length} ventas registradas`} />
        </section>

        <section className="panel">
          <div className="panelHeader"><div><h2>Medicamentos</h2><p>Catálogo general de productos</p></div><input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar nombre, laboratorio..." /></div>
          <div className="tableWrap"><table><thead><tr><th>Medicamento</th><th>Categoría</th><th>Precio</th><th>Existencias</th><th>Vencimiento</th><th>Acciones</th></tr></thead>
            <tbody>{filtered.map((item) => <tr key={item.id}>
              <td><b>{item.nombre}</b><small>{item.laboratorio}</small></td><td>{item.categoria}</td><td>{money(item.precio)}</td>
              <td><span className={`badge ${item.stock <= 10 ? 'low' : ''}`}>{item.stock} unidades</span></td><td>{formatDate(item.vencimiento)}</td>
              <td className="actions"><button onClick={() => openSale(item)}>Vender</button><button onClick={() => openEdit(item)}>Editar</button><button className="danger" onClick={() => deleteMedicine(item.id)}>Eliminar</button></td>
            </tr>)}</tbody></table></div>
          {!filtered.length && <p className="empty">No se encontraron medicamentos.</p>}
        </section>
      </main>

      {modal === 'medicine' && <Modal title={editingId ? 'Editar medicamento' : 'Nuevo medicamento'} close={() => setModal(null)}>
        <form onSubmit={saveMedicine}>
          <label>Nombre<input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Ej. Aspirina 500 mg" /></label>
          <div className="grid"><label>Laboratorio<input required value={form.laboratorio} onChange={(e) => setForm({ ...form, laboratorio: e.target.value })} /></label><label>Categoría<input required value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} /></label></div>
          <div className="grid"><label>Precio (Q)<input required type="number" min="0.01" step="0.01" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} /></label><label>Existencias<input required type="number" min="0" step="1" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></label></div>
          <label>Fecha de vencimiento<input required type="date" value={form.vencimiento} onChange={(e) => setForm({ ...form, vencimiento: e.target.value })} /></label>
          <div className="modalActions"><button type="button" className="secondary" onClick={() => setModal(null)}>Cancelar</button><button className="primary">Guardar</button></div>
        </form>
      </Modal>}

      {modal === 'sale' && <Modal title="Registrar venta" close={() => setModal(null)}><form onSubmit={registerSale}><p className="saleProduct"><b>{form.nombre}</b><br />{form.stock} unidades disponibles · {money(form.precio)} cada una</p><label>Cantidad<input type="number" min="1" step="1" value={saleQuantity} onChange={(e) => setSaleQuantity(e.target.value)} /></label><div className="saleTotal">Total estimado: <b>{money(form.precio * Number(saleQuantity || 0))}</b></div><div className="modalActions"><button type="button" className="secondary" onClick={() => setModal(null)}>Cancelar</button><button className="primary">Confirmar venta</button></div></form></Modal>}

      <div className={`toast ${message ? 'show' : ''}`}>{message}</div>
    </>
  );
}

function Stat({ label, value, note, warning }) {
  return <article className={warning ? 'warning' : ''}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>;
}

function Modal({ title, close, children }) {
  return <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}><section className="modal"><header><div><h2>{title}</h2><p>Completa la información solicitada.</p></div><button onClick={close} aria-label="Cerrar">×</button></header>{children}</section></div>;
}
