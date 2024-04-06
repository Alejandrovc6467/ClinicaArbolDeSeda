
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
//cargo los datos necesarios para agregar el calendario 
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

// renderizo el calendario con los datos requeridos 
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
navs.forEach(icon => { // obtengo los botones  y les pongo el addEventListener
  icon.addEventListener("click", () => { 
     
      month = icon.id === "prev" ? month - 1 : month + 1;

      if(month < 0 || month > 11) { 
          
          date = new Date(year, month, new Date().getDate());
          year = date.getFullYear(); 
          month = date.getMonth(); 
      } else {
          date = new Date(); 
      }
      renderCalendar(); 
  });
});


renderCalendar();

/* Calendario settings **************************************************************/


// muestra el boton de agendar
const  ocultarBotonFormAgendarCita = () => {
  var boton = document.getElementById("botonSubmitFormAgendarCita");
  boton.style.display = "none";
};

//muestra el boton agregar cita para los usuarios
const  mostrarBotonFormAgendarCita = () => {
  var boton = document.getElementById("botonSubmitFormAgendarCita");
  boton.style.display = "inline";
};

// quitar el boton agendar para reemplazarlo con el boton de actualizar
const agregarBotonActualizar = () => {

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

// quitar el boton actualizar para reemplazarlo con el boton de agendar
const  quitarBotonActualizar = () => {
  // Obtener el botón de actualizar
  var botonActualizar = document.getElementById("actualizarCita");

  // Verificar si el botón existe antes de intentar eliminarlo
  if (botonActualizar) {
    // Eliminar el botón
    botonActualizar.parentNode.removeChild(botonActualizar);
  }
};

// seteo el valor a el input oaculto
const  setIdCitaInputOculto = (valor) => {
  document.getElementById("idCitaInput").value = valor;
};

// obtengo el id de la cita del input oculto
const  getIdCitaInputOculto = (valor) => {
  return document.getElementById("idCitaInput").value;
};


// actulaizar cita, revisando
const actualizarCita = () => {

  const {id, fecha, hora, especialidad, cedulaMedico} = getDatosFormularioAgendarCitaUpdate();

  if(id != "" && fecha != "" && hora != "" && especialidad != "" && cedulaMedico != "" ){

      
    if(verifcarHorarioDeCita(fecha, hora, cedulaMedico)){

      if( !(getCitaById(id)) ){
      
        if(updateCita (id, hora, especialidad, cedulaMedico)){

          mostrarModalNotificacion("Cita actualizada correctamente");

          const userCedula = getSessionStorageUser();

          const paciente = getUsuario(userCedula);

          const medico = getMedico(cedulaMedico);

          emailjs.send("service_wx19xrb","template_6eali6n",{
            from_name: "Clínica Árbol de Seda",
            to_name: medico.nombre + " " + medico.apellidos,
            message: "El paciente " + paciente.nombre + " " + paciente.apellidos + " quiere actualizar una cita agendada contigo el día: " + fecha + " a las: " + hora ,
            to_email: medico.correo,
          });

          const partesFecha = fecha.split("/");
          const dia = partesFecha[0];
          const mes = partesFecha[1];
          const anio = partesFecha[2];
        
          //actualizar las citas
          getCitasDelDia(dia, parseInt(mes, 10) - 1, anio);

        }else{
          mostrarModalNotificacion("Cita no actualizada, Intente nuevamente");
        }
        
      }else{
        mostrarModalNotificacion("El id de la cita a actualizar no está registrada");
      }
    
    
    }else{
      mostrarModalNotificacion("Ya existe una cita agendada para esa fecha y hora con el medico seleccionado");
    }

  
  }else{
    mostrarModalNotificacion("Completa todos los espacios");
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

// desabilito el boton de enviar para los medicos
desabilitarBoton();

// remuevo los select de los demas elementos, necesario para que no se hagan replicas
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

// setteo la fecha en el input del modal actualizar
const setFechaEnInputModalStandar = (year, month, day) => {

  //setear inputDeFecha
  const fechaInput = document.querySelector("#fechaCitaInput");
  fechaInput.disabled = true; 
  fechaInput.value = `${day}/${month+1}/${year}`; 

};

// obtengo todas las citas del dia seleccionado
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

//abrir  fecha en la donde se hizo click 
const abrirFecha = (year, month, day) => {

  // validar si la sesion es de medico nunca llamar es metodo
  habilitarBoton();

  limpiarCampos();

  removerSeleccionEnLosDemasElmentos(day);
  
  setFechaEnInputModalStandar(year, month, day);
  
  getCitasDelDia(day, month, year); 

  console.log("Clicked on date:", day , month+1, year );

  cargarSelectConMedicos();
};

//cargo el select de medicos con todos los medicos disponibles
const cargarSelectConMedicos = () => {
  const listaMedicos = getMedicos();
  const selectMedicos = document.getElementById('cedulaMedicoInput');

  // Limpiar opciones existentes
  selectMedicos.innerHTML = '';

  // Agregar la opción inicial vacía
  const optionInicial = document.createElement('option');
  optionInicial.value = '';
  optionInicial.textContent = ''; 
  selectMedicos.appendChild(optionInicial);
  
  

  // Agregar las nuevas opciones
  listaMedicos.forEach(medico => {
    const option = document.createElement('option');
    option.value = medico.cedula;
    option.textContent = `${medico.cedula} - ${medico.nombre} ${medico.apellidos}`;
    selectMedicos.appendChild(option);
  });

};

//cargo el select de especialidad con la especialidad del medico que se recibe por parametro
const cargarSelectConEspecialidad = (cedulaMedico) => {
  // Obtener el médico correspondiente a la cédula
  var medico = getMedico(cedulaMedico);
  console.log(medico.especialidad);

  document.getElementById('especialidadInput').value = medico.especialidad;

};


// Escuchar el evento change en el select de médicos
document.getElementById('cedulaMedicoInput').addEventListener('change', (event) => {

  const cedulaMedicoSeleccionado = event.target.value;
  cargarSelectConEspecialidad(cedulaMedicoSeleccionado);

});


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

            // codigo email para enviarlo al medico

            const paciente = getUsuario(userCedula);

            const medico = getMedico(cedulaMedico);

            emailjs.send("service_wx19xrb","template_6eali6n",{
              from_name: "Clínica Árbol de Seda",
              to_name: medico.nombre + " " + medico.apellidos,
              message: "El paciente " + paciente.nombre + " " + paciente.apellidos + " quiere agendar una cita contigo el día: " + fecha + " a las: " + hora ,
              to_email: medico.correo,
            });
        
            

            // fin email code



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

// obtengo los datos del formulario
const getDatosFormularioAgendarCitaUpdate = () => {

  const id = document.getElementById("idCitaInput").value.trim();
  const fecha = document.getElementById("fechaCitaInput").value.trim();
  const hora = document.getElementById("horaInput").value.trim();
  const especialidad = document.getElementById("especialidadInput").value.trim();
  const cedulaMedico = document.getElementById("cedulaMedicoInput").value.trim();

  return {id, fecha, hora, especialidad, cedulaMedico};

};

//limpiar campos formulario
const limpiarCampos = () => {

  document.getElementById("horaInput").value = "";
  document.getElementById("especialidadInput").value = "";
  document.getElementById("cedulaMedicoInput").value = "";
 
};

//validar campos formulario
const validarCamposVacios = (hora, especialidad, cedulaMedico) => {

  if (hora === "" || especialidad === "" || cedulaMedico === "") {
    return false; // Al menos uno de los campos está vacío
  }

  return true; // Todos los campos tienen valores
};

//borrar cita
const  borrarCita = (id) => {

  console.log(getCitaById(id));

  var cita =  getCitaById(id);

  const paciente = getUsuario(cita.usuarioCedula);

  const medico = getMedico(cita.cedulaMedico);

  emailjs.send("service_wx19xrb","template_6eali6n",{
    from_name: "Clínica Árbol de Seda",
    to_name: medico.nombre + " " + medico.apellidos,
    message: "El paciente " + paciente.nombre + " " + paciente.apellidos + " eliminó la cita del día: " + cita.fecha + " a las: " + cita.hora ,
    to_email: medico.correo,
  });

 
  const partesFecha = cita.fecha.split("/");
  const dia = partesFecha[0];
  const mes = partesFecha[1];
  const anio = partesFecha[2];

  eliminarCita(id);

  //actualizar las citas
  getCitasDelDia(dia, parseInt(mes, 10) - 1, anio);

  renderCalendar();

};

//abrir modal actualizar cita
const abrirModalActualizarCita = (id) => {

  var cita =  getCitaById(id);

  document.getElementById("horaInput").value = cita.hora;
  document.getElementById('especialidadInput').value = cita.especialidad;
  document.getElementById("cedulaMedicoInput").value = cita.cedulaMedico;

  setIdCitaInputOculto(id);
  ocultarBotonFormAgendarCita();
  agregarBotonActualizar();
  mostrarModalStandard();

};

// cambia el estado de una cita segun el id
const cambiarEstadoCita = (id) => {

  const cita = getCitaById(id);

  const paciente = getUsuario(cita.usuarioCedula);

  const medico = getMedico(cita.cedulaMedico);

  console.log(cita);
  console.log(paciente);
  console.log(medico);


  
  if(actualizarEstadoCita(id)){

    emailjs.send("service_wx19xrb","template_6eali6n",{
      from_name: "Clínica Árbol de Seda",
      to_name: paciente.nombre + " " + paciente.apellidos,
      message: "Su cita del día: " + cita.fecha + " a las " + cita.hora + " con el médico: " + medico.nombre + " " + medico.apellidos +" en la especialidad: " + cita.especialidad + " fue APROBADA, recuerda ser puntual",
      to_email: paciente.correo,
      });

  }else{

    emailjs.send("service_wx19xrb","template_6eali6n",{
      from_name: "Clínica Árbol de Seda",
      to_name: paciente.nombre + " " + paciente.apellidos,
      message: "Su cita del día: " + cita.fecha + " a las " + cita.hora + " con el médico: " + medico.nombre + " " + medico.apellidos +" en la especialidad: " + cita.especialidad + " fue CANCELADA, nuestro médico se disculpa por los inconvenientes y te envita a agendar una nueva cita",
      to_email: paciente.correo,
      });

  }
  
  
  
 
  const partesFecha = cita.fecha.split("/");
  const dia = partesFecha[0];
  const mes = partesFecha[1];
  const anio = partesFecha[2];

  //actualizar las citas
  getCitasDelDia(dia, parseInt(mes, 10) - 1, anio);

};