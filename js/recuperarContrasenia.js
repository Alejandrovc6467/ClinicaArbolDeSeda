

// Formulario Registro de usuarios 
document.addEventListener("DOMContentLoaded", ()=>{

    const formularioRegistro = document.getElementById("recuperarContrasenia");

    formularioRegistro.addEventListener("submit", (event)=>{
        event.preventDefault()
        
        const {cedula} = getDatosFormRecuperarContrasenia();

        const usuario = getUsuario(cedula);

        const medico = getMedico(cedula);

        if(usuario != null){

            const nuevaContrasenia = generarContrasenia();

            console.log(nuevaContrasenia);

            actualizarContraseniaUsuario(cedula, encriptarPassword(nuevaContrasenia));


            emailjs.send("service_wx19xrb","template_6eali6n",{
                from_name: "Clínica Árbol de Seda",
                to_name: usuario.nombre + " " + usuario.apellidos,
                message: "Su contraseña de restablecimiento es:  "+ nuevaContrasenia,
                to_email: usuario.correo,
            })
            .then(() => {
                mostrarModalNotificacion("Se envió la contraseña de restablecimiento al correo asociado");
            })
            .catch((error) => {
                mostrarModalNotificacion("Ocurrió un error, intenta nuevamente");
            });



        } else if(medico != null){

            const nuevaContrasenia = generarContrasenia();

            console.log(nuevaContrasenia);

            actualizarContraseniaUsuario(cedula, encriptarPassword(nuevaContrasenia));


            emailjs.send("service_wx19xrb","template_6eali6n",{
                from_name: "Clínica Árbol de Seda",
                to_name: medico.nombre + " " + medico.apellidos,
                message: "Su contraseña de restablecimiento es:  "+ nuevaContrasenia,
                to_email: medico.correo,
            })
            .then(() => {
                mostrarModalNotificacion("Se envió la contraseña de restablecimiento al correo asociado");
            })
            .catch((error) => {
                mostrarModalNotificacion("Ocurrió un error, intenta nuevamente");
            });

        }

        
    });

});


//obtener datos del formulario
const getDatosFormRecuperarContrasenia = () =>{
    const cedula = document.getElementById("cedula").value.trim();
    return {cedula};
};


//generador de contraseni random sin hash
const  generarContrasenia = () => {
    const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
    let contrasenia = '';
    
    // Generar al menos un número
    const numeroAleatorio = Math.floor(Math.random() * 10);
    contrasenia += numeroAleatorio.toString();
    
    // Generar al menos una letra mayúscula
    const letraMayusculaAleatoria = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    contrasenia += letraMayusculaAleatoria;
    
    // Generar al menos una letra minúscula
    const letraMinusculaAleatoria = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    contrasenia += letraMinusculaAleatoria;
    
    // Generar un carácter especial
    const caracterEspecialAleatorio = caracteres[Math.floor(Math.random() * caracteres.length)];
    contrasenia += caracterEspecialAleatorio;
    
    // Completar la contraseña con caracteres aleatorios hasta llegar a la longitud deseada
    for (let i = 0; i < 4; i++) {
      const caracterAleatorio = caracteres[Math.floor(Math.random() * caracteres.length)];
      contrasenia += caracterAleatorio;
    }
    
    // Mezclar los caracteres de la contraseña
    contrasenia = contrasenia.split('').sort(function(){return 0.5-Math.random()}).join('');
    
    return contrasenia;
};

