import './styles.css'

const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", cargarClima);
});

function cargarClima(e) {
  e.preventDefault();
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    mensajeError("Campos Incompletos");
    return;
  }

  //console.log(ciudad, pais);
  estadoApi(ciudad, pais);
}

function estadoApi(ciudad, pais) {
  const lenguage = "es";
  const key = "bbcc1c98e580461666e7681d2ea66f3d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${key}&lang=${lenguage}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((datos) => {
      if (datos.cod === "404") {
        mensajeError("La ciudad no existe");
        return;
      }

      console.log(datos);
      mostrarClimaHtml(datos);
    }).catch(error => {
      //console.log("error");
    });
}

function mensajeError(mensaje) {

  const alerta = document.querySelector('.alerta')

  if (!alerta) {
    const alerta = document.createElement("div");
    alerta.classList.add(
      "bg-red-100",
      "border-red-700",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center",
      "width",
      'alerta',
      "col-span-12"
    );

    alerta.innerHTML = `
            <strong class='font-bold'>Error!</strong>
            <span class='block'>${mensaje}</span>
        `;

    container.appendChild(alerta);

    //Elimina alerta
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function mostrarClimaHtml(datos) {
  limpiarHTML();
  const {
    name,
    sys:{country},
    main: { temp, temp_min, temp_max},
    weather,
  } = datos;
  const { description } = weather[0];
  const { icon } = weather[0];



  const nombreCiudad = document.createElement("p");
  const tempActual = document.createElement("p");
  const tempMin = document.createElement("p");
  const tempMax = document.createElement("p");
  const sensacion = document.createElement("p");
  const humedad = document.createElement("p");
  const descripcion = document.createElement("p");
  const icono = document.createElement("img");

  nombreCiudad.textContent = `${name} - ${country}`;
  tempActual.innerHTML = `${parseInt(temp)} &#8451`;
  tempMax.innerHTML = `Max: ${parseInt(temp_max)} &#8451`;
  tempMin.innerHTML = `Min: ${parseInt(temp_min)} &#8451`;
  tempMax.classList.add("text-2xl");
  tempMin.classList.add("text-2xl");
  icono.src = `../src/assets/icon/${icon}.svg`
  icono.classList.add('mx-auto', "w-1/5")
  descripcion.textContent = `${capitalizarPrimeraLetra(description)}`
  descripcion.classList.add("text-1xl")

  //Div para parametros
  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-white", "text-center", "mt-2", "text-4xl");
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(descripcion);
  resultadoDiv.appendChild(tempActual);
  resultadoDiv.appendChild(icono);
  resultadoDiv.appendChild(tempMax);
  resultadoDiv.appendChild(tempMin);

  //Agregando div a resultados
  resultado.appendChild(resultadoDiv);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}