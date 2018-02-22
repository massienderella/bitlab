$(document).ready(function () {
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
      $('.authentication').hide();
      $('.info').show();
      if ($('#registrar').modal) $('#registrar').modal('close');
    } else {
      $('.authentication').show();
      $('.info').hide();
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

let currencyRate;
let currencyRateUSD;

function getCurrencyRate(data) {//debo usar el parseInt
  currencyRate =  (data.bpi.CLP.rate).split(',').join('').split('.')[0];
  currencyRateUSD = (data.bpi.USD.rate).split(',').join('').split('.')[0];
  console.log('El valor en CLP es de $' +  currencyRate +  ' El valor en USD es de $' + currencyRateUSD)
  $('#test2').append('<h3 class="yesterdayCLP">' + 'El valor del Bitcoin hoy en USD es de ' + currencyRateUSD + '</h3>');
  $('#test2').append(`<h3 class="yesterdayCLP"> El valor del Bitcoin hoy en CLP es de ${currencyRate} </h3>`);
  $.ajax({
    url: 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-02-01&end=2018-02-21',
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
    url: 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-02-13&end=2018-02-21',
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
  $('#test1').append('<h3 class="yesterdayCLP">' + 'El valor del Bitcoin ayer en USD es de ' + currencyUsd + '</h3>')
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
    url: 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-02-01&end=2018-02-21&currency=CLP',
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
    url: 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-02-13&end=2018-02-21&currency=CLP',
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
  console.log(currencyClp);

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

//
/*  una funcion que rescate el valor ingresado y luego lo multiplique por el valor 
actual del bitcoins y lo muestre */
//agregando evento al btnCoin
btnCoin.addEventListener('click', e => {
  const yourBitcoin = document.getElementById('btc-amount');
  const bitcoinsClp = yourBitcoin.value;
  console.log(bitcoinsClp);
  const resultClp = bitcoinsClp * currencyRate;
  const resultUsd = bitcoinsClp * currencyRateUSD;
  console.log(resultClp);
  console.log(resultUsd);
  

  const selectTag = document.getElementById('selection');
  const select = selectTag.options[selectTag.selectedIndex].value;
  if (select === '1') {
    $('.currency').append(`<p> Total porfolio value CLP ${resultClp} </p>`);
  } else if (select === '2') {
    $('.currency').append(`<p> Total porfolio value  USD ${resultUsd} </p>`);
  }
});

//tostring

window.onload = function () {
  var dataPoints = [];
  $.getJSON("https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-02-01&end=2018-02-21&currency=CLP", function(data) {
  console.log(data.bpi)
  const bpi = data.bpi
  console.log(Object.values(bpi))  
  $.each(bpi, function(key, value){
    console.log(key, value);
    dataPoints.push({label: key, y: parseInt(value)});
  
  });
  console.log(dataPoints)
  var chart = new CanvasJS.Chart("canvas4",{
    title:{
      text:"Monthly BTC prices"
    },
    data: [{
      type: "line",
      dataPoints : dataPoints,
    }]
  });
  chart.render();
  });
  }

 
  $('#test1').append(`<h3 class="yesterdayCLP"> El valor del Bitcoin ayer en CLP es de ${currencyClp} </h3>`)