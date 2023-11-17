/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

let loadExternalTable = async () => {
  
    try{
    //Requerimiento asíncrono
    let proxyURL = 'https://cors-anywhere.herokuapp.com/'
    let endpoint = proxyURL +'https://www.gestionderiesgos.gob.ec/monitoreo-de-inundaciones/'
  
    let response = await fetch(endpoint)
    let responseText = await response.text()
    
    const parser = new DOMParser();
    const xml = parser.parseFromString(responseText, "text/html");
    
    let table = xml.querySelector("#postcontent table");
    
    let monitoreoElement = document.getElementById("monitoreo");
    
    monitoreoElement.innerHTML = table.outerHTML;
    }
    catch(error){
      console.log(error)
    }
  }
  
  
  loadExternalTable();
