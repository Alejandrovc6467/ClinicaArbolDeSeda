// Usuarios

//obtener una lista de todos los usuarios
const getUsuarios = () => {
    //localStorage.clear();
    var usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if(usuarios != null){
        return usuarios;
    }else{
        usuarios = [];
        return usuarios;
    }
   
};


//retorno un usuario si alguna cedula coincide
const getUsuario = (cedula) => {

    var usuarios = getUsuarios();

    for (let i = 0; i < usuarios.length; i++) {
       
        if (usuarios[i].cedula === cedula) {
            return usuarios[i];
        }
    }
   
    return null;
};

//actualizo la contrasenia de usuario (en caso de restablecimiento
const actualizarContraseniaUsuario = (cedula,  newContrasenia) => {

    console.log(cedula, "cedula que me llega a actualizar");

    var usuarios = getUsuarios();

    for (let i = 0; i < usuarios.length; i++) {

        if (usuarios[i].cedula === cedula  ) {

            usuarios[i].contrasenia = newContrasenia;
            break;

        }
    };

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
   
    return true;
};


// falta el pasar el registrar usuario que esta en registrarUsuario.html aqui, aqui deberia de estar 





// Medicos 
//retorno una lista de medicos
const getMedicos = () => {      

    medicos = [
        
            {
                "cedula": "1-2345-6789",
                "nombre": "Ana",
                "apellidos": "González",
                "telefono": "7777-8888",
                "correo": "alejandrovc6467@gmail.com",
                "especialidad": "Dermatólogo",
                "horariosConsulta": "Lunes - Viernes (8am - 4pm)",
                "contrasenia": "1e3fd52c5d3e2d3d09d90bf9262f56c79df95059382310b988f0f9448bdf119e",
                "rol": "medico",
                "biografia": "Apasionada por cuidar la piel y mejorar la salud dermatológica. Brindo atención médica profesional y personalizada."
            },
            {
                "cedula": "9-8765-4321",
                "nombre": "Luisa",
                "apellidos": "Martínez",
                "telefono": "5555-6666",
                "correo": "luisamartinez@gmail.com",
                "especialidad": "Pediatra",
                "horariosConsulta": "Lunes - Viernes (8am - 4pm)",
                "contrasenia": "1e3fd52c5d3e2d3d09d90bf9262f56c79df95059382310b988f0f9448bdf119e",
                "rol": "medico",
                "biografia": "Dedicada a brindar atención pediátrica integral. Me apasiona cuidar y promover la salud de los niños."
            },
            {
                "cedula": "8-7654-3210",
                "nombre": "Carlos",
                "apellidos": "Sánchez",
                "telefono": "3333-4444",
                "correo": "carlossanchez@gmail.com",
                "especialidad": "Psiquiatra",
                "horariosConsulta": "Lunes - Viernes (8am - 4pm)",
                "contrasenia": "1e3fd52c5d3e2d3d09d90bf9262f56c79df95059382310b988f0f9448bdf119e",
                "rol": "medico",
                "biografia": "Experto en salud mental, brindo atención profesional y empática para mejorar la calidad de vida."
            },
            {
                "cedula": "7-6543-2109",
                "nombre": "María",
                "apellidos": "López",
                "telefono": "2222-3333",
                "correo": "marialopez@gmail.com",
                "especialidad": "Oftalmólogo",
                "horariosConsulta": "Lunes - Viernes (8am - 4pm)",
                "contrasenia": "1e3fd52c5d3e2d3d09d90bf9262f56c79df95059382310b988f0f9448bdf119e",
                "rol": "medico",
                "biografia": "Apasionada por la salud ocular. Ofrezco atención oftalmológica de calidad para cuidar la visión de mis pacientes."
            },
            {
                "cedula": "6-5432-1098",
                "nombre": "Jorge",
                "apellidos": "Hernández",
                "telefono": "9999-0000",
                "correo": "jorgehernandez@gmail.com",
                "especialidad": "Ginecólogo",
                "horariosConsulta": "Lunes - Viernes (8am - 4pm)",
                "contrasenia": "1e3fd52c5d3e2d3d09d90bf9262f56c79df95059382310b988f0f9448bdf119e",
                "rol": "medico",
                "biografia": "Comprometido con la salud de las mujeres. Brindo atención ginecológica integral y promuevo el bienestar femenino."
            },
            {
                "cedula": "5-4321-0987",
                "nombre": "Pedro",
                "apellidos": "Díaz",
                "telefono": "1111-2222",
                "correo": "pedrodiaz@gmail.com",
                "especialidad": "Nutricionista",
                "horariosConsulta": "Lunes - Viernes (8am - 4pm)",
                "contrasenia": "1e3fd52c5d3e2d3d09d90bf9262f56c79df95059382310b988f0f9448bdf119e",
                "rol": "medico",
                "biografia": "Promuevo una alimentación saludable y equilibrada para mejorar la calidad de vida y prevenir enfermedades."
            },
            {
                "cedula": "4-3210-9876",
                "nombre": "Sofía",
                "apellidos": "Ramírez",
                "telefono": "6666-7777",
                "correo": "sofiaramirez@gmail.com",
                "especialidad": "Dentista",
                "horariosConsulta": "Lunes - Viernes (8am - 4pm)",
                "contrasenia": "1e3fd52c5d3e2d3d09d90bf9262f56c79df95059382310b988f0f9448bdf119e",
                "rol": "medico",
                "biografia": "Apasionada por cuidar la salud bucal. Brindo tratamientos dentales de calidad para mantener sonrisas saludables."
            },
            {
                "cedula": "3-2109-8765",
                "nombre": "Elena",
                "apellidos": "Vargas",
                "telefono": "4444-5555",
                "correo": "elenavargas@gmail.com",
                "especialidad": "Endocrinólogo",
                "horariosConsulta": "Lunes - Viernes (8am - 4pm)",
                "contrasenia": "1e3fd52c5d3e2d3d09d90bf9262f56c79df95059382310b988f0f9448bdf119e",
                "rol": "medico",
                "biografia": "Especialista en equilibrio hormonal. Brindo atención médica integral para mejorar la salud endocrina de mis pacientes."
            }
        

    ];

  
    localStorage.setItem("medicos", JSON.stringify(medicos));

    return JSON.parse(localStorage.getItem("medicos"));

};

