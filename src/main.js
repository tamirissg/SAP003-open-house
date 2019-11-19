import getEvents from './pages/home.js';
import profile from './pages/profile.js';
import Info from './pages/info.js';

function init() {
  if (window.location.hash === '#profile') {
    document.querySelector('main').innerHTML = profile();
  } if (window.location.hash === '#info') {
    document.querySelector('main').innerHTML = Info();
  } else if (window.location.hash === '') {
    document.querySelector('section').innerHTML = getEvents();
  }
}

window.addEventListener('hashchange', init);
window.addEventListener('load', init);

document.querySelector('.home').addEventListener('click', () => {
  window.location.hash = '';
});

document.querySelector('.profile').addEventListener('click', () => {
  window.location.hash = 'profile';
});

document.querySelector('.info').addEventListener('click', () => {
  window.location.hash = 'info';
});
