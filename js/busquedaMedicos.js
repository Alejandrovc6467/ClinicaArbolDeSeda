
const  initializeTable = () => {
    const table = document.getElementById('tablaMedicos').getElementsByTagName('tbody')[0];
    const rowsPerPage = 7; // Cambiar a 5 para mostrar 5 filas por página
    let currentPage = 1;
    

    var originalData = getMedicos();
    // esta bien solo acomodar los parametros de los medicos bien

    
    

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
          

            

            // Crear el botón y asignarle la función con la cédula como argumento
            const buttonCell = row.insertCell(4);
            const button = document.createElement('button');
            button.innerText = 'Ver más';
            button.classList.add('verInfoMedicoButon'); // Agregar la clase "verInfoMedico"
            button.addEventListener('click', function() {
                abrirModalMedico(data[i].cedula);
            });
            buttonCell.appendChild(button);
            

        }
    };



    /*nuevo */
    const abrirModalMedico = (cedula) =>{

        const medico = getMedico(cedula);

        
        // Rellenar campos HTML con datos del objeto medico
        document.getElementById('nombreInfoMedico').textContent = medico.nombre+" "+ medico.apellidos;
        document.getElementById('cedulaInfoMedico').textContent = medico.cedula;
        document.getElementById('especialidadInfoMedico').textContent = medico.especialidad;
        document.getElementById('horariosInfoMedico').textContent = medico.horariosConsulta;
        document.getElementById('telefonoInfoMedico').textContent = medico.telefono;
        document.getElementById('correoInfoMedico').textContent = medico.correo;
        document.getElementById('biografiaInfoMedico').textContent = medico.biografia;
        
        mostrarMedicoModal();

    };


    // Obtener el campo de entrada del input buscarCedula en directo
    document.getElementById("buscarCedula").addEventListener("input", function() {
        // Obtener el valor actual del campo
        var valor = this.value;
                
        // Eliminar cualquier carácter que no sea un dígito o un guión
        valor = valor.replace(/[^\d-]/g, "");

        // Limitar la longitud de la cadena a 12 caracteres (#-####-####)
        valor = valor.slice(0, 11);

        // Verificar si la longitud actual permite insertar el guión automáticamente
        if (valor.length > 1 && valor.charAt(1) !== '-') {
            valor = valor.slice(0, 1) + '-' + valor.slice(1);
        }
        if (valor.length > 6 && valor.charAt(6) !== '-') {
            valor = valor.slice(0, 6) + '-' + valor.slice(6);
        }

        // Actualizar el valor del campo con la máscara aplicada
        this.value = valor;
        
    });

    /**nuevo */


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
       

        filteredData = originalData.filter(function(item) {
            return item.cedula.toString().includes(filtroCedula) &&  item.nombre.toLowerCase().includes(filtroNombre) &&  item.apellidos.toLowerCase().includes(filtroApellidos) &&  item.especialidad.toLowerCase().includes(filtroEspecialidad);
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
    
}

document.addEventListener("DOMContentLoaded", initializeTable);