// import getEvents from './pages/home.js';
import profile from './pages/profile.js';

// getEvents();

function init() {
  document.querySelector('body').innerHTML = profile();
}

window.addEventListener('load', init);
