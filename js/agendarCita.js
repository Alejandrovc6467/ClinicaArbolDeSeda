
//obtener variables de session para colocarlas en la bienvenida
const getNombreApellidosVariablesDeSesion = () => {

  var bienvenida_nameUser = document.getElementById("bienvenida_nameUser");

  if( getUsuario(getSessionStorageUser()) != null ){

    var datosUser = getUsuario(getSessionStorageUser());

    var nombreApellidos = datosUser.nombre + " " +datosUser.apellidos;

    bienvenida_nameUser.textContent = nombreApellidos;

  }else{

    var datosMedico = getMedico(getSessionStorageUser());

    var nombreApellidos = datosMedico.nombre + " " +datosMedico.apellidos;

    bienvenida_nameUser.textContent = nombreApellidos;

  }
  
};

getNombreApellidosVariablesDeSesion();



/* Calendario settings **************************************************************/

const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");

const months = [
  "Enero",
  "Febrerro",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();


const renderCalendar = () => {

  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  // "li" dias inactivos de inicio, porque pertenecen al mes anterior
  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }


  for (let i = 1; i <= endDate; i++) {
    
    if( getUsuario(getSessionStorageUser()) != null ){

      if(verificarExistenciaCitaEseDiaUsuario(getSessionStorageUser(), `${i}/${month+1}/${year}`)){
        datesHtml += `<li id="date-${i}" class="calendar-date existeCita" onclick="abrirFecha(${year}, ${month}, ${i})">${i}</li>`;
      }else{
        datesHtml += `<li id="date-${i}" class="calendar-date" onclick="abrirFecha(${year}, ${month}, ${i})">${i}</li>`;
      }

    }else{

      if(verificarExistenciaCitaEseDiaMedico(getSessionStorageUser(), `${i}/${month+1}/${year}`)){
        datesHtml += `<li id="date-${i}" class="calendar-date existeCita" onclick="abrirFecha(${year}, ${month}, ${i})">${i}</li>`;
      }else{
        datesHtml += `<li id="date-${i}" class="calendar-date" onclick="abrirFecha(${year}, ${month}, ${i})">${i}</li>`;
      }

    }
  
  }


  // "li" dias inactivos de final, porque pertenecen al mes siguiente
  for (let i = end; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;

};


// botones anterior y siguiente del calendario
navs.forEach((nav) => {
   nav.addEventListener("click", (e) => {
        const btnId = e.target.id;

        if (btnId === "prev" && month === 0) {
        year--;
        month = 11;
        } else if (btnId === "next" && month === 11) {
        year++;
        month = 0;
        } else {
        month = btnId === "next" ? month + 1 : month - 1;
        }

        date = new Date(year, month, new Date().getDate());
        year = date.getFullYear();
        month = date.getMonth();

        renderCalendar();
    });

});

renderCalendar();


/* Calendario settings **************************************************************/









// Método para desabilitar el botón de agendar cita
const desabilitarBoton = () => {
  document.getElementById('boton_agregarCita').disabled = true;
  document.getElementById('boton_agregarCita').classList.add('desabilitado');
};

// Método para habilitar el botón de agendar cita
const habilitarBoton = () => {

  //si es un usuario habilito el boton agendarCita, si es medico pues el no puede hagendar citas con una cuenta de medico
  if(getUsuario(getSessionStorageUser()) != null ){
    document.getElementById('boton_agregarCita').disabled = false;
    document.getElementById('boton_agregarCita').classList.remove('desabilitado');
  }
  
};

desabilitarBoton();


const removerSeleccionEnLosDemasElmentos = (day) => {

  // Obtener el elemento del día seleccionado
  const selectedDateElement = document.getElementById(`date-${day}`);

  // Remover cualquier clase de selección previa en todos los elementos de fecha
  const allDateElements = document.querySelectorAll('.calendar-date');
  allDateElements.forEach(element => {
    element.classList.remove('selected');
  });

  // Agregar clase de selección al elemento del día seleccionado
  selectedDateElement.classList.add('selected');



};


const setFechaEnInputModalStandar = (year, month, day) => {

  //setear inputDeFecha
  const fechaInput = document.querySelector("#fechaCitaInput");
  fechaInput.disabled = true; 
  fechaInput.value = `${day}/${month+1}/${year}`; 

};


const getCitasDelDia = (day, month, year) => {

  console.log(day, month, year, "desde getCitas");

  
  const citasPadre = document.getElementById('citas'); // Obtener el div padre

  citasPadre.innerHTML = '';  // Limpiar todas las citas existentes

  var fecha = `${day}/${month+1}/${year}`; 

  if(getUsuario(getSessionStorageUser()) != null ){

    var citasDeUsuario = getCitasUsuario(getSessionStorageUser(), fecha);// obtener todas las citas de ese usuario en el dia solicitado

    for (let i = 0; i < citasDeUsuario.length; i++) {
      
      const cita = citasDeUsuario[i]; // Obtener la cita actual
    
      const nuevaCita = document.createElement('div');// Crear un nuevo div "cita"
      nuevaCita.classList.add('cita');
  
      // Agregar los elementos HTML con los datos de la cita
      nuevaCita.innerHTML = `
        <span>Cédula Usuario:</span> 
        <p id="usuarioCedula_${i}">${cita.usuarioCedula}</p>

        <span>Fecha:</span> 
        <p id="fecha_${i}">${cita.fecha}</p>

        <span>Hora:</span> 
        <p id="hora_${i}">${cita.hora}</p>

        <span>Especialidad:</span> 
        <p id="especialidad_${i}">${cita.especialidad}</p>

        <span>Cédula Médico:</span> 
        <p id="cedulaMedico_${i}">${cita.cedulaMedico}</p>

        <span>Nombre Médico:</span> 
        <p id="nombreMedico_${i}">${cita.nombreMedico}</p>

        <span>Estado:</span> 
        <p id="estado_${i}">${cita.estado}</p>

        <div class="botones_cita">
          <button onclick="borrarCita(${i})">Borrar</button>
          <button onclick="actualizarCita(${i})">Actualizar</button>  
        </div>
      `;
  
      // Agregar la nueva cita al div padre
      citasPadre.appendChild(nuevaCita);


    };

    console.log("Es usuario");

  }else{

    var citasDeMedicos = getCitasMedico(getSessionStorageUser(), fecha);// obtener todas las citas de ese medico en el dia solicitado

    for (let i = 0; i < citasDeMedicos.length; i++) {

      const cita = citasDeMedicos[i]; // Obtener la cita actual
  
      const nuevaCita = document.createElement('div'); // Crear un nuevo div "cita"
      nuevaCita.classList.add('cita');


      // Definir si el checkbox debe estar marcado o no basado en el estado de la cita
      let checkboxMarcado = '';
      if (cita.estado === 'Aprobado') {
          checkboxMarcado = 'checked';
      }
    
      // Agregar los elementos HTML con los datos de la cita
      nuevaCita.innerHTML = `

        <span>Cédula Usuario:</span> 
        <p id="usuarioCedula_${i}">${cita.usuarioCedula}</p>

        <span>Fecha:</span> 
        <p id="fecha_${i}">${cita.fecha}</p>

        <span>Hora:</span> 
        <p id="hora_${i}">${cita.hora}</p>

        <span>Especialidad:</span> 
        <p id="especialidad_${i}">${cita.especialidad}</p>

        <span>Cédula Médico:</span> 
        <p id="cedulaMedico_${i}">${cita.cedulaMedico}</p>

        <span>Nombre Médico:</span> 
        <p id="nombreMedico_${i}">${cita.nombreMedico}</p>

        <span>Estado:</span> 
        <p id="estado_${i}">${cita.estado}</p>

        <div class="botones_cita">
          <label for="aprobarCheckbox_${i}">Aprobar <input type="checkbox" id="aprobarCheckbox_${i}" onchange="cambiarEstadoCita(${i}, this)" ${checkboxMarcado}></label>
        </div>
      `;
  
      // Agregar la nueva cita al div padre
      citasPadre.appendChild(nuevaCita);
    };

    console.log("Es medico");

  }


};



const abrirFecha = (year, month, day) => {

  // validar si la sesion es de medico nunca llamar es metodo
  habilitarBoton();

  removerSeleccionEnLosDemasElmentos(day);
  
  setFechaEnInputModalStandar(year, month, day);
  
  getCitasDelDia(day, month, year); 

  console.log("Clicked on date:", day , month+1, year );

};



// Event listener para el evento de click del boton "agregar nueva cita" y mostar el modal standard
document.getElementById('boton_agregarCita').addEventListener('click', () => {
    
  mostrarModalStandard();
  
});




// Formulario Registro de citas 
document.addEventListener("DOMContentLoaded", ()=>{

  const formularioRegistro = document.getElementById("agendarCita");

  formularioRegistro.addEventListener("submit", (event)=>{
    event.preventDefault()
      
      const {fecha, hora, especialidad, cedulaMedico} = getDatosFormularioAgendarCita();

      
      const userCedula = getSessionStorageUser();

      //validar datos mas tarde, como solo son select pues ya bienen bien, aun asi hay que validarlos, pero mas tarde
      //const datosValidos = validarCedula(cedula) && validarNombre(nombre) && validarApellidos(apellidos) && validarTelefono(telefono)  && validarEmail(correo) && validarPassword(contrasenia);

    
      if(verifcarHorarioDeCita(fecha, hora, cedulaMedico)){

        if( setCita(userCedula, fecha, hora, especialidad, cedulaMedico)){
          mostrarModalNotificacion("Cita agendada correctamente");
          renderCalendar();
        }else{
          mostrarModalNotificacion("Hubo un error al agendar la cita, intenta nuevamente");
          renderCalendar();
        }
       
      }else{
        mostrarModalNotificacion("Ya existe una cita agendada para esa fecha y hora con el medico seleccionado");
      }
      
  });

});



//obtener datos del formulario
const getDatosFormularioAgendarCita = () => {

  const fecha = document.getElementById("fechaCitaInput").value.trim();
  const hora = document.getElementById("hora").value.trim();
  const especialidad = document.getElementById("especialidad").value.trim();
  const cedulaMedico = document.getElementById("cedulaMedico").value.trim();

  return {fecha, hora, especialidad, cedulaMedico};

};


const limpiarCamposTextoAgendarCita = () => {

  const camposTexto = document.querySelectorAll('#agendarCita input[type="text"], #agendarCita input[type="email"], #agendarCita input[type="password"]');
  
  camposTexto.forEach(campo => {
      campo.value = '';
  });

};


const  borrarCita = (index) => {


  // primero preguntar con un modal noti si lo quiero borrar
  const citaElement = document.querySelector(`.cita:nth-child(${index + 1})`);
  const datosP = citaElement.querySelectorAll('p');
  const datos = {};

  datosP.forEach(function(p) {
      const id = p.getAttribute('id');
      // Eliminamos el índice y el guion bajo del identificador
      const idSinIndex = id.replace(`_${index}`, '');
      const valor = p.textContent.trim().replace(/\s{2,}/g, ' ');
      // Usamos el identificador sin el índice para guardar los datos
      datos[idSinIndex] = valor;
  });

  // Hacer lo que necesites con los datos de la cita antes de eliminarla
  console.log('Datos de la cita a borrar:', datos);

  // Eliminar la cita del DOM
  // citaElement.remove();
  // renderCalendar();

};


const actualizarCita = (index) => {

  // primero preguntar con un modal noti si lo quiero borrar
  const citaElement = document.querySelector(`.cita:nth-child(${index + 1})`);
  const datosP = citaElement.querySelectorAll('p');
  const datos = {};

  datosP.forEach(function(p) {
      const id = p.getAttribute('id');
      // Eliminamos el índice y el guion bajo del identificador
      const idSinIndex = id.replace(`_${index}`, '');
      const valor = p.textContent.trim().replace(/\s{2,}/g, ' ');
      // Usamos el identificador sin el índice para guardar los datos
      datos[idSinIndex] = valor;
  });

  // Hacer lo que necesites con los datos de la cita antes de eliminarla
  console.log('Datos de la cita a borrar:', datos);

  // Eliminar la cita del DOM
  // citaElement.remove();
  // renderCalendar();

};


const  cambiarEstadoCita = (index, checkbox) => {
  
  const citaElement = document.querySelector(`.cita:nth-child(${index + 1})`);
  const datosP = citaElement.querySelectorAll('p');
  const datos = {};

  datosP.forEach(function(p) {

      const id = p.getAttribute('id');
   
      const idSinIndex = id.replace(`_${index}`, '');
      const valor = p.textContent.trim().replace(/\s{2,}/g, ' ');
    
      datos[idSinIndex] = valor;
  });

  const isChecked = checkbox.checked;

  console.log(datos, "desde agendar");


  actualizarEstadoCita(datos.usuarioCedula, datos.fecha, datos.hora, datos.especialidad, datos.cedulaMedico);


  
  const fecha = datos.fecha;

  // Dividir la cadena de fecha en partes utilizando el separador "/"
  const partesFecha = datos.fecha.split("/");
  // Dividir la cadena de fecha en partes utilizando el separador "/"
 

  // Obtener el día, el mes y el año de las partes obtenidas
  const dia = partesFecha[0];
  const mes = partesFecha[1];
  const anio = partesFecha[2];

  

  //actualizar las citas
  getCitasDelDia(dia, parseInt(mes, 10) - 1, anio);

};
