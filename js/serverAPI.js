// Usuarios
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


const getUsuario = (cedula) => {

    var usuarios = getUsuarios();

    for (let i = 0; i < usuarios.length; i++) {
       
        if (usuarios[i].cedula === cedula) {
            return usuarios[i];
        }
    }
   
    return null;
};


// falta el pasar el registrar usuario que esta en registrarUsuario.html aqui, aqui deberia de estar 





// Medicos 
const getMedicos = () => {

    medicos =[
        { 
            "cedula": "3-0504-0220",
            "nombre": "Juan",
            "apellidos": "Pérez",
            "telefono": "8888-9999",
            "correo": "juanperez@gmail.com",
            "especialidad": "Cardiólogo",
            "contrasenia": "1e3fd52c5d3e2d3d09d90bf9262f56c79df95059382310b988f0f9448bdf119e",
            "rol": "medico"
        },
        {
            "cedula": "3-0504-0265",
            "nombre": "María",
            "apellidos": "Gómez",
            "telefono": "6666-5555",
            "correo": "mariagomez@gmail.com",
            "especialidad": "Psicólogo",
            "contrasenia": "1e3fd52c5d3e2d3d09d90bf9262f56c79df95059382310b988f0f9448bdf119e",
            "rol": "medico"
        },
        {
            "cedula": "3-0504-0975",
            "nombre": "Carlos",
            "apellidos": "Martínez",
            "telefono": "4444-7777",
            "correo": "carlosmartinez@gmail.com",
            "especialidad": "Neurólogo",
            "contrasenia": "1e3fd52c5d3e2d3d09d90bf9262f56c79df95059382310b988f0f9448bdf119e",
            "rol": "medico"
        },
        {
            "cedula": "3-0504-5124",
            "nombre": "Alberto",
            "apellidos": "Luna",
            "telefono": "6467-0187",
            "correo": "albertoluna@gmail.com",
            "especialidad": "Neurólogo",
            "contrasenia": "1e3fd52c5d3e2d3d09d90bf9262f56c79df95059382310b988f0f9448bdf119e",
            "rol": "medico"
        }
    
    ];

  
    localStorage.setItem("medicos", JSON.stringify(medicos));

    return JSON.parse(localStorage.getItem("medicos"));

};


const getMedico = (cedula) => {

    var medicos = getMedicos();

    for (let i = 0; i < medicos.length; i++) {
       
        if (medicos[i].cedula === cedula) {
            return medicos[i];
        }
    }
   
    return null;
};







// citas
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


const getCitaById = (id) => {

    var citas = getCitas();

    for (let i = 0; i < citas.length; i++) {
       
        if (citas[i].id === id) {
            return  citas[i];
        }
    };

    return false;

};


const verificarExistenciaCitaEseDiaUsuario = (cedula, fecha) => {

    var citas = getCitas();

    for (let i = 0; i < citas.length; i++) {
       
        if (citas[i].usuarioCedula === cedula && citas[i].fecha === fecha) {
            return true;
        }
    }
   
    return false;

};


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



const verificarExistenciaCitaEseDiaMedico = (cedula, fecha) => {

    var citas = getCitas();

    for (let i = 0; i < citas.length; i++) {
       
        if (citas[i].cedulaMedico === cedula && citas[i].fecha === fecha) {
            return true;
        }
    }
   
    return false;


};


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



// en proceso
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



const actualizarEstadoCita = (id) => {

    var citas = getCitas();

    for (let i = 0; i < citas.length; i++) {
       
        if (citas[i].id === id) {

            if(citas[i].estado === "Pendiente"){
                citas[i].estado = "Aprobado";
            }else{
                citas[i].estado = "Pendiente";
            }
           
        }
    }


    localStorage.setItem("citas", JSON.stringify(citas));

    return true;
    
};



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

const getSessionStorageUser = () => {

    var userSessionSessionStorage = []; 
    userSessionSessionStorage =  JSON.parse(sessionStorage.getItem("sesionUser"));

    return userSessionSessionStorage.cedula;

};


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

const incrementarIndentificadorCita = () => {
    var identificadorCita = JSON.parse(localStorage.getItem("identificadorCita"));
    var nuevoIdentificador = identificadorCita.id +1;
    localStorage.setItem("identificadorCita", JSON.stringify({id:nuevoIdentificador}));
};


