const { useState, useEffect } = React;
const productosIniciales = [
    {
      id: 1,
      nombre: "Leche Descremada La Serenísima",
      stock: 10,
      precio: 120
    },
    {
      id: 2,
      nombre: "Harina 000 Coto",
      stock: 50,
      precio: 80
    },
    {
      id: 3,
      nombre: "Huevos Blancos Granja Blanca x 30",
      stock: 20,
      precio: 350
    },
    {
      id: 4,
      nombre: "Carne Vacuna Molida",
      stock: 15,
      precio: 600
    },
    {
      id: 5,
      nombre: "Pollo Fresco",
      stock: 10,
      precio: 450
    },
    {
      id: 6,
      nombre: "Arroz Blanco Doble Carolina",
      stock: 25,
      precio: 150
    },
    {
      id: 7,
      nombre: "Fideos Spaghetti Nº 5 Luchetti",
      stock: 30,
      precio: 80
    },
    {
      id: 8,
      nombre: "Tomates Perita Chocón",
      stock: 20,
      precio: 100
    },
    {
      id: 9,
      nombre: "Papas",
      stock: 30,
      precio: 120
    },
    {
      id: 10,
      nombre: "Manzanas Rojas",
      stock: 25,
      precio: 150
    },
    {
      id: 11,
      nombre: "Bananas",
      stock: 20,
      precio: 100
    },
    {
      id: 12,
      nombre: "Cerveza Brahma Lager",
      stock: 15,
      precio: 250
    },
    {
      id: 13,
      nombre: "Coca Cola 2.5 L",
      stock: 10,
      precio: 300
    },
    {
      id: 14,
      nombre: "Agua Mineral Villa del Sur 1.5 L",
      stock: 20,
      precio: 60
    },
    {
      id: 15,
      nombre: "Café Nescafé Clásico",
      stock: 15,
      precio: 200
    },
    {
      id: 16,
      nombre: "Té Ser Supremo",
      stock: 20,
      precio: 180
    },
    {
      id: 17,
      nombre: "Shampoo Head & Shoulders",
      stock: 10,
      precio: 350
    },
    {
      id: 18,
      nombre: "Jabón Lux",
      stock: 15,
      precio: 100
    },
    {
      id: 19,
      nombre: "Papel Higiénico Scott Doble Hoja",
      stock: 12,
      precio: 200
    },
    {
      id: 20,
      nombre: "Detergente Ala Matic",
      stock: 8,
      precio: 300
    }
  ]
  
  const Carrito = ({carrito,subtotal,total})=>{
   return( <div className="carrito">
                <h2>Carrito</h2>
                <ul>
                    {carrito.map(item => (
                        <li key={item.id}>{item.nombre} - {item.cantidad} unidades - ${item.precio * item.cantidad}</li>
                    ))}
                </ul>
                <h3>Subtotal: ${subtotal}</h3>
                <h3>Total: ${total}</h3>
            </div>)
  }

  const Productos = ({productos, agregarAlCarrito, seleccionarProductoParaEditar, setProductos})=>{
    return(<div className="tabla-productos">
    <table className="table table-sm">
        <thead>
            <tr>
                <th scope="col">id</th>
                <th scope="col">Nombre del Producto</th>
                <th scope="col">Unidades</th>
                <th scope="col">Precio</th>
                <th scope="col">Acciones</th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {productos.map(p => (
                <tr key={p.id}>
                    <th scope="row">{p.id}</th>
                    <td>{p.nombre}</td>
                    <td>{p.stock}</td>
                    <td>{p.precio}</td>
                    <td><i className="fa-solid fa-cart-plus" onClick={(e) => { e.stopPropagation(); agregarAlCarrito(p.id) }}></i></td>
                    <td><i className="fa-regular fa-pen-to-square" onClick={(e) => { e.stopPropagation(); seleccionarProductoParaEditar(p) }}></i></td>
                    <td><i className="fa-solid fa-trash" onClick={(e) => { e.stopPropagation(); setProductos(productos.filter(pro => pro.id !== p.id)) }}></i></td>
                </tr>
            ))}
        </tbody>
    </table>
</div>)
  }

  const Form = ({ id, nombre, stock, precio, editarAgregar, setVentana }) => {
    const [nuevonombre, setNombre] = useState(nombre);
    const [unidades, setUnidades] = useState(stock);
    const [valor, setValor] = useState(precio);
    

    useEffect(() => {
        setNombre(nombre);
        setUnidades(stock);
        setValor(precio);
    }, [nombre, stock, precio]);

    const editar = (e) => {
        e.preventDefault();
        const productosModificados = {
            nombre: nuevonombre,
            stock: unidades,
            precio: valor
        };
        editarAgregar(id, productosModificados);
    };

    const cancelar = (e) => {
        e.preventDefault();
        setNombre(nombre);
        setUnidades(stock);
        setValor(precio);
        setVentana(false)
    };

    return (
        <form>
            <input type="text" placeholder="Nombre" value={nuevonombre} onChange={(e) => setNombre(e.target.value)} />
            <input type="number" placeholder="Unidades" value={unidades} onChange={(e) => setUnidades(Number(e.target.value))} />
            <input type="number" placeholder="Precio" value={valor} onChange={(e) => setValor(Number(e.target.value))} />
            <button onClick={editar}>Aceptar</button>
            <button onClick={cancelar}>Cancelar</button>
        </form>
    );
};

