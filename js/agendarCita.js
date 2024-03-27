
//obtener variables de session para colocarlas en la bienvenida
const getNombreApellidosVariablesDeSesion = () => {

    var userSessionSessionStorage = []; 
    userSessionSessionStorage =  JSON.parse(sessionStorage.getItem("sesionUser"));

    var datosUser = getUsuario(userSessionSessionStorage.cedula);

    var bienvenida_nameUser = document.getElementById("bienvenida_nameUser");

    var nombreApellidos = datosUser.nombre + " " +datosUser.apellidos;

    bienvenida_nameUser.textContent = nombreApellidos;
}


getNombreApellidosVariablesDeSesion();









/* Calendario settings **************************************************************/

const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");

const months = [
  "Enero",
  "February",
  "Marzo",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();


function renderCalendar() {

  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  // "li" dias inactivos de inicio, porque pertenecen al mes anterior
  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }


  for (let i = 1; i <= endDate; i++) {
    
    let className = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()  ? ' class="today"' : "";
    //datesHtml += `<li${className}>${i}</li>`;
    datesHtml += `<li id="date-${i}"${className} onclick="abrirFecha(${year}, ${month}, ${i})">${i}</li>`;
  }


  // "li" dias inactivos de final, porque pertenecen al mes siguiente
  for (let i = end; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;

};


navs.forEach((nav) => {
   nav.addEventListener("click", (e) => {
        const btnId = e.target.id;

        if (btnId === "prev" && month === 0) {
        year--;
        month = 11;
        } else if (btnId === "next" && month === 11) {
        year++;
        month = 0;
        } else {
        month = btnId === "next" ? month + 1 : month - 1;
        }

        date = new Date(year, month, new Date().getDate());
        year = date.getFullYear();
        month = date.getMonth();

        renderCalendar();
    });

});

renderCalendar();


function abrirFecha(year, month, day) {

  // SUMPER IMPORTANTE, vea que le estoy agregando un mas al mes, es porque 
  console.log("Clicked on date:", year, month+1, day);
  // Aquí puedes agregar cualquier lógica que necesites al hacer clic en una fecha

};

