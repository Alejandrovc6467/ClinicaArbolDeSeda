
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



const  ocultarBotonFormAgendarCita = () => {
  var boton = document.getElementById("botonSubmitFormAgendarCita");
  boton.style.display = "none";
};


const  mostrarBotonFormAgendarCita = () => {
  var boton = document.getElementById("botonSubmitFormAgendarCita");
  boton.style.display = "inline";
};


const agregarBotonActualizar = (id) => {

  console.log(id, "desde agregar boton");
  // Verificar si ya existe un botón con el ID "actualizarCita"
  if (!document.getElementById("actualizarCita")) {
    // Crear el botón solo si no existe
    var botonActualizar = document.createElement("button");
    botonActualizar.id = "actualizarCita";
    botonActualizar.textContent = "Actualizar Cita";

    // Obtener el contenedor del formulario
    var containerFormulario = document.querySelector(".container_agendarCita");

    // Agregar el botón después del formulario
    containerFormulario.insertAdjacentElement("afterend", botonActualizar);

    botonActualizar.addEventListener("click", actualizarCita);
  }

};


const actualizarCita = () => {

  const {fecha, hora, especialidad, cedulaMedico} = getDatosFormularioAgendarCita();
  const usuarioCedula = getSessionStorageUser();



  /*
  const {fecha, hora, especialidad, cedulaMedico} = getDatosFormularioAgendarCita();
  const usuarioCedula = getSessionStorageUser();


  if(verifcarHorarioDeCita(fecha, hora, cedulaMedico)){

    
   if(updateCita(usuarioCedula,fecha, hora, especialidad, cedulaMedico)){

    mostrarModalNotificacion("Cita actualizada correctamente");

   }else{
    mostrarModalNotificacion("Ocurrio un error al actualizar la cita, intenta nuevamente");
   }
   
   
  }else{
    mostrarModalNotificacion("Ya existe una cita agendada para esa fecha y hora con el medico seleccionado");
  }

  */
};


const  quitarBotonActualizar = () => {
  // Obtener el botón de actualizar
  var botonActualizar = document.getElementById("actualizarCita");

  // Verificar si el botón existe antes de intentar eliminarlo
  if (botonActualizar) {
    // Eliminar el botón
    botonActualizar.parentNode.removeChild(botonActualizar);
  }
};


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

        <span>Id cita:</span> 
        <p id="idCita">${cita.id}</p>

        <span>Cédula Usuario:</span> 
        <p id="usuarioCedula">${cita.usuarioCedula}</p>

        <span>Fecha:</span> 
        <p id="fecha">${cita.fecha}</p>

        <span>Hora:</span> 
        <p id="hora">${cita.hora}</p>

        <span>Especialidad:</span> 
        <p id="especialidad">${cita.especialidad}</p>

        <span>Cédula Médico:</span> 
        <p id="cedulaMedico">${cita.cedulaMedico}</p>

        <span>Nombre Médico:</span> 
        <p id="nombreMedico">${cita.nombreMedico}</p>

        <span>Estado:</span> 
        <p id="estado">${cita.estado}</p>

        <div class="botones_cita">
          <button onclick="borrarCita(${cita.id})" class="borrarCita" >Borrar</button>
          <button onclick="abrirModalActualizarCita(${cita.id})" class="actualizarCita" >Actualizar</button>  
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

        <span>Id cita:</span> 
        <p id="idCita">${cita.id}</p>

        <span>Cédula Usuario:</span> 
        <p id="usuarioCedula">${cita.usuarioCedula}</p>

        <span>Fecha:</span> 
        <p id="fecha">${cita.fecha}</p>

        <span>Hora:</span> 
        <p id="hora">${cita.hora}</p>

        <span>Especialidad:</span> 
        <p id="especialidad">${cita.especialidad}</p>

        <span>Cédula Médico:</span> 
        <p id="cedulaMedico">${cita.cedulaMedico}</p>

        <span>Nombre Médico:</span> 
        <p id="nombreMedico">${cita.nombreMedico}</p>

        <span>Estado:</span> 
        <p id="estado">${cita.estado}</p>

        <div class="botones_cita">
          <label for="aprobarCheckbox">Aprobar <input type="checkbox" class="aprobarCita" id="aprobarCheckbox_${i}" onchange="cambiarEstadoCita(${cita.id}, this)" ${checkboxMarcado}></label>
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

  quitarBotonActualizar();
  mostrarBotonFormAgendarCita();
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

      if(validarCamposVacios(hora, especialidad, cedulaMedico)){

        if(verifcarHorarioDeCita(fecha, hora, cedulaMedico)){

          if( setCita(userCedula, fecha, hora, especialidad, cedulaMedico)){
            mostrarModalNotificacion("Cita agendada correctamente");
            renderCalendar();
            limpiarCampos();
            cerrarModalStandard();

            const partesFecha = fecha.split("/");
            const dia = partesFecha[0];
            const mes = partesFecha[1];
            const anio = partesFecha[2];
          
            //actualizar las citas
            getCitasDelDia(dia, parseInt(mes, 10) - 1, anio);

          }else{
            mostrarModalNotificacion("Hubo un error al agendar la cita, intenta nuevamente");
            renderCalendar();
          }
         
        }else{
          mostrarModalNotificacion("Ya existe una cita agendada para esa fecha y hora con el medico seleccionado");
        }

      }else{
        mostrarModalNotificacion("Revisa que ningún campo se encuentre vacío");
      }
    
 
      
  });

});


//obtener datos del formulario
const getDatosFormularioAgendarCita = () => {

  const fecha = document.getElementById("fechaCitaInput").value.trim();
  const hora = document.getElementById("horaInput").value.trim();
  const especialidad = document.getElementById("especialidadInput").value.trim();
  const cedulaMedico = document.getElementById("cedulaMedicoInput").value.trim();

  return {fecha, hora, especialidad, cedulaMedico};

};


const limpiarCampos = () => {

  document.getElementById("horaInput").value = "";
  document.getElementById("especialidadInput").value = "";
  document.getElementById("cedulaMedicoInput").value = "";
 
};


const validarCamposVacios = (hora, especialidad, cedulaMedico) => {

  if (hora === "" || especialidad === "" || cedulaMedico === "") {
    return false; // Al menos uno de los campos está vacío
  }

  return true; // Todos los campos tienen valores
};


const  borrarCita = (id) => {

  console.log(getCitaById(id));

  var cita =  getCitaById(id);
 
  const partesFecha = cita.fecha.split("/");
  const dia = partesFecha[0];
  const mes = partesFecha[1];
  const anio = partesFecha[2];

  eliminarCita(id);

  //actualizar las citas
  getCitasDelDia(dia, parseInt(mes, 10) - 1, anio);

  renderCalendar();

};


const abrirModalActualizarCita = (id) => {

  var cita =  getCitaById(id);

  console.log(cita, "desde abrir modal");

  document.getElementById("horaInput").value = cita.hora;
  document.getElementById("especialidadInput").value = cita.especialidad;
  document.getElementById("cedulaMedicoInput").value = cita.cedulaMedico;

  ocultarBotonFormAgendarCita();
  agregarBotonActualizar(id);
  mostrarModalStandard();

};


const cambiarEstadoCita = (id) => {
  
  actualizarEstadoCita(id);

  var cita =  getCitaById(id);
 
  const partesFecha = cita.fecha.split("/");
  const dia = partesFecha[0];
  const mes = partesFecha[1];
  const anio = partesFecha[2];

  //actualizar las citas
  getCitasDelDia(dia, parseInt(mes, 10) - 1, anio);

};
