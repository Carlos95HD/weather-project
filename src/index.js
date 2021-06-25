import "./styles.css";

const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", cargarClima);
});

function cargarClima(e) {
  e.preventDefault();
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;
  limpiarHTML();
  if (ciudad === "" || pais === "") {
    mensajeError("Campos Incompletos");
    return;
  }
  spinner();
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
        limpiarHTML();
        mensajeError("La ciudad no existe");
        return;
      }
      mostrarClimaHtml(datos);
    });
}

function mensajeError(mensaje) {
  const alerta = document.querySelector(".alerta");

  if (!alerta) {
    const alerta = document.createElement("div");
    alerta.classList.add(
      "bg-red-100",
      "border-red-700",
      "text-red-700",
      "px-6",
      "py-4",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center",
      "h-20",
      "w-3/6",
      "alerta",
      "col-span-12",
      "font-monserrat"
    );

    alerta.innerHTML = `
            <strong class='font-bold text-sm lg:text-base'>Error</strong>
            <span class='block text-sm lg:text-base'>${mensaje}</span>
        `;

    resultado.append(alerta);
  }
}

function mostrarClimaHtml(datos) {
  limpiarHTML();
  const {
    name,
    id,
    sys: { country },
    main: { temp, temp_min, temp_max },
    weather,
  } = datos;
  const { description } = weather[0];
  const { icon } = weather[0];

  //Creación de datos
  const nombreCiudad = document.createElement("p");
  const tempActual = document.createElement("p");
  const tempMin = document.createElement("p");
  const tempMax = document.createElement("p");
  const descripcion = document.createElement("p");
  const icono = document.createElement("img");
  const pronostico_completo = document.createElement("a");

  nombreCiudad.textContent = `${name} - ${country}`;
  nombreCiudad.className = "text-2xl"
  tempActual.innerHTML = `${parseInt(temp)} &#8451`;
  tempActual.className = "font-monserrat-400 text-4xl sm:text-6xl";
  tempMax.innerHTML = `Max Actual: ${parseInt(temp_max)} &#8451`;
  tempMin.innerHTML = `Min Actual: ${parseInt(temp_min)} &#8451`;
  tempMax.classList.add("text-lg", "font-monserrat-300", "sm:text-xl");
  tempMin.classList.add("text-lg", "font-monserrat-300", "sm:text-xl");
  icono.src = `./assets/icon/${icon}.svg`;
  icono.classList.add("mx-auto", "sm:w-44","w-32");
  descripcion.textContent = `${capitalizarPrimeraLetra(description)}`;
  descripcion.classList.add("text-3xl", "sm:text-4xl");
  pronostico_completo.href = `https://openweathermap.org/city/${id}`;
  pronostico_completo.target = "_blank";
  pronostico_completo.innerHTML = `Ver pronostico completo`;
  pronostico_completo.className =
    "font-monserrat-200 text-lg transition duration-500 hover:text-yellow-200";

  //Preparación de datos
  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add(
    "text-white",
    "text-center",
    "mt-16",
    "text-4xl",
    "font-monserrat"
  );
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(tempActual);
  resultadoDiv.appendChild(icono);
  resultadoDiv.appendChild(descripcion);
  resultadoDiv.appendChild(tempMax);
  resultadoDiv.appendChild(tempMin);
  resultadoDiv.appendChild(pronostico_completo);

  //Añadiendo resultados
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

function spinner() {
  const div_spinner = document.createElement("div");
  div_spinner.classList = "spinner mx-auto";
  div_spinner.innerHTML = `<div class="rect1"></div>
                          <div class="rect2"></div>
                          <div class="rect3"></div>
                          <div class="rect4"></div>
                          <div class="rect5"></div>`;
  resultado.append(div_spinner);
}

const year = new Date().getFullYear();
const yearHtml = document.querySelector('#reserved');
yearHtml.innerHTML = `&copy; ${year} - All rights reserved`