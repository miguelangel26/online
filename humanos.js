              //menu
              document.getElementById('toggle-menu').addEventListener('click', function () {
                document.getElementById('nav-menu').style.display = 'block';
                document.getElementById('overlay').style.display = 'block';
            });
            
            document.getElementById('close-menu').addEventListener('click', function () {
                closeMenu();
            });
            
            document.getElementById('overlay').addEventListener('click', function () {
                closeMenu();
            });
            
            // Función para cerrar el menú
            function closeMenu() {
                document.getElementById('nav-menu').style.display = 'none';
                document.getElementById('overlay').style.display = 'none';
            }

//     CARRITO
const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Variable global para almacenar la información del elemento
let infoElemento;

cargarEventListeners();

function cargarEventListeners() {
    document.addEventListener('DOMContentLoaded', cargarCarritoDesdeLocalStorage);

    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    };
    insertarCarrito(infoElemento);
    guardarCarritoEnLocalStorage();
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
           <img src="${elemento.imagen}" width=100>
        </td>
        <td>
           ${elemento.titulo}
        </td>
        <td>
           ${elemento.precio}
        </td>
        <td>
           <a href="#" class="borrar" data-id="${elemento.id}">X </a>
        </td>
    `;
    lista.appendChild(row);
}

function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        const elementoId = e.target.getAttribute('data-id');
        e.target.parentElement.parentElement.remove();
        eliminarElementoDeLocalStorage(elementoId);
    }
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    localStorage.removeItem('carrito');
    return false;
}

function guardarCarritoEnLocalStorage() {
    let carrito;
    if (localStorage.getItem('carrito') === null) {
        carrito = [];
    } else {
        carrito = JSON.parse(localStorage.getItem('carrito'));
    }
    carrito.push(infoElemento);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDesdeLocalStorage() {
    let carrito;
    if (localStorage.getItem('carrito') === null) {
        carrito = [];
    } else {
        carrito = JSON.parse(localStorage.getItem('carrito'));
    }
    carrito.forEach(function (elemento) {
        insertarCarrito(elemento);
    });
}

function eliminarElementoDeLocalStorage(id) {
    let carrito;
    if (localStorage.getItem('carrito') === null) {
        carrito = [];
    } else {
        carrito = JSON.parse(localStorage.getItem('carrito'));
    }
    const index = carrito.findIndex(function (elemento) {
        return elemento.id === id;
    });
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


             //buscador de contenido
//ejecutando funciones
// variable para rastrear si el buscador está visible
var buscadorVisible = false;

document.getElementById("icon-searchs").addEventListener('click', function() {
    if (!buscadorVisible) {
        mostrar_buscador();
        // Actualiza el estado del buscador
        buscadorVisible = true;
    } else {
        ocultar_buscador();
        // Actualiza el estado del buscador
        buscadorVisible = false;
    }
});
document.getElementById("cover-ctn-search").addEventListener('click', ocultar_buscador);
//declarando variables

bars_search = document.getElementById('ctn-bars-search');
cover_ctn_search = document.getElementById('cover-ctn-search');
inputSearch = document.getElementById('inputSearch');
box_search = document.getElementById('box-search');

//funcion mostrar el buscador
function mostrar_buscador(){
      bars_search.style.top ="130px";
      cover_ctn_search.style.display = "block";
      inputSearch.focus();

}

//funcion para ocultar el buscador
function ocultar_buscador(){
    bars_search.style.top ="-10px";
    cover_ctn_search.style.display = "none";
    inputSearch.value = "";
    box_search.style.display = "none";
}




          //                 Creando filtrado de busqueda

document.getElementById("inputSearch").addEventListener("keyup", buscador_interno);

function buscador_interno(){


    filter = inputSearch.value.toUpperCase();
    li = box_search.getElementsByTagName("li");

    //Recorriendo elementos a filtrar mediante los "li"
    for (i = 0; i < li.length; i++){

        a = li[i].getElementsByTagName("a")[0];
        textValue = a.textContent || a.innerText;

        if(textValue.toUpperCase().indexOf(filter) > -1){

            li[i].style.display = "";
            box_search.style.display = "block";

            if (inputSearch.value === ""){
                box_search.style.display = "none";
            }

        }else{
            li[i].style.display = "none";
        }

    }



}







