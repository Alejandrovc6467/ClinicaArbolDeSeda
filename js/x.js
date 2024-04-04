



const nodemailer = require("nodemailer");



const enviarEmail =  async () => {


    const configuracion = {
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "alejandrovc177@gmail.com",
          pass: "xbwm zrys zvbq isrh",
        }
    };

    const email = {

        from: 'alejandrovc177@gmail.com', // sender address
        to: "alejandrovc6467@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>html camilo</b>", // html body

    };

    const transporter  = nodemailer.createTransport(configuracion);
    const respuesta = await transporter.sendMail(email);

    console.log(respuesta);

};


enviarEmail();













