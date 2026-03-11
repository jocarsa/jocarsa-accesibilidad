
console.log("Vamos con la accesibilidad");

window.onload = function(){

  let estado = {
    zoom: parseFloat(localStorage.getItem("jocarsa_zoom")) || 1,
    invertido: localStorage.getItem("jocarsa_invertido") === "true",
    contraste: localStorage.getItem("jocarsa_contraste") === "true",
    grises: localStorage.getItem("jocarsa_grises") === "true",
    fuente: localStorage.getItem("jocarsa_fuente") === "true",
    enlaces: localStorage.getItem("jocarsa_enlaces") === "true",
    visible: localStorage.getItem("jocarsa_visible") !== "false"
  };

  let cuerpo = document.body;
  let html = document.documentElement;

  console.log("Esto solo carga cuando la ventana haya cargado");

  let barra = document.createElement("div");
  barra.className = "jocarsa-accesibilidad";

  let cabecera = document.createElement("div");
  cabecera.className = "jocarsa-accesibilidad-cabecera";

  let titulo = document.createElement("div");
  titulo.className = "jocarsa-accesibilidad-titulo";
  titulo.textContent = "♿";

  let plegar = document.createElement("button");
  plegar.className = "jocarsa-boton";
  plegar.textContent = estado.visible ? "◀" : "▶";
  plegar.title = "Mostrar u ocultar herramientas";

  cabecera.appendChild(titulo);
  cabecera.appendChild(plegar);
  barra.appendChild(cabecera);

  let controles = document.createElement("div");
  controles.className = "jocarsa-accesibilidad-controles";
  if(!estado.visible){ controles.style.display = "none"; }
  barra.appendChild(controles);

  document.body.appendChild(barra);

  function crearBoton(emoji, texto, tituloTexto, onclick){
    let boton = document.createElement("button");
    boton.className = "jocarsa-boton";
    boton.innerHTML = "<span>"+emoji+"</span>";
    boton.title = tituloTexto;
    boton.setAttribute("aria-label", tituloTexto);
    boton.onclick = onclick;

    let etiqueta = document.createElement("small");
    etiqueta.textContent = texto;

    let bloque = document.createElement("div");
    bloque.className = "jocarsa-item";
    bloque.appendChild(boton);
    bloque.appendChild(etiqueta);

    controles.appendChild(bloque);
    return boton;
  }

  let btnZoomIn = crearBoton("🔍", "+", "Aumentar zoom", function(){
    estado.zoom += 0.1;
    if(estado.zoom > 2){ estado.zoom = 2; }
    aplicarTodo();
  });

  let btnZoomOut = crearBoton("🔎", "-", "Reducir zoom", function(){
    estado.zoom -= 0.1;
    if(estado.zoom < 0.7){ estado.zoom = 0.7; }
    aplicarTodo();
  });

  let btnReset = crearBoton("↺", "100%", "Restablecer accesibilidad", function(){
    estado.zoom = 1;
    estado.invertido = false;
    estado.contraste = false;
    estado.grises = false;
    estado.fuente = false;
    estado.enlaces = false;
    aplicarTodo();
  });

  let btnInvertir = crearBoton("🌙", "invert", "Invertir colores", function(){
    estado.invertido = !estado.invertido;
    aplicarTodo();
  });

  let btnContraste = crearBoton("🌓", "contrast", "Alto contraste", function(){
    estado.contraste = !estado.contraste;
    aplicarTodo();
  });

  let btnGrises = crearBoton("⚫", "gray", "Escala de grises", function(){
    estado.grises = !estado.grises;
    aplicarTodo();
  });

  let btnFuente = crearBoton("🔤", "font", "Fuente legible", function(){
    estado.fuente = !estado.fuente;
    aplicarTodo();
  });

  let btnEnlaces = crearBoton("🔗", "links", "Subrayar enlaces", function(){
    estado.enlaces = !estado.enlaces;
    aplicarTodo();
  });

  plegar.onclick = function(){
    estado.visible = !estado.visible;
    controles.style.display = estado.visible ? "flex" : "none";
    plegar.textContent = estado.visible ? "◀" : "▶";
    guardar();
  };

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
    if(estado.fuente){
      html.classList.add("jocarsa-fuente-legible");
    }else{
      html.classList.remove("jocarsa-fuente-legible");
    }
  }

  function aplicarEnlaces(){
    if(estado.enlaces){
      html.classList.add("jocarsa-enlaces-visibles");
    }else{
      html.classList.remove("jocarsa-enlaces-visibles");
    }
  }

  function actualizarActivos(){
    btnInvertir.classList.toggle("activo", estado.invertido);
    btnContraste.classList.toggle("activo", estado.contraste);
    btnGrises.classList.toggle("activo", estado.grises);
    btnFuente.classList.toggle("activo", estado.fuente);
    btnEnlaces.classList.toggle("activo", estado.enlaces);
    btnReset.classList.toggle("activo", estado.zoom !== 1 || estado.invertido || estado.contraste || estado.grises || estado.fuente || estado.enlaces);
  }

  function guardar(){
    localStorage.setItem("jocarsa_zoom", estado.zoom);
    localStorage.setItem("jocarsa_invertido", estado.invertido);
    localStorage.setItem("jocarsa_contraste", estado.contraste);
    localStorage.setItem("jocarsa_grises", estado.grises);
    localStorage.setItem("jocarsa_fuente", estado.fuente);
    localStorage.setItem("jocarsa_enlaces", estado.enlaces);
    localStorage.setItem("jocarsa_visible", estado.visible);
  }

  function aplicarTodo(){
    aplicarZoom();
    aplicarFiltros();
    aplicarFuente();
    aplicarEnlaces();
    actualizarActivos();
    guardar();
    console.log("Estado accesibilidad:", estado);
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
}

