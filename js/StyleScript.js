

// Colocar un border shadow botton en el navbar cuando el scrollY baja a 50 ***********************************
window.addEventListener('scroll', function() {
    var navbar = document.getElementById('header');
    if (window.scrollY > 50) { // Cambia 50 por la cantidad de desplazamiento que desees
      navbar.classList.add('shadow');
    } else {
      navbar.classList.remove('shadow');
    }
});





// Modal Notiicacion ajustes, abrir y cerrar *********************************************************

const NotificacionModal = () => {

  const abrir_ModalNotificacion = document.querySelector("#abrir_ModalNotificacion");
  const modalNotificacion = document.querySelector("#modalNotificacion_container");
  const cerrarModalNotificacion = document.querySelector("#cerrar_modalNotificacion");

  /*
  abrir_ModalNotificacion.addEventListener("click", () => {
      modalNotificacion.classList.add("active");
  });
  */

  cerrarModalNotificacion.addEventListener("click", () => {
      modalNotificacion.classList.remove("active");
  });

};

NotificacionModal();

// recibe un string para mostar el modal con ese texto
const mostrarModalNotificacion = (texto) => {
    
  var modalTexto = document.getElementById("modalNotificacion_text");
  modalTexto.textContent = "";
  modalTexto.textContent = texto;

  document.querySelector("#modalNotificacion_container").classList.add("active");
};





// Modal standard ajustes, abrir y cerrar **************************************************************

const StandardModal = () => {

  const abrir_ModalStandard = document.querySelector("#abrir_modalStandard");
  const modalStandard = document.querySelector("#modalStandard_container");
  const cerrarModalStandard = document.querySelector("#cerrar_modalStandard");

  /*
  abrir_ModalStandard.addEventListener("click", () => {
      modalStandard.classList.add("active");
  });
  */


  cerrarModalStandard.addEventListener("click", () => {
      modalStandard.classList.remove("active");
  });

};

const cerrarModalStandard = () => {

  const modalStandard = document.querySelector("#modalStandard_container");
  modalStandard.classList.remove("active");
};

StandardModal();

const mostrarModalStandard = () => {

  document.querySelector("#modalStandard_container").classList.add("active");

};


