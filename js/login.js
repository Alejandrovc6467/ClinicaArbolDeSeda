// Formulario Login
document.addEventListener("DOMContentLoaded", ()=>{

    const formularioLogin = document.getElementById("login");

    formularioLogin.addEventListener("submit", (event)=>{
        event.preventDefault()

        const {cedula, contrasenia} = getDatosFormulario();

        console.log(cedula, contrasenia);

        console.log(getUsuarios(), "desde el login event solo para ver los usuarios registrados")

        const esValido = verificarLogin(cedula, contrasenia);

        esValido ? inicioSesionExitoso(cedula) : errorInicioSesion();
    });

});


//obtener los datos del formulario
const getDatosFormulario = ()=>{

    const cedula = document.getElementById("cedula").value.trim();
    const contrasenia = document.getElementById("contrasenia").value.trim();;
    return {cedula, contrasenia};
};



// Obtener el campo de entrada del input cedula en directo
document.getElementById("cedula").addEventListener("input", function() {
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




//verificar Login
const verificarLogin = (cedula, contrasenia)=>{

    var contraseniaHash = encriptarPassword(contrasenia);

    var usuarios = getUsuarios();

    for (let i = 0; i < usuarios.length; i++) {
       
        if (usuarios[i].cedula === cedula && usuarios[i].contrasenia === contraseniaHash  ) {
            return true
        }
    }

    var medicos = getMedicos();

    for (let i = 0; i < medicos.length; i++) {
       
        if (medicos[i].cedula === cedula && medicos[i].contrasenia === contraseniaHash ) {
            return true
        }
    }
   
    return false;

};


// inicio de sesion exitoso, se invoca si todo sale bien al momento del logueo
const inicioSesionExitoso = (cedula)=>{

    const sesionUser = {
        cedula: cedula
    };
   
    localStorage.setItem("sesionUser", JSON.stringify(sesionUser));
 
    sessionStorage.setItem("sesionUser", JSON.stringify(sesionUser));

    window.location.href = 'agendarCita.html';// redireciono a agendarcita
   
};

//se invoca si hay un error en l sessio
const errorInicioSesion = ()=>{
    //aqui deberia de hacer la logica de inicios de sesion fallidos, revisar primero si esa cedula existe
    mostrarModalNotificacion("Datos incorrectos");
};