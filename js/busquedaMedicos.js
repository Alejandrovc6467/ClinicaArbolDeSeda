
const  initializeTable = () => {
    const table = document.getElementById('tablaMedicos').getElementsByTagName('tbody')[0];
    const rowsPerPage = 7; // Cambiar a 5 para mostrar 5 filas por página
    let currentPage = 1;
    

    var originalData = getMedicos();
    // esta bien solo acomodar los parametros de los medicos bien

    /*
    let originalData = [
        { name: "Alicia", age: 30, country: "España" },
        { name: "Alicia", age: 45, country: "Australia" },
        { name: "Alicia", age: 28, country: "Argentina" },
        { name: "Daia", age: 35, country: "Brasil" },
        { name: "Eia", age: 22, country: "Italia" },
        { name: "Feia", age: 40, country: "México" },
        { name: "Gabriela", age: 29, country: "Chile" },
        { name: "Hugo", age: 33, country: "pitu" },
        { name: "Isabel", age: 26, country: "Alemania" },
        { name: "Juan", age: 31, country: "Perú" },
        { name: "Karla", age: 37, country: "Estados Unidos" },
        { name: "Luis", age: 42, country: "Colombia" },
        { name: "María", age: 39, country: "Canadá" },
        { name: "Natalia", age: 27, country: "Reino Unido" },
        { name: "Óscar", age: 32, country: "Portugal" },
        { name: "Patricia", age: 34, country: "Japón" },
        { name: "Quim", age: 36, country: "Corea del Sur" },
        { name: "Raquel", age: 25, country: "China" },
        { name: "Sergio", age: 38, country: "Rusia" },
        { name: "Tatiana", age: 41, country: "India" }
    ];
    */
    

    let filteredData = [];

    const showPage = (page, data) => {
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, data.length);

        table.innerHTML = '';
        for (let i = startIndex; i < endIndex; i++) {
            const row = table.insertRow();
            row.insertCell(0).innerText = data[i].cedula;
            row.insertCell(1).innerText = data[i].nombre;
            row.insertCell(2).innerText = data[i].apellidos;
            row.insertCell(3).innerText = data[i].especialidad;
            row.insertCell(4).innerText = data[i].telefono;
        }
    };

    const  updatePagination = (filteredDataLength = originalData.length) => {
        const totalPages = Math.ceil(filteredDataLength / rowsPerPage);
        const pagination = document.querySelector('.paginacion');
        pagination.innerHTML = '';

        const prevButton = createPaginationButton('Anterior');
        prevButton.addEventListener('click', function(event) {
            event.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage, filteredData.length ? filteredData : originalData);
                updatePagination(filteredDataLength);
            }
        });
        pagination.appendChild(prevButton);

        let startPage = Math.max(1, currentPage - Math.floor(4 / 2));
        let endPage = Math.min(totalPages, startPage + 3);

        if (endPage - startPage < 2) {
            startPage = Math.max(1, endPage - 3);
        }

        for (let i = startPage; i <= endPage; i++) {
            const link = createPaginationLink(i);
            if (i === currentPage) {
                link.classList.add('active');
            }
            link.addEventListener('click', function(event) {
                event.preventDefault();
                currentPage = i;
                showPage(currentPage, filteredData.length ? filteredData : originalData);
                updatePagination(filteredDataLength);
            });
            pagination.appendChild(link);
        }

        const nextButton = createPaginationButton('Siguiente');
        nextButton.addEventListener('click', function(event) {
            event.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage, filteredData.length ? filteredData : originalData);
                updatePagination(filteredDataLength);
            }
        });
        pagination.appendChild(nextButton);
    };

    const createPaginationButton = (text) => {
        const button = document.createElement('a');
        button.href = '#';
        button.innerText = text;
        return button;
    };

    const createPaginationLink = (pageNumber) => {
        const link = document.createElement('a');
        link.href = '#';
        link.innerText = pageNumber;
        return link;
    };

    const filterTable = () => {
        const filtroCedula = document.getElementById('buscarCedula').value.toLowerCase();
        const filtroNombre = document.getElementById('buscarNombre').value.toLowerCase();
        const filtroApellidos = document.getElementById('buscarApellidos').value.toLowerCase();
        const filtroEspecialidad = document.getElementById('buscarEspecialidad').value.toLowerCase();
        const filtroTelefono = document.getElementById('buscarTelefono').value.toLowerCase();

        filteredData = originalData.filter(function(item) {
            return item.cedula.toString().includes(filtroCedula) &&  item.nombre.toLowerCase().includes(filtroNombre) &&  item.apellidos.toLowerCase().includes(filtroApellidos) &&  item.especialidad.toLowerCase().includes(filtroEspecialidad) && item.telefono.toString().includes(filtroTelefono);
        });

        currentPage = 1;
        showPage(currentPage, filteredData);
        updatePagination(filteredData.length);
    };

    showPage(currentPage, originalData);
    updatePagination();

    document.getElementById('buscarCedula').addEventListener('keyup', filterTable);
    document.getElementById('buscarNombre').addEventListener('keyup', filterTable);
    document.getElementById('buscarApellidos').addEventListener('keyup', filterTable);
    document.getElementById('buscarEspecialidad').addEventListener('keyup', filterTable);
    document.getElementById('buscarTelefono').addEventListener('keyup', filterTable);
}

document.addEventListener("DOMContentLoaded", initializeTable);