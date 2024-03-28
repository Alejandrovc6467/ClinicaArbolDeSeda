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
            "contrasenia": "1!Aaaaaa",
            "rol": "medico"
        },
        {
            "cedula": "3-0504-0265",
            "nombre": "María",
            "apellidos": "Gómez",
            "telefono": "6666-5555",
            "correo": "mariagomez@gmail.com",
            "especialidad": "Psicólogo",
            "contrasenia": "1!Aaaaaa",
            "rol": "medico"
        },
        {
            "cedula": "3-0504-0975",
            "nombre": "Carlos",
            "apellidos": "Martínez",
            "telefono": "4444-7777",
            "correo": "carlosmartinez@gmail.com",
            "especialidad": "Neurólogo",
            "contrasenia": "1!Aaaaaa",
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


const setCita = (usuarioCedula,fecha, hora, especialidad, medico) => {

    if(verifcarHorarioDeCita(fecha, hora)){

        var citas = getCitas();
        
        const nuevaCita = {
            usuarioCedula: usuarioCedula,
            fecha: fecha,
            hora: hora,
            especialidad: especialidad,
            medico: medico,
            estado: "pendiente"
        };
    
        citas.push(nuevaCita);
    
        localStorage.setItem("citas", JSON.stringify(citas));

        return true;
       
    }else{
        return false;
    }
 
};


const verifcarHorarioDeCita = (fecha, hora, medico ) => {

    var citas = getCitas();

    for (let i = 0; i < citas.length; i++) {
       
        if (citas[i].fecha === fecha && citas[i].hora === hora && citas[i].medico === medico) {
            return false;
        }
    }
   
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