// retorno un medico si hay alguna coincidencia con la cedula
const getMedico = (cedula) => {

    var medicos = getMedicos();

    for (let i = 0; i < medicos.length; i++) {
       
        if (medicos[i].cedula === cedula) {
            return medicos[i];
        }
    }
   
    return null;
};

// actualizo la contrasenia en caso de restablecimiento
const actualizarContraseniaMedico = (cedula,  newContrasenia) => {

    console.log(cedula, "cedula que me llega a actualizar");

    var medicos = getMedicos();

    for (let i = 0; i < medicos.length; i++) {

        if (medicos[i].cedula === cedula  ) {

            medicos[i].contrasenia = newContrasenia;
            break;

        }
    };

    localStorage.setItem("medicos", JSON.stringify(medicos));
   
    return true;
};






// citas

// obtengo una lista de citas
const getCitas = () => {

    //localStorage.clear();
    var citas = JSON.parse(localStorage.getItem("citas"));
    if(citas != null){
       return citas;
    }else{
       citas = [];
       return citas;
    }
};


//obtengo todas las citas de un usurio
const getCitasUsuario = (cedula, fecha) => {

    var citas = getCitas();

    var citasRetornar = [];

    for (let i = 0; i < citas.length; i++) {
       
        if (citas[i].usuarioCedula === cedula && citas[i].fecha === fecha) {
            citasRetornar.push(citas[i]);
        }
    }
   
    return citasRetornar;

};

//obtengo una cita por el id
const getCitaById = (id) => {

    var citas = getCitas();

    for (let i = 0; i < citas.length; i++) {
       
        if (citas[i].id === id) {
            return  citas[i];
        }
    };

    return false;

};

//verifico la existencia de cita en fecha y hora
const verificarExistenciaCitaEseDiaUsuario = (cedula, fecha) => {

    var citas = getCitas();

    for (let i = 0; i < citas.length; i++) {
       
        if (citas[i].usuarioCedula === cedula && citas[i].fecha === fecha) {
            return true;
        }
    }
   
    return false;

};

//retorna una lista de todas las citas del medico
const getCitasMedico = (cedula, fecha) => {

    var citas = getCitas();

    var citasRetornar = [];

    for (let i = 0; i < citas.length; i++) {
       
        if (citas[i].cedulaMedico === cedula && citas[i].fecha === fecha) {
            citasRetornar.push(citas[i]);
        }
    }
   
    return citasRetornar;

};


