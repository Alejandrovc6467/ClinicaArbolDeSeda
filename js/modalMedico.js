
// Modal info medico, abrir y cerrar **************************************************************

const medicoModal = () => {

    const abrir_ModalMedico = document.querySelector("#abrir_modalStandard");
    const modalMedico = document.querySelector("#medicoModal_container");
    const cerrarModalMedico = document.querySelector("#cerrar_medicoModal");
  
    cerrarModalMedico.addEventListener("click", () => {
        modalMedico.classList.remove("active");
    });
  
};
  
const cerrarMedicoModal = () => {
    const modalStandard = document.querySelector("#medicoModal_container");
    modalStandard.classList.remove("active");
};
  
medicoModal();
  
const mostrarMedicoModal = () => {
    document.querySelector("#medicoModal_container").classList.add("active");
};
 