   
const verificarLogin = () => {

  var userSessionLocalStorage = [];
  userSessionLocalStorage =  JSON.parse(localStorage.getItem("sesionUser"));

  var userSessionSessionStorage = []; 
  userSessionSessionStorage =  JSON.parse(sessionStorage.getItem("sesionUser"));

  if( !( (userSessionSessionStorage != null) && (userSessionLocalStorage.cedula === userSessionSessionStorage.cedula ) )){
    window.location.href = 'login.html';
  }  

};


verificarLogin();


/*logout*/

// funcion para eliminar las variables de logueo
const logout = () =>{

  document.getElementById("cerrarSesion").addEventListener("click", function() {
            
    localStorage.removeItem("sesionUser");
    sessionStorage.removeItem("sesionUser");

    window.location.href = "login.html";
  });

};
