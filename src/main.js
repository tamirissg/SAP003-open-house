import funcs from './pages/home.js';
import getProfile from './pages/profile.js';
import Info from './pages/info.js';
import getMoreEvent from './pages/moreinfoevent.js';
import loginGoogle from './pages/google.js';
import loginFacebook from './pages/facebook.js';

const main = document.querySelector('main');

function init() {
  if (window.location.hash === '#profile') {
    main.innerHTML = profile();
  } else if (window.location.hash === '#info') {
    main.innerHTML = Info();
  } else if (location.hash === '') {
    main.innerHTML = funcs.getEvents();
  } else if (location.hash === '#saibamais') {
    main.innerHTML = funcs.moreInfo();
  } else {
    main.innerHTML = getMoreEvent(location.hash);
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
      window.location.hash = event.currentTarget.id;
    }
  });
});

const googleBtn = document.querySelector('.google-login');
const facebookBtn = document.querySelector('.facebook-login');
googleBtn.addEventListener('click', loginGoogle);
facebookBtn.addEventListener('click', loginFacebook);

const loginBtn = document.querySelector('.btn-submit-login');
loginBtn.addEventListener('click', signIn());
