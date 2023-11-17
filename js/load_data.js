import {tiempoArr, precipitacionArr, uvArr, temperaturaArr} from './static_data.js';

let fechaActual = () => new Date().toISOString().slice(0,10);
console.log(fechaActual)

let cargarPrecipitacion = () => {

    //Obtenga la función fechaActual
    let actual = fechaActual();
    //Defina un arreglo temporal vacío
    let datos  = [];
    /*Itere en el arreglo tiempoArr para filtrar los valores de 
    precipitacionArr que sean igual con la fecha actual*/
    for (let index = 0; index < tiempoArr.length; index++) {
        const tiempo = tiempoArr[index];
        const precipitacion = precipitacionArr[index]
    
        if(tiempo.includes(actual)) {
          datos.push(precipitacion)
        }
      }
    //Con los valores filtrados, obtenga los valores máximo, promedio y mínimo
    let max = Math.max(...datos) //Extender elementos de los arreglos las desempaqueta a cada elemento
    let min = Math.min(...datos)
    let sum = datos.reduce((a, b) => a + b, 0); // Hace callback, el primer argumento es un acumulador y el segundo el valor
    let prom = (sum / datos.length) || 0; // si abajo es 0 se utiliza el 0

    //Obtenga la referencia a los elementos HTML con id precipitacionMinValue, precipitacionPromValue y precipitacionMaxValue
    let precipitacionMinValue = document.getElementById("precipitacionMinValue")
    let precipitacionPromValue = document.getElementById("precipitacionPromValue")
    let precipitacionMaxValue = document.getElementById("precipitacionMaxValue")
    //Actualice los elementos HTML con los valores correspondientes
    precipitacionMinValue.textContent = `Min ${min} [mm]`
    precipitacionPromValue.textContent = `Prom ${ Math.round(prom * 100) / 100 } [mm]`
    precipitacionMaxValue.textContent = `Max ${max} [mm]`
}

let cargarUV = () => {

  //Obtenga la función fechaActual
  let actual = fechaActual();
  //Defina un arreglo temporal vacío
  let datos  = [];
  /*Itere en el arreglo tiempoArr para filtrar los valores de 
  precipitacionArr que sean igual con la fecha actual*/
  for (let index = 0; index < tiempoArr.length; index++) {
      const tiempo = tiempoArr[index];
      const UV = uvArr[index]
  
      if(tiempo.includes(actual)) {
        datos.push(UV)
      }
    }
  //Con los valores filtrados, obtenga los valores máximo, promedio y mínimo
  let max = Math.max(...datos) //Extender elementos de los arreglos las desempaqueta a cada elemento
  let min = Math.min(...datos)
  let sum = datos.reduce((a, b) => a + b, 0); // Hace callback, el primer argumento es un acumulador y el segundo el valor
  let prom = (sum / datos.length) || 0; // si abajo es 0 se utiliza el 0

  //Obtenga la referencia a los elementos HTML con id precipitacionMinValue, precipitacionPromValue y precipitacionMaxValue
  let UVnMinValue = document.getElementById("uvMinValue")
  let UVPromValue = document.getElementById("uvPromValue")
  let UVMaxValue = document.getElementById("uvMaxValue")
  //Actualice los elementos HTML con los valores correspondientes
  UVnMinValue.textContent = `Min ${min} [mm]`
  UVPromValue.textContent = `Prom ${ Math.round(prom * 100) / 100 } [mm]`
  UVMaxValue.textContent = `Max ${max} [mm]`
}

let cargarTemperatura = () => {

  //Obtenga la función fechaActual
  let actual = fechaActual();
  //Defina un arreglo temporal vacío
  let datos  = [];
  /*Itere en el arreglo tiempoArr para filtrar los valores de 
  precipitacionArr que sean igual con la fecha actual*/
  for (let index = 0; index < tiempoArr.length; index++) {
      const tiempo = tiempoArr[index];
      const temperatura = temperaturaArr[index]
  
      if(tiempo.includes(actual)) {
        datos.push(temperatura)
      }
    }
  //Con los valores filtrados, obtenga los valores máximo, promedio y mínimo
  let max = Math.max(...datos) //Extender elementos de los arreglos las desempaqueta a cada elemento
  let min = Math.min(...datos)
  let sum = datos.reduce((a, b) => a + b, 0); // Hace callback, el primer argumento es un acumulador y el segundo el valor
  let prom = (sum / datos.length) || 0; // si abajo es 0 se utiliza el 0

  //Obtenga la referencia a los elementos HTML con id precipitacionMinValue, precipitacionPromValue y precipitacionMaxValue
  let temperaturanMinValue = document.getElementById("temperaturaMinValue")
  let temperaturaPromValue = document.getElementById("temperaturaPromValue")
  let temperaturaMaxValue = document.getElementById("temperaturaMaxValue")
  //Actualice los elementos HTML con los valores correspondientes
  temperaturanMinValue.textContent = `Min ${min} [mm]`
  temperaturaPromValue.textContent = `Prom ${ Math.round(prom * 100) / 100 } [mm]`
  temperaturaMaxValue.textContent = `Max ${max} [mm]`
}



