console.log("Vamos con la accesibilidad");

window.onload = function(){

  let estado = {
    zoom: parseFloat(localStorage.getItem("jocarsa_zoom")) || 1,
    invertido: localStorage.getItem("jocarsa_invertido") === "true",
    contraste: localStorage.getItem("jocarsa_contraste") === "true",
    grises: localStorage.getItem("jocarsa_grises") === "true",
    fuente: localStorage.getItem("jocarsa_fuente") === "true",
    enlaces: localStorage.getItem("jocarsa_enlaces") === "true"
  };

  let cuerpo = document.body;
  let html = document.documentElement;

  let barra = document.createElement("div");
  barra.className = "jocarsa-accesibilidad";

  document.body.appendChild(barra);

  function crearBoton(emoji, tituloTexto, onclick){
    let boton = document.createElement("button");
    boton.className = "jocarsa-boton";
    boton.innerHTML = emoji;
    boton.title = tituloTexto;
    boton.setAttribute("aria-label", tituloTexto);
    boton.onclick = onclick;
    barra.appendChild(boton);
    return boton;
  }

  let btnZoomIn = crearBoton("🔍", "Aumentar zoom", function(){
    estado.zoom += 0.1;
    if(estado.zoom > 2){ estado.zoom = 2; }
    aplicarTodo();
  });

  let btnZoomOut = crearBoton("🔎", "Reducir zoom", function(){
    estado.zoom -= 0.1;
    if(estado.zoom < 0.7){ estado.zoom = 0.7; }
    aplicarTodo();
  });

  let btnReset = crearBoton("↺", "Restablecer accesibilidad", function(){
    estado.zoom = 1;
    estado.invertido = false;
    estado.contraste = false;
    estado.grises = false;
    estado.fuente = false;
    estado.enlaces = false;
    aplicarTodo();
  });

  let btnInvertir = crearBoton("🌙", "Invertir colores", function(){
    estado.invertido = !estado.invertido;
    aplicarTodo();
  });

  let btnContraste = crearBoton("🌓", "Alto contraste", function(){
    estado.contraste = !estado.contraste;
    aplicarTodo();
  });

  let btnGrises = crearBoton("⚫", "Escala de grises", function(){
    estado.grises = !estado.grises;
    aplicarTodo();
  });

  let btnFuente = crearBoton("🔤", "Fuente legible", function(){
    estado.fuente = !estado.fuente;
    aplicarTodo();
  });

  let btnEnlaces = crearBoton("🔗", "Subrayar enlaces", function(){
    estado.enlaces = !estado.enlaces;
    aplicarTodo();
  });

  function aplicarFiltros(){
    let filtros = [];
    if(estado.invertido){ filtros.push("invert(1)"); }
    if(estado.contraste){ filtros.push("contrast(1.45) saturate(1.15)"); }
    if(estado.grises){ filtros.push("grayscale(1)"); }
    cuerpo.style.filter = filtros.join(" ");
  }

  function aplicarZoom(){
    cuerpo.style.zoom = estado.zoom;
  }

  function aplicarFuente(){
    html.classList.toggle("jocarsa-fuente-legible", estado.fuente);
  }

  function aplicarEnlaces(){
    html.classList.toggle("jocarsa-enlaces-visibles", estado.enlaces);
  }

  function actualizarActivos(){
    btnInvertir.classList.toggle("activo", estado.invertido);
    btnContraste.classList.toggle("activo", estado.contraste);
    btnGrises.classList.toggle("activo", estado.grises);
    btnFuente.classList.toggle("activo", estado.fuente);
    btnEnlaces.classList.toggle("activo", estado.enlaces);
    btnReset.classList.toggle(
      "activo",
      estado.zoom !== 1 || estado.invertido || estado.contraste || estado.grises || estado.fuente || estado.enlaces
    );
  }

  function guardar(){
    localStorage.setItem("jocarsa_zoom", estado.zoom);
    localStorage.setItem("jocarsa_invertido", estado.invertido);
    localStorage.setItem("jocarsa_contraste", estado.contraste);
    localStorage.setItem("jocarsa_grises", estado.grises);
    localStorage.setItem("jocarsa_fuente", estado.fuente);
    localStorage.setItem("jocarsa_enlaces", estado.enlaces);
  }

  function aplicarTodo(){
    aplicarZoom();
    aplicarFiltros();
    aplicarFuente();
    aplicarEnlaces();
    actualizarActivos();
    guardar();
  }

  document.addEventListener("keydown", function(e){
    if(e.altKey && e.key === "+"){
      estado.zoom += 0.1;
      if(estado.zoom > 2){ estado.zoom = 2; }
      aplicarTodo();
    }
    if(e.altKey && e.key === "-"){
      estado.zoom -= 0.1;
      if(estado.zoom < 0.7){ estado.zoom = 0.7; }
      aplicarTodo();
    }
    if(e.altKey && e.key.toLowerCase() === "i"){
      estado.invertido = !estado.invertido;
      aplicarTodo();
    }
    if(e.altKey && e.key.toLowerCase() === "r"){
      estado.zoom = 1;
      estado.invertido = false;
      estado.contraste = false;
      estado.grises = false;
      estado.fuente = false;
      estado.enlaces = false;
      aplicarTodo();
    }
  });

  aplicarTodo();
};
