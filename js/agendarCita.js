
//obtener variables de session para colocarlas en la bienvenida
const getNombreApellidosVariablesDeSesion = () => {

    var datosUser = getUsuario(getSessionStorageUser());

    var bienvenida_nameUser = document.getElementById("bienvenida_nameUser");

    var nombreApellidos = datosUser.nombre + " " +datosUser.apellidos;

    bienvenida_nameUser.textContent = nombreApellidos;
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


    /* aqui tengo que preguntar si es un "usuaro" o "medico"

    si es usuario pinto de color (color secundario) los dias en que el usuario tenga citas, pero si preciono alguno de esos dias pintar de azul como ya lo hago, pero si presiono otro tiene que volver al color secundario que ya estaba

    lo mismo para los "medico" solo que a el le cargo las citas en las cuales esta su cedula y tambien cargar las citas a la derecha como ya lo hago con citas de usuarios

    */






    
    //let className = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()  ? ' class="today"' : "";
    let className = ' class=""';
    //datesHtml += `<li${className}>${i}</li>`;
    //datesHtml += `<li id="date-${i}"${className} onclick="abrirFecha(${year}, ${month}, ${i})">${i}</li>`;
    //datesHtml += `<li id="date-${i}"${className} class="calendar-date" onclick="abrirFecha(${year}, ${month}, ${i})">${i}</li>`;

    datesHtml += `<li id="date-${i}" class="calendar-date" onclick="abrirFecha(${year}, ${month}, ${i})">${i}</li>`;




  }


  // "li" dias inactivos de final, porque pertenecen al mes siguiente
  for (let i = end; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;

};


// botones anterio y siguiente del calendario
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
  document.getElementById('boton_agregarCita').disabled = false;
  document.getElementById('boton_agregarCita').classList.remove('desabilitado');
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


const abrirFecha = (year, month, day) => {

  habilitarBoton();

  removerSeleccionEnLosDemasElmentos(day);
  
  setFechaEnInputModalStandar(year, month, day);
  


  
    // aqui tiene que estar los metodo para cargas las citas, primero preguntar por el rol
      /*
    if(rol === usuario){
      getCitasUsuario(cedulaUser);
    }else{
      getCitasUsarios();
    }*/

   

  var sesion =   getUsuario(getSessionStorageUser());

  if(sesion.rol === "usuario"){

    var fecha = `${day}/${month+1}/${year}`; 

    var citasDeUsuario = getCitasUsuario(getSessionStorageUser(), fecha);// obtener todas las citas de ese usuario en el dia solicitado



    const citasPadre = document.getElementById('citas'); // Obtener el div padre

    citasPadre.innerHTML = '';  // Limpiar todas las citas existentes

    for (let i = 0; i < citasDeUsuario.length; i++) {
      
      const cita = citasDeUsuario[i]; // Obtener la cita actual
    
      // Crear un nuevo div "cita"
      const nuevaCita = document.createElement('div');
      nuevaCita.classList.add('cita');
  
      // Agregar los elementos HTML con los datos de la cita
      nuevaCita.innerHTML = `
          <label for="usuarioCedula">Cédula Usuario:</label>
          <p id="usuarioCedula">${cita.usuarioCedula}</p>
  
          <label for="fecha">Fecha:</label>
          <p id="fecha">${cita.fecha}</p>
  
          <label for="hora">Hora:</label>
          <p id="hora">${cita.hora}</p>
  
          <label for="especialidad">Especialidad:</label>
          <p id="especialidad">${cita.especialidad}</p>
  
          <label for="medico">Médico:</label>
          <p id="medico">${cita.medico}</p>
  
          <label for="estado">Estado:</label>
          <p id="estado">${cita.estado}</p>
  
          <div class="botones_cita">
              <button>Actualizar</button>
              <button>Borrar</button>
          </div>
      `;
  
      // Agregar la nueva cita al div padre
      citasPadre.appendChild(nuevaCita);





    };




    console.log("es usuario");


  }else{

    
    console.log("es medico");
  }
    

    

 





  console.log("Clicked on date:", year, month+1, day);

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
      
      const {fecha, hora, especialidad, medico} = getDatosFormularioAgendarCita();

      
      const userCedula = getSessionStorageUser();

      //validar datos mas tarde, como solo son select pues ya bien bien, aun asi hay que validarlos, pero mas tarde
      //const datosValidos = validarCedula(cedula) && validarNombre(nombre) && validarApellidos(apellidos) && validarTelefono(telefono)  && validarEmail(correo) && validarPassword(contrasenia);

    
      if(verifcarHorarioDeCita(fecha, hora, medico)){

        if( setCita(userCedula, fecha, hora, especialidad, medico)){
          mostrarModalNotificacion("Cita agendada correctamente");
        }else{
          mostrarModalNotificacion("Hubo un error al agendar la cita, intenta nuevamente");
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
  const medico = document.getElementById("medico").value.trim();

  return {fecha, hora, especialidad, medico};

};