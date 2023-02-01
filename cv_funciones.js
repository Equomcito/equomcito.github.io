let url_datos = "https://randomuser.me/api/?nat=es";
fetch(url_datos).then(respuesta => respuesta.json()).then(datos => trabajar_datos(datos))
.catch(error => console.log(error));

const trabajar_datos = (datos) => {
  console.log(datos)
  mostrar_contacto(datos);
  cambiar_hoja_de_estilos(datos);
  mostrar_foto_perfil(datos);
  mostrar_nombre_y_ocupacion(datos);
}

function mostrar_contacto(datos) {
  document.getElementById("numero_telefonico").innerHTML = '<i class="fa fa-phone"></i> '+datos.results[0].cell;
  document.getElementById("correo_electronico").innerHTML = '<i class="fa fa-envelope"></i> '+datos.results[0].email;
  document.getElementById("direccion").innerHTML = '<i class="fa fa-map-marker"></i> '+
  datos.results[0].location.street.name+" "+datos.results[0].location.street.number+", "+
  datos.results[0].location.state+", "+datos.results[0].location.country;
  document.getElementById("ciudad").innerHTML = "Ciudad: "+datos.results[0].location.city;
  document.getElementById("codigo_postal").innerHTML = "Código postal: "+datos.results[0].location.postcode;
  document.getElementById("numero_alternativo").innerHTML = "Número alternativo: "+datos.results[0].phone;
}

function cambiar_hoja_de_estilos(datos) {
  if (!es_femenino(datos)) {
    let string = '<link rel="stylesheet" type="text/css" href="cv_colores_masculino.css" id="estilos"/>';
    document.getElementById('estilos').innerHTML = string;
  }
}

function mostrar_nombre_y_ocupacion(datos) {
  document.getElementById("nombre_completo").innerHTML = datos.results[0].name.first+" "+datos.results[0].name.last;
  if (es_femenino(datos)) {
    document.getElementById("ocupacion").innerHTML = "Ingeniera Informática";
  } else {
    document.getElementById("ocupacion").innerHTML = "Ingeniero Informático";
  }
}

function mostrar_foto_perfil(datos) {
  let foto_perfil = document.createElement('img');
  foto_perfil.src = datos.results[0].picture.large;
  foto_perfil.setAttribute("width", "160px");
  foto_perfil.setAttribute("id", "foto");
  foto_perfil.setAttribute("alt", "foto de perfil");
  document.getElementById("foto_perfil").appendChild(foto_perfil);
}

function es_femenino(datos) {
  return datos.results[0].gender == "female";
}

function desplegar(id_desplegable) {
  document.getElementById(id_desplegable).classList.toggle("mostrar");
}

window.onclick = function(event){
  if(!event.target.matches('.drop-button')) {
    let desplegables = document.getElementsByClassName("mi_desplegable_contenido");
    let i;
    for (i = 0;  i < desplegables.length; i++) {
      let abrir_desplegable = desplegables[i];
      if (abrir_desplegable.classList.contains('mostrar')){
        abrir_desplegable.classList.remove('mostrar');
      }
    }
  }
}