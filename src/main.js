import funcs from './pages/home.js';
import profile from './pages/profile.js';
import getMoreEvent from './pages/moreinfoevent.js';

function init() {
  if (location.hash === '#profile') {
    document.querySelector('main').innerHTML = profile();
  } else if (location.hash === '') {
    document.querySelector('main').innerHTML = funcs.getEvents();
  } else if (location.hash === '#saibamais') {
    document.querySelector('main').innerHTML = funcs.moreInfo();
  } else {
    document.querySelector('main').innerHTML = getMoreEvent(location.hash);
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