let cargarFechaActual = () => {
  
    //Obtenga la referencia al elemento h6
    let coleccionHTML = document.getElementsByTagName("h5")

    let tituloH5 = coleccionHTML[0]
    //Actualice la referencia al elemento h6 con el valor de la función fechaActual()
    tituloH5.textContent = fechaActual()
  }


let cargarOpenMeteo = () => {

  //URL que responde con la respuesta a cargar
  let URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m&timezone=auto&forecast_days=1'; 

  fetch( URL )
    .then(responseText => responseText.json())
    .then(responseJSON => {
      
      console.log(responseJSON);
        
      //Respuesta en formato JSON

      //Referencia al elemento con el identificador plot
      let plotRef = document.getElementById('plot1');

      //Etiquetas del gráfico
      let labels = responseJSON.hourly.time;

      //Etiquetas de los datos
      let data = responseJSON.hourly.temperature_2m;

      //Objeto de configuración del gráfico
      let config = {
        type: 'line',
        data: {
          labels: labels, 
          datasets: [
            {
              label: 'Temperature [2m]',
              data: data, 
            }
        ],
      },
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Line Chart'
              }
          }
        };

      //Objeto con la instanciación del gráfico
      let chart1  = new Chart(plotRef, config);

    })
    .catch(console.error);

}

function rand(min, max) {
  min = valueOrDefault(min, 0);
  max = valueOrDefault(max, 0);
  _seed = (_seed * 9301 + 49297) % 233280;
  return min + (_seed / 233280) * (max - min);
}

let cargarOpenMeteo2 = () => {

  //URL que responde con la respuesta a cargar
  let URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=precipitation_probability&timezone=auto&forecast_days=1'
  fetch( URL )
    .then(responseText => responseText.json())
    .then(responseJSON => {
      
      console.log(responseJSON);
        
      //Respuesta en formato JSON

      //Referencia al elemento con el identificador plot
      let plotRef2 = document.getElementById('plot2');

      //Etiquetas del gráfico
      let labels = responseJSON.hourly.time;

      //Etiquetas de los datos
      let data = responseJSON.hourly.precipitation_probability;

      //Objeto de configuración del gráfico
      let config = {
        type: 'bar',
        data: {
          labels: labels, 
          datasets: [
            {
              label: 'Probabilidad de lluvia',
              data: data,
              backgroundColor: 'rgb(255, 99, 132)'
            }
        ],
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Floating Bar Chart'
        }
      }
    };
      //Objeto con la instanciación del gráfico
      let chart2  = new Chart(plotRef2, config);

    })
    .catch(console.error);

}

let parseXML = (responseText) => {
  
  // Parsing XML
  const parser = new DOMParser();
  const xml = parser.parseFromString(responseText, "application/xml");

  // Referencia al elemento `#forecastbody` del documento HTML

  let forecastElement = document.querySelector("#forecastbody")
  forecastElement.innerHTML = ''

  // Procesamiento de los elementos con etiqueta `<time>` del objeto xml
  let timeArr = xml.querySelectorAll("time")

  timeArr.forEach(time => {
      
      let from = time.getAttribute("from").replace("T", " ")

      let humidity = time.querySelector("humidity").getAttribute("value")
      let windSpeed = time.querySelector("windSpeed").getAttribute("mps")
      let precipitation = time.querySelector("precipitation").getAttribute("probability")
      let pressure = time.querySelector("pressure").getAttribute("value")
      let cloud = time.querySelector("clouds").getAttribute("all")

      let template = `
          <tr>
              <td>${from}</td>
              <td>${humidity}</td>
              <td>${windSpeed}</td>
              <td>${precipitation}</td>
              <td>${pressure}</td>
              <td>${cloud}</td>
          </tr>
      `

      //Renderizando la plantilla en el elemento HTML
      forecastElement.innerHTML += template;

  console.log(xml)

})
}

//Callback
let selectListener = async (event) => {

  let selectedCity = event.target.value

  // Lea la entrada de almacenamiento local
  let cityStorage = localStorage.getItem(selectedCity);

  if (cityStorage == null) {
   
    try {
      //API key
      let APIkey = 'c9ab93f7b6c3d9914a0c93425b90b5a3'
      let url = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&mode=xml&appid=${APIkey}`

      let response = await fetch(url)
      let responseText = await response.text()
      
      await parseXML(responseText)
      // Guarde la entrada de almacenamiento local
      await localStorage.setItem(selectedCity, responseText)
    } catch (error) {
      console.log(error)
    }

} else {
    // Procese un valor previo
    parseXML(cityStorage)
}

  console.log(selectedCity);

}

let loadForecastByCity = () => {

  //Handling event
  let selectElement = document.querySelector("select")
  selectElement.addEventListener("change", selectListener)

}


loadForecastByCity();
cargarOpenMeteo();
cargarOpenMeteo2();
cargarPrecipitacion();
cargarUV();
cargarTemperatura();
cargarFechaActual();