function App() {
    const [agregar, setAgregar] = useState(false) 
    const [home, setHome] = useState(false)
    const [ventanaCarrito,setVentanaCarrito] = useState(false)
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [carrito, setCarrito] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('productos') === null) {
            localStorage.setItem('productos', JSON.stringify(productosIniciales));
        }
        const productosGuardados = localStorage.getItem('productos');
        if (productosGuardados) {
            setProductos(JSON.parse(productosGuardados));
        }
    }, []);

    const editarAgregar = (id, productosModificados) => {
        const index = productos.findIndex(p => p.id === id);
        if (index !== -1) {
            const productosNuevos = productos.map(p => p.id === id ? { ...p, ...productosModificados } : p);
            localStorage.setItem('productos', JSON.stringify(productosNuevos));
            setProductos(productosNuevos);
        } else {
            const copia = [...productos, { id: productos.length + 1, ...productosModificados }];
            localStorage.setItem('productos', JSON.stringify(copia));
            setProductos(copia);
        }
        setProductoSeleccionado(null);
    };

    const seleccionarProductoParaEditar = (producto) => {
        setProductoSeleccionado(producto);
    };

    const agregarAlCarrito = (id) => {
        const producto = productos.find(p => p.id === id);
        if (producto && producto.stock > 0) {
            const nuevoProducto = { ...producto, stock: producto.stock - 1 };
            const productosActualizados = productos.map(p => p.id === id ? nuevoProducto : p);
            localStorage.setItem('productos', JSON.stringify(productosActualizados));
            setProductos(productosActualizados);

            const carritoExistente = carrito.find(p => p.id === id);
            if (carritoExistente) {
                const carritoActualizado = carrito.map(p => p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p);
                setCarrito(carritoActualizado);
            } else {
                setCarrito([...carrito, { ...producto, cantidad: 1 }]);
            }
        }
    };

    const productosVacios = {
        id: null,
        nombre: '',
        stock: 0,
        precio: 0
    };

    const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const total = subtotal;

    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <form className="d-flex" role="search">
                        <i className="fa-solid fa-bars" onClick={() => setSidebarOpen(!sidebarOpen)}></i>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button> 
                    </form>
                </div>
            </nav>
            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <button className="closebtn" onClick={() => setSidebarOpen(false)}>×</button>
                <a onClick={()=>{setHome(true); setAgregar(false);}}>Home</a>
                <a onClick={()=>{setAgregar(true); setHome(false);}}>Agregar</a>
                <a onClick={()=>{setVentanaCarrito(true);setHome(false);setAgregar(false)}}>Carrito</a>
                <a href="#">Link 4</a>
            </div>
            {agregar && <Form {...(productoSeleccionado || productosVacios)} editarAgregar={editarAgregar} setVentana={setAgregar}/>}
            {home && <Productos productos={productos} setProductos={setProductos} seleccionarProductoParaEditar={seleccionarProductoParaEditar} agregarAlCarrito={agregarAlCarrito}/>}
            {ventanaCarrito && <Carrito carrito={carrito} subtotal={subtotal} total={total}/>}
        </>
    );
}

