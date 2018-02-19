// Initialize Firebase
(function () { //iife una expresion de funcion invocada inmediatamente (function)
  const config = {
    apiKey: "AIzaSyBfkmO6atyFMF9ubQ1anb4d0MNpslmC89g",
    authDomain: "bitlab-6f51b.firebaseapp.com",
    databaseURL: "https://bitlab-6f51b.firebaseio.com",
    projectId: "bitlab-6f51b",
    storageBucket: "",
    messagingSenderId: "452608724816"
  };
  firebase.initializeApp(config);
  // const: variable no va a cambiar , puedo agregar cosas // let: variable que si se puede cambiar

  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const txtEmail2 = document.getElementById('txtEmail2');
  const txtPassword2 = document.getElementById('txtPassword2');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnSalir = document.getElementById('btnSalir');
  const hacerUnEnvio = document.getElementById('hacerUnEnvio');
  const btnVolver = document.getElementById('btnVolver');

  //agregando evento al btnLogin
  btnLogin.addEventListener('click', e => {
    //pasos para obtener correo y contraseña
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //para ingresar 
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => alert('Por favor coloque un correo valido y un passsword de minimo 6 digitos'));
  });

  btnVolver.addEventListener('click', e => {
    $('#sectionCollage').hide();
    $('#sectionPrincipal').show();
  });

  //pasos para poder afiliarte con correo y contraseña
  btnSignUp.addEventListener('click', e => {
    const email = txtEmail2.value;
    const pass = txtPassword2.value;
    const auth = firebase.auth();
    //para ingresar 
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise//utilizamos promise para que nos termine haga una accion .then
      .catch(e => alert(e.message)); // 'e' variable se puuede llamar como quiera
  });

  //funcion para activar el boton de salir

  btnSalir.addEventListener('click', e => {
    firebase.auth().signOut();
  })


  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      $('#authentication').hide();
      $('#homePage').show();
      if ($('#registrar').modal) $('#registrar').modal('close');
    } else {
      $('#authentication').show();
      $('#homePage').hide();
      $('#registrar').modal('open');
    }
  });
}());