//verifico la existencia de cita en fecha y hora
const verificarExistenciaCitaEseDiaMedico = (cedula, fecha) => {

    var citas = getCitas();

    for (let i = 0; i < citas.length; i++) {
       
        if (citas[i].cedulaMedico === cedula && citas[i].fecha === fecha) {
            return true;
        }
    }
   
    return false;


};

// agrega una nueva cita
const setCita = (usuarioCedula,fecha, hora, especialidad, cedulaMedico) => {

    var citas = getCitas();
    
    var medicoCita = getMedico(cedulaMedico);

    var identificador = getIndentificadorCita();

    incrementarIndentificadorCita();

        
    const nuevaCita = {
        id: identificador,
        usuarioCedula: usuarioCedula,
        fecha: fecha,
        hora: hora,
        especialidad: especialidad,
        cedulaMedico: cedulaMedico,
        nombreMedico: medicoCita.nombre,
        estado: "Pendiente"
    };
    
    citas.push(nuevaCita);
    
    localStorage.setItem("citas", JSON.stringify(citas));

    return true;
       
};



// actualiza la cita segun los parametros
const updateCita = (idCita,  hora, especialidad, cedulaMedico) => {

    console.log(idCita, "id que me llega");

    var medico = getMedico(cedulaMedico);
  
    var citas = getCitas();

    for (let i = 0; i < citas.length; i++) {

        if (citas[i].id === parseInt(idCita) ) {
           citas[i].hora = hora;
           citas[i].especialidad = especialidad;
           citas[i].cedulaMedico = cedulaMedico;
           citas[i].nombreMedico = medico.nombre;
           citas[i].estado = "Pendiente";
           break;
        }
    };

    localStorage.setItem("citas", JSON.stringify(citas));
   
    return true;
};




// verifica el horario de cita
const verifcarHorarioDeCita = (fecha, hora, medico ) => {

    //validar que no agende citas a la misma hora del mismo dia, asi sea con otro medico

    var citas = getCitas();

    for (let i = 0; i < citas.length; i++) {
       
        if (citas[i].fecha === fecha && citas[i].hora === hora && citas[i].cedulaMedico === medico) {
            return false;
        }
    }
   
    return true;

};


//actualiza el estado  de la cita
const actualizarEstadoCita = (id) => {

    var citas = getCitas();

    var resultado;

    for (let i = 0; i < citas.length; i++) {
       
        if (citas[i].id === id) {

            if(citas[i].estado === "Pendiente"){
                citas[i].estado = "Aprobado";
                resultado = true;
                
            }else{
                citas[i].estado = "Pendiente";
                resultado = false;
            }
           
        }
    }


    localStorage.setItem("citas", JSON.stringify(citas));

    return resultado;
    
};


// eliminar la cita segun el id
const eliminarCita = (id) => {

    var citas = getCitas();

    for (let i = 0; i < citas.length; i++) {
       
        if (citas[i].id === id) {

            citas.splice(i,1);

            break;
        }
    }


    localStorage.setItem("citas", JSON.stringify(citas));

    return true;
    
};





// userSessionSessionStorage y userSessionLocalStorage

// obtengo la variable de sesion del storage
const getSessionStorageUser = () => {

    var userSessionSessionStorage = []; 
    userSessionSessionStorage =  JSON.parse(sessionStorage.getItem("sesionUser"));

    return userSessionSessionStorage.cedula;

};

// obtengo la variable de sesion del local storage
const getLocalStorageUser = () => {

    var userLocalSessionStorage = []; 
    userLocalSessionStorage =  JSON.parse(localStorage.getItem("sesionUser"));
    return userLocalSessionStorage.cedula;

};



// generador de primary key para las citas
const getIndentificadorCita = () => {

    var identificadorCita = JSON.parse(localStorage.getItem("identificadorCita"));

    if(identificadorCita != null){
        return identificadorCita.id;
    }else{
        localStorage.setItem("identificadorCita", JSON.stringify({id:1}));
        identificadorCita = JSON.parse(localStorage.getItem("identificadorCita"));
        return identificadorCita.id;
    }
};

//incrementa el contador del generador
const incrementarIndentificadorCita = () => {
    var identificadorCita = JSON.parse(localStorage.getItem("identificadorCita"));
    var nuevoIdentificador = identificadorCita.id +1;
    localStorage.setItem("identificadorCita", JSON.stringify({id:nuevoIdentificador}));
};


