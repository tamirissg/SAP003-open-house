import getEvents from './pages/home.js';
import loginGoogle from '/pages/google.js';
import loginFacebook from'/pages/facebook.js';

getEvents();

const checkUser = () => {
  console.log('clicou');
  if (firebase.auth().currentUser == null) {
    $('#myModal').modal('show');
    // $('#myModal').on('hidden.bs.modal', (e) => {
    //   console.log('close modal');  
    // });
  } else {
    console.log('go to profile');
  }

}

const userTop = document.querySelector('.nav-user-top');
const userBot = document.querySelector('.nav-user-bot');
userTop.addEventListener('click', checkUser);
userBot.addEventListener('click', checkUser);

const googleBtn = document.querySelector('.google-login');
const facebookBtn = document.querySelector('.facebook-login');
googleBtn.addEventListener('click', loginGoogle);
facebookBtn.addEventListener('click', loginFacebook);
