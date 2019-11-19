import getEvents from './pages/home.js';
import profile from './pages/profile.js';

function init() {
  if (location.hash === '#profile') {
    document.querySelector('main').innerHTML = profile();
  } else if (location.hash === '') {
    document.querySelector('main').innerHTML = getEvents();
  }
}

window.addEventListener('hashchange', init);
window.addEventListener('load', init);

document.querySelector('.home').addEventListener('click', () => {
  location.hash = '';
});

document.querySelector('.profile').addEventListener('click', () => {
    location.hash = 'profile';
  });
