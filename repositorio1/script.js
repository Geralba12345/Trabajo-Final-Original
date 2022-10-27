//Clase constructora
class Jugador {
  constructor(nombre, equipo, posición, imagen){
      this.nombre = nombre
      this.equipo = equipo
      this.posición = posición
      this.imagen = imagen
  }
}

//Calculador con su botón y su función
let btnMostrarData = document.getElementById("mostrarData")
btnMostrarData.addEventListener("click", ()=>{
  calculador()
})

function calculador(){
let puntosRealizados = parseInt(prompt("Ingrese los puntos que realizó el jugador"))
let partidosJugados = parseInt(prompt("Ingrese la cantidad de partidos jugados"))
let promedioPuntos = puntosRealizados / partidosJugados
if (promedioPuntos < 30){
  Swal.fire({
    title: `Su jugador tiene ${promedioPuntos} puntos por partido.`,
    text: `Con este promedio su jugador no será considerado para el MVP`,
    imageUrl: `assets/JamesLlorando.jpg`,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
    confirmButtonColor: "blue",
    color: "red",
  })
}else{
  Swal.fire({
    title: `Su jugador tiene ${promedioPuntos} puntos por partido.`,
    text: `Puede ser considerado para el MVP`,
    imageUrl: `assets/JamesRiendo.jpg`,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
    confirmButtonColor: "blue",
    color: "red",

  })
}
}

//Se comentó la clase constructora para no generar problemas pero la dejo para que sea evaluada

//const jug1 = new Jugador ("Sthephen Curry", "Golden State Warriors", "Base", "Curry.jpg")
//const jug2 = new Jugador ("Donovan Mitchell", "Utah Jazz", "Escolta", "Mitchell.jpg")
//const jug3 = new Jugador ("LeBron James", "Los Ángeles Lakers", "Alero","James.jpg")
//const jug4 = new Jugador ("Zion Williamson", "New Orleans Pelicans", "Ala-Pívot","Williamson.jpg")
//const jug5 = new Jugador ("Joel Embiid", "Philadelphia 76ers", "Pívot", "Embiid.jpg")


//Acá se utiliza un fetch asincrónico con la info de jugadores.json, se puede notar porque los apellidos
//de una info y la otra son distintos

const cargarJugadores = async() =>{
const respuesta = await fetch("jugadores.json")
const info = await respuesta.json()
console.log(info)
for(let juga of info){
  let jugaNuevo = new Jugador (juga.nombre, juga.equipo, juga.posición, juga.imagen)
  destacados.push(jugaNuevo)
}
}

cargarJugadores()


let destacados = []

//Se comentó este operador ternario para no generar problemas

//localStorage.getItem("destacados") ? destacados = JSON.parse(localStorage.getItem("destacados")) : destacados.push(jug1,jug2,jug3,jug4,jug5)
//localStorage.setItem("destacados", JSON.stringify(destacados))


//Funciones para agregar, mostrar y ocultar jugadores

let divJugadores = document.getElementById("jugadores")


function mostrarJugadores(destacados){
divJugadores.innerHTML=""
destacados.forEach((Jugador) => {
  let nuevoJugador = document.createElement("div")
  nuevoJugador.innerHTML = `<div class="card" style="width: 18rem;">
  <img src="assets/${Jugador.imagen}" class="card-img-top" alt="${Jugador.nombre}">
  <div class="card-body">
    <h5 class="card-title">${Jugador.nombre}</h5>
    <p class="card-text">${Jugador.equipo} - ${Jugador.posición}</p>
    <button type="button" class="btn btn-primary btnMostrar">Ver estadísticas</button>
  </div>
</div>`
divJugadores.append(nuevoJugador)
let btnMuestra = document.getElementsByClassName("btnMostrar")
for (let muestra of btnMuestra){
  muestra.addEventListener("click", () => {
    Swal.fire({
      title: `Este jugador está nominado al MVP`,
      text: `El ganador se conocerá a final de temporada`,
      imageUrl: `assets/JugadorAgregado.jpg`,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      confirmButtonColor: "blue",
      color: "red",
    })
    })

}



})

}




function jugadorAgregado (destacados) {
let jugadorIngresado = prompt("Ingrese su candidato al MVP")
let equipoIngresado = prompt("Ingrese el equipo en el que juega")
let posiciónIngresada = prompt ("Ingrese la posición en la que juega")
let jugadorCreado = new Jugador (jugadorIngresado, equipoIngresado, posiciónIngresada)
destacados.push(jugadorCreado)
}

