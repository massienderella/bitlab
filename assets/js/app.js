$(document).ready(function() {
    $('select').material_select();
});
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

//API COINDESK + OBTENEMOS LA DATA
$(document).ready(() => {
  $.ajax({
    url: 'https://api.coindesk.com/v1/bpi/currentprice/CLP.json',
    type: 'GET',
    datatype: 'json'
  })
    .done(function (response) {
      // getCurrencyRate(response);
      console.log(response)
      const data = JSON.parse(response)
      console.log(data)
      getCurrencyRate(data)
    })
    .fail(function () {
      console.log('error en conexión a API');
    });
});


function getCurrencyRate(data) {
  let currencyRate = data.bpi.CLP.rate;
  let currencyRateUSD = data.bpi.USD.rate;
  console.log('El valor en CLP es de $' + currencyRate + 'El valor en USD es de $' + currencyRateUSD)
  $.ajax({
    url: 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-02-01&end=2018-02-19',
    type: 'GET',
    datatype: 'json'
  })
    .done(function (response) {
      const data = JSON.parse(response)
      console.log(data)
      currencyMonthlyUsd(data)
    })
    .fail(function () {
      console.log('error en conexión a API');
    });
};

function currencyMonthlyUsd(data) {
  let currencyUsd = data.bpi;
  console.log(currencyUsd)
  $.ajax({
    url: 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-02-13&end=2018-02-20',
    type: 'GET',
    datatype: 'json'
  })
    .done(function (response) {
      const data = JSON.parse(response)
      console.log(data)
      currencyWeeklyUsd(data)
    })
    .fail(function () {
      console.log('error en conexión a API');
    });
};

function currencyWeeklyUsd(data) {
  let currencyUsd = data.bpi;
  console.log(currencyUsd)
  $.ajax({
    url: 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday',
    type: 'GET',
    datatype: 'json'
  })
    .done(function (response) {
      const data = JSON.parse(response)
      console.log(data)
      currencyYesterdayUsd(data)
    })
    .fail(function () {
      console.log('error en conexión a API');
    });
}

function currencyYesterdayUsd(data) {
  let currencyUsd = data.bpi;
  console.log(currencyUsd)
  $.ajax({
    url: 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-02-01&end=2018-02-19&currency=CLP',
    type: 'GET',
    datatype: 'json'
  })
    .done(function (response) {
      const data = JSON.parse(response)
      console.log(data)
      currencyMonthlyClp(data)
    })
    .fail(function () {
      console.log('error en conexión a API');
    });
}

function currencyMonthlyClp(data) {
  let currencyClp = data.bpi;
  console.log(currencyClp)
  $.ajax({
    url: 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-02-13&end=2018-02-20&currency=CLP',
    type: 'GET',
    datatype: 'json'
  })
    .done(function (response) {
      const data = JSON.parse(response)
      console.log(data)
      currencyWeeklyClp(data)
    })
    .fail(function () {
      console.log('error en conexión a API');
    });
}

function currencyWeeklyClp(data) {
  let currencyClp = data.bpi;
  console.log(currencyClp)
  $.ajax({
    url: 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday&currency=CLP',
    type: 'GET',
    datatype: 'json'
  })
    .done(function (response) {
      const data = JSON.parse(response)
      console.log(data)
      currencyYesterdayClp(data)
    })
    .fail(function () {
      console.log('error en conexión a API');
    });
}

function currencyYesterdayClp(data) {
  let currencyClp = data.bpi;
  console.log(currencyClp)
}

