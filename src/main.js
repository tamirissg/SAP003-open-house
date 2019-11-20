import funcs from './pages/home.js';
import getUser from './pages/profile.js';
import Info from './pages/info.js';
import getMoreEvent from './pages/moreinfoevent.js';
import loginGoogle from './pages/google.js';
import loginFacebook from './pages/facebook.js';
import getFavorites from './pages/favorites.js';
import registerPage from './pages/register.js';

const main = document.querySelector('main');

function init() {
  if (window.location.hash === '#profile') {
    getUser();
  } else if (window.location.hash === '#info') {
    main.innerHTML = Info();
  } else if (window.location.hash === '') {
    main.innerHTML = funcs.getEvents();
  } else if (window.location.hash === '#saibamais') {
    main.innerHTML = funcs.moreInfo();
  } else if (window.location.hash === '#salvos') {
    getFavorites();
  } else if (window.location.hash === '#register') {
    registerPage();
  } else {
    main.innerHTML = getMoreEvent(window.location.hash);
  }
}

window.addEventListener('hashchange', init);
window.addEventListener('load', init);

document.querySelectorAll('.home').forEach((btn) => {
  btn.addEventListener('click', () => {
    window.location.hash = '';
  });
});

document.querySelectorAll('.info').forEach((btn) => {
  btn.addEventListener('click', () => {
    window.location.hash = 'info';
  });
});

const signIn = () => {
  const email = document.querySelector('.input-email-login').value;
  const password = document.querySelector('.input-password-login').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('logado'); // não funciona para login normal
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = document.querySelector('.error');
      if (errorCode === 'auth/invalid-email') errorMessage.textContent = 'Email inválido';
      if (errorCode === 'auth/user-disabled') errorMessage.textContent = 'Usuário desabilitado';
      if (errorCode === 'auth/user-not-found') errorMessage.textContent = 'Usuário não encontrado';
      if (errorCode === 'auth/wrong-password') errorMessage.textContent = 'Senha incorreta';
    });
};

document.querySelectorAll('.login').forEach((element) => {
  element.addEventListener('click', (event) => {
    if (firebase.auth().currentUser == null) {
      $('#myModal').modal('show');
    } else {
      window.location.hash = event.currentTarget.id;
    }
  });
});

const register = () => {
  window.location.hash = 'register';
}

const googleBtn = document.querySelector('.google-login');
googleBtn.addEventListener('click', loginGoogle);

const facebookBtn = document.querySelector('.facebook-login');
facebookBtn.addEventListener('click', loginFacebook);

const loginBtn = document.querySelector('.btn-submit-login');
loginBtn.addEventListener('click', signIn);

const btnRegister = document.querySelector('.register')
btnRegister.addEventListener('click', register);