function guardarJugador (destacados){
let jugInput = document.getElementById("jugadorInput")
let equInput = document.getElementById("equipoInput")
let posInput = document.getElementById("posiciónInput")
let jugadorCreado = new Jugador (jugInput.value, equInput.value, posInput.value, "JugadorAgregado.jpg")
destacados.push(jugadorCreado)
localStorage.setItem("destacados", JSON.stringify(destacados))
console.log(destacados)
jugInput.value = ""
equInput.value = ""
posInput.value = ""
}


//Manipulación de HTML

let btnGuardar = document.getElementById("guardarJugadorBtn")
btnGuardar.addEventListener("click", ()=>{
guardarJugador(destacados)
Toastify({
  text: "Tu jugador se agregó correctamente",
  duration: 2000,
  gravity: "bottom", 
  position: "center", 
  style: {
    background: "linear-gradient(to right, red, white, blue)",
    color: "black"
  },
  onClick: function(){}
}).showToast();

})

let bntMostrarCatalogo = document.getElementById("mostrarJugadores")
bntMostrarCatalogo.addEventListener("click", ()=>{
mostrarJugadores(destacados)
})

function ocultarCatalogo(){
divJugadores.innerHTML = ""
}

let btnOcultarCatalogo = document.getElementById("ocultarJugadores")
btnOcultarCatalogo.addEventListener("click", ()=>{
ocultarCatalogo()
})

//Si bien no se utilizó en la manipulacoón de la página se utilizó el local storage para incorporar conceptos

localStorage.setItem("nombre", "Stephen Curry")
localStorage.setItem("equipo", "Golden State Warriors")
localStorage.setItem("posición", "Base")

let equipoJugador = localStorage.getItem("equipo")


let posiciónJugador = localStorage.getItem("posición")


localStorage.setItem("miArray", destacados)

let arr = localStorage.getItem("miArray")


localStorage.removeItem("equipo")

let btnBlueMode = document.getElementById("botonBlueMode")
let btnRedMode = document.getElementById("botonRedMode")
let btnWhiteMode = document.getElementById("botonWhiteMode")

let modoRojo

localStorage.getItem("blueMode") ? modoRojo = localStorage.getItem("blueMode") : localStorage.setItem("blueMode", false)
if(modoRojo == "true"){
document.body.style.backgroundColor = "blue"
document.body.style.color = "black"
}else{
document.body.style.backgroundColor = "white"
document.body.style.color = "black"
}

//Utilización de eventos

btnBlueMode.addEventListener("click", ()=>{
console.log("Funciona boton azul")
document.body.style.backgroundColor = "blue"
document.body.style.color = "black"
localStorage.setItem("blueMode", true)
})
btnRedMode.addEventListener("click", ()=>{
console.log("Funciona boton rojo")
document.body.style.backgroundColor = "red"
document.body.style.color = "black"
localStorage.setItem("blueMode", false)
})
btnWhiteMode.addEventListener("click", ()=>{
console.log("Funciona boton blanco")
document.body.style.backgroundColor = "white"
document.body.style.color = "black"
localStorage.setItem("blueMode", false)
})

let jugador1JSON = JSON.stringify(jug1)
localStorage.setItem("objetoJugadorJSON", jugador1JSON)

let jugadorStorageJSON = JSON.parse(localStorage.getItem("objetoJugadorJSON")) || []

//Utilización de conceptos del curso pero que no tienen manipulación en la página

const {nombre,equipo} = jug1


const {nombre:player, equipo:team, posición:position} = jug4



let [a,b,c] = destacados


const jugInfo1 = {
...jug1,
zapatillas: "Under Armor",
títulos: 4,
premios: 2

}
const jugInfo2 = {
...jug2,
zapatillas: "Adidas",
títulos: 0,
premios: 0

}

const jugInfo3 = {
...jug3,
zapatillas: "Nike",
títulos: 4,
premios: 4

}

const jugInfo4 = {
...jug4,
zapatillas: "Nike",
títulos: 0,
premios:0

}

const jugInfo5 = {
...jug5,
zapatillas: "Air Jordan",
títulos: 0,
premios: 0

}








































