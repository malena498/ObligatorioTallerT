//Limpiar campos del ABM.
function limpiar(){
	document.getElementById("nombre").value = "";
	document.getElementById("usuario").value = "";
	document.getElementById("pass").value = "";
}
//Limpiar campos a editar.
function limpiarEditar(){
	document.getElementById("nom").value = "";
	document.getElementById("usua").value = "";
}

//Limpiar campos del LOGIN.
function limpiarLogin(){
	document.getElementById("usu").value = "";
	document.getElementById("pas").value = "";
}

//Limpiar parrafo del mensaje. 
function limpiarMsj(){
	document.getElementById("lblMsj").innerHTML = "";
}
//Funciones ABM.
//JSON
function Usuario (nom, usua, pass){
	return{
		nombre: nom,
		usuario: usua,
		clave: pass
	};
}

//Guardar usuario en localStorage
function alta(){
	var usu = document.getElementById("usuario").value;
	var res= comprobarExistencia(usu);
	if(res == false	)
	{
		var nom = document.getElementById("nombre").value;
		var usu = document.getElementById("usuario").value;
		var pas = document.getElementById("pass").value;
		var usuario = Usuario(nom, usu, pas);
		if (typeof(Storage) !== "undefined") {
	    // LocalStorage disponible
	    	localStorage.setItem(usuario.usuario, JSON.stringify(usuario));
		} 
		else {
	    // LocalStorage no soportado en este navegador
		}

		sesionActual(usu);
		limpiar();
			
		var p=document.getElementById("lblMsj");
		p.innerHTML="Usuario creado con exito.";
	
	}
	else{
		var p=document.getElementById("lblMsj");
		p.innerHTML="El usuario ingresado ya existe.";
	}
	setTimeout(limpiarMsj, 5000);
}

//Buscar usuario desde localStorage.
function buscarUsuario(us){

		
		var resul = comprobarExistencia(us);
		if(resul == true){

			var usu=  JSON.parse(localStorage.getItem(us));
			
		}
		else{

			var p=document.getElementById("lblMsj");
			p.innerHTML="El usuario ingresado no existe.";
			setTimeout(limpiarMsj, 5000);
		}
		return usu;
}

//Eliminar usuario.
function borrarUsuario(){
	var clave = document.getElementById("usua").value;
	localStorage.removeItem(clave);
	localStorage.removeItem('UsuarioActual');
	limpiarEditar();
}

//Modificar Usuario.
function modificar(){
	var res = comprobarExistencia();
		
	if(res == false)
	{
		borrarUsuario();
		alta();
		var p=document.getElementById("lblMsj");
		p.innerHTML="Usuario actualizado con éxito.";
		setTimeout(limpiarMsj, 5000);

	}
	else{
		var p=document.getElementById("lblMsj");
		p.innerHTML="El usuario ingresado no existe.";
	}
	setTimeout(limpiarMsj, 5000);
		
}
//Comprueba si el usuario pasado como parámetro. 
function comprobarExistencia(u){

	 var resultado = false;
	 var usu=  JSON.parse(localStorage.getItem(u));
	 //	EXISTE
	 if(usu != null){
	 	resultado= true;
	 }
	 //NO EXISTE
	 else{
	 	resultado= false;

	 	}
		 
	 return resultado;
}

//Oculta o muestra el div de id "Config" (para editar usuario). 
function ocultarRegistro(){
	if(document.getElementById("Config").style.display == "none")
	{
		document.getElementById("modRegistro").style.display = "none";
		document.getElementById("Config").style.display = "block";

	}
	else if(document.getElementById("Config").style.display == "block"){
		document.getElementById("Config").style.display = "none";
		document.getElementById("modRegistro").style.display = "block";
	}
}
//Cargar datos en campos de "Editar".
function cargardatos(){
	var actual= localStorage.getItem('UsuarioActual');
	if(actual != null){
		var res = comprobarExistencia(actual);
		if(res == true){
			var usuario = buscarUsuario(actual);
			document.getElementById("nom").value= usuario.nombre;
			document.getElementById("usua").value = usuario.usuario;
		}
	}
}
function onload2(){
	ocultarRegistro();
	cargardatos();
}
//Comprueba si el usuario existe y si se escribio bien la contraseña y el usuario.
function iniciarSesion(){
	
	var usu = document.getElementById("usu").value;
	var pas = document.getElementById("pas").value;
	var res = comprobarExistencia(usu);
	var res2= comprobarUsuPass(usu, pas);

	//Contraseña y usuarios correctos.
	if((res == true) && (res2 == true))
	{
			var usua=  JSON.parse(localStorage.getItem(usu));
			var nom = usua.nombre;		
			var p=document.getElementById("lblMsj");
			p.innerHTML="¡Bienvenido/a	" + nom + "!";
			
			sesionActual(usu);
			limpiarLogin();
	}
	//Usuario correcto, contraseña incorrecta.
	if((res == true) && (res2 == false)){
			var p=document.getElementById("lblMsj");
			p.innerHTML="Contraseña incorrecta.";
	}
	//El usuario no existe.
	else if(res == false){
			var p=document.getElementById("lblMsj");
			p.innerHTML="Debe registrarse para iniciar sesion.";
	}
}

function comprobarUsuPass(u, p){
	var resultado = false;
	var usuario=  JSON.parse(localStorage.getItem(u));
	 //	Existe y su contraseña es correcta.
	 if((usuario != null)&&(usuario.clave== p)){
	 		resultado= true;
	 }
	 //No existe.
	 else{
	 	resultado= false;

	 	}
		 
	 return resultado;
}
//Guarda el usuario actualmente logueado.
function sesionActual(u){
	localStorage.setItem('UsuarioActual', u);
	habilitarPrincipal();
}
//Habilita el botón que ingresa a principal.html.
function habilitarPrincipal(){
	var actual= localStorage.getItem('UsuarioActual');
	if(actual != null){
		document.getElementById("api").disabled = false; 
	}
}
function goPrincipal(){
	window.open("PRINCIPAL.html","_blank");
}
/*var sesion= sesionActual(usu, pas);

			localStorage.setItem(sesion.usua, JSON.stringify(sesion));

			function sesionActual (nomb, usuar, passw){
	return{
		nombre: nomb,
		usua: usuar,
	};
}



*/