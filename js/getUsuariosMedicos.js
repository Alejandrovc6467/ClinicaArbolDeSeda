
// Usuarios
const getLocalStorageUsuarios = () => {
    //localStorage.clear();
    return JSON.parse(localStorage.getItem("usuarios"));
};


const getUsuario = (cedula) => {

    var usuarios = getLocalStorageUsuarios();

    for (let i = 0; i < usuarios.length; i++) {
       
        if (usuarios[i].cedula === cedula) {
            return usuarios[i];
        }
    }
   
    return null;
};






//Medicos
const getMedicos = () => {

    medicos =[
        { 
            "cedula": "3-0504-0653",
            "nombre": "Juan",
            "apellidos": "Pérez",
            "telefono": "8888-9999",
            "correo": "juanperez@gmail.com",
            "especialidad": "Cardiólogo",
            "contrasenia": "1!Aaaaaa"
        },
        {
            "cedula": "3-0504-0650",
            "nombre": "María",
            "apellidos": "Gómez",
            "telefono": "6666-5555",
            "correo": "mariagomez@gmail.com",
            "especialidad": "Psicólogo",
            "contrasenia": "1!Aaaaaa"
        },
        {
            "cedula": "3-0504-0652",
            "nombre": "Carlos",
            "apellidos": "Martínez",
            "telefono": "4444-7777",
            "correo": "carlosmartinez@gmail.com",
            "especialidad": "Neurólogo",
            "contrasenia": "1!Aaaaaa"
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




// faltan las citas