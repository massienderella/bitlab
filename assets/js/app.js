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


//TRABAJO CON API

//Clave de API: JBO9kz4vLHKHCMk0

//Secreto de API: b6MuoF3jbw7R2JyfYMSbOqVAhDHz1Tv3

/*import {Client} from 'coinbase';

var client = new Client({
  'apiKey': 'JBO9kz4vLHKHCMk0',
  'apiSecret': 'b6MuoF3jbw7R2JyfYMSbOqVAhDHz1Tv3',
  'version':'2018-02-19'
});

client.getAccounts({}, function(err, accounts) {
  accounts.forEach(function(acct) {
    console.log(acct.name + ': ' + acct.balance.amount + ' ' + acct.balance.currency);
    acct.getTransactions(null, function(err, txns) {
      txns.forEach(function(txn) {
        console.log('txn: ' + txn.id);
      });
    });
  });
});

client.createAccount({'name': 'New Wallet'}, function(err, acct) {
  console.log(acct.name + ': ' + acct.balance.amount + ' ' + acct.balance.currency);
});

client.getAccount('primary', function(err, primaryAccount) {
  // Generate a new bitcoin address for the account from previous steps:
  account.createAddress(null, function(err, address) {
    // Send coins to the new account from your primary account:
    primaryAccount.sendMoney({'to': address.address,
                              'amount': '0.01',
                              'currency': 'BTC',
                              'description': 'For being awesome!'}, function(err, tx) {
       console.log(tx);
    });
  });
});

// refresh the account
client.getAccount(primaryAccount.id, function(err, acct) {
  console.log(acct.name + ': ' + acct.balance.amount + ' ' + acct.balance.currency);
});*/