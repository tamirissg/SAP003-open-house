import funcs from './pages/home.js';
import profile from './pages/profile.js';
import Info from './pages/info.js';
import getMoreEvent from './pages/moreinfoevent.js';
import loginGoogle from './pages/google.js';
import loginFacebook from './pages/facebook.js';

function init() {
  if (window.location.hash === '#profile') {
    document.querySelector('main').innerHTML = profile();
  } else if (window.location.hash === '#info') {
    document.querySelector('main').innerHTML = Info();
  } else if (location.hash === '') {
    document.querySelector('main').innerHTML = funcs.getEvents();
  } else if (location.hash === '#saibamais') {
    document.querySelector('main').innerHTML = funcs.moreInfo();
  } else {
    getMoreEvent(location.hash);
  }
}

window.addEventListener('hashchange', init);
window.addEventListener('load', init);

document.querySelector('.home').addEventListener('click', () => {
  window.location.hash = '';
});

document.querySelector('.info').addEventListener('click', () => {
  window.location.hash = 'info';
});

const signIn = () => {
  const email = document.querySelector('.input-email-login').value;
  const password = document.querySelector('.input-password-login').value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
    $('#myModal').modal('hide');
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = document.querySelector('.error');
    if (errorCode === 'auth/invalid-email') errorMessage.textContent = 'Email inválido';
    if (errorCode === 'auth/user-disabled') errorMessage.textContent = 'Usuário desabilitado';
    if (errorCode === 'auth/user-not-found') errorMessage.textContent = 'Usuário não encontrado';
    if (errorCode === 'auth/wrong-password') errorMessage.textContent = 'Senha incorreta';
  });
};

const userTop = document.querySelector('.nav-user-top');
const userBot = document.querySelector('.nav-user-bot');
const bookmarkTop = document.querySelector('.nav-bookmark-top');
const bookmarkBot = document.querySelector('.nav-bookmark-bot');

const checkElements = [userTop, userBot, bookmarkTop, bookmarkBot];
checkElements.forEach((element) => {
  element.addEventListener('click', (event) => {
    if (firebase.auth().currentUser == null) {
      $('#myModal').modal('show');
    } else {
      location.hash = event.target.id;
    }
  });
});

const googleBtn = document.querySelector('.google-login');
const facebookBtn = document.querySelector('.facebook-login');
googleBtn.addEventListener('click', loginGoogle);
facebookBtn.addEventListener('click', loginFacebook);

const loginBtn = document.querySelector('.btn-submit-login');
loginBtn.addEventListener('click', signIn);
