import Card from '../components/main-card.js';
import templateCategory from '../components/event-categories.js';

const hammer = new Hammer(document.querySelector('main'));
let index = 0;
let tamanho = 0;

const swipeRight = () => {
  (index === tamanho - 1) ? index = 0 : index += 1;
  const card = document.querySelector('article');
  card.className = 'card card-size p-1 cards-background swiping-right';
  if (tamanho !== 10) {
    card.addEventListener('animationend', getCategory);
  } else {
    card.addEventListener('animationend', getEvents);
  }
};


const swipeLeft = () => {
  (index === 0) ? index = tamanho - 1 : index -= 1;
  const card = document.querySelector('article');
  card.className = 'card card-size p-1 cards-background swiping-left';
  if (tamanho !== 10) {
    card.addEventListener('animationend', getCategory);
  } else {
    card.addEventListener('animationend', getEvents);
  }
};

const moreInfo = (target) => {
  window.location.hash = target.id;
};

const getEvents = () => {
  const main = document.querySelector('main'); 
  document.querySelectorAll('.arrow').forEach((arrow) => arrow.classList.remove('hide'));


  firebase.firestore().collection('events').orderBy('date')
    .get()
    .then((querySnapshot) => {
      window.data = {
        arrayEvents: [],
      };
      querySnapshot.forEach((doc) => {
        const docEvent = {
          ...doc.data(),
          id: doc.id,
          position: index,
        };
        data.arrayEvents.push(docEvent);
        tamanho = data.arrayEvents.length;
      });
      document.querySelector('.container-category').innerHTML = `
      ${templateCategory({ src: 'img/tickets.png', onClick: getCategory, title: 'Todos' })}
      ${templateCategory({ src: 'img/karaoke.png', onClick: getCategory, title: 'Shows' })}
      ${templateCategory({ src: 'img/theater.png', onClick: getCategory, title: 'Teatro' })}
      ${templateCategory({ src: 'img/popcorn.png', onClick: cinema, title: 'Cinema' })}
      ${templateCategory({ src: 'img/stretching-exercises.png', onClick: getCategory, title: 'Esporte' })}
      ${templateCategory({ src: 'img/museum.png', onClick: getCategory, title: 'Arte' })}
      `;
      main.innerHTML = Card(data.arrayEvents[index], funcs);
    });
};


const save = (id) => {
  const user = firebase.auth().currentUser.uid;
  document.querySelector('.save').classList.add('animated', 'tada');
  firebase.firestore().collection('users')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (user === doc.data().user_uid) {
          firebase.firestore().collection('users').doc(doc.id)
            .update({
              id_save: firebase.firestore.FieldValue.arrayUnion(id),
            });
        }
      });
    });
};

const cinema = () => {
  window.location.hash = '#Cinema';
}

const getCategory = () => {
  // const category = event.originalTarget.innerText;
  document.querySelector('main').innerHTML = '';

  firebase.firestore().collection('events')
    .where('type', '==', 'Cinema')
    .get()
    .then((querySnapshot) => {
      const arrayfilter = [];
      querySnapshot.forEach((doc) => {
        const docEvent = {
          ...doc.data(),
          id: doc.id,
          position: index,
        };
        arrayfilter.push(docEvent);
        tamanho = arrayfilter.length;        
      });
      document.querySelector('main').innerHTML = Card(arrayfilter[index], funcs);
    });
};

const funcs = {
  swipeLeft,
  swipeRight,
  moreInfo,
  getEvents,
  save,
  getCategory,
};

hammer.on('swiperight', swipeRight);
hammer.on('swipeleft', swipeLeft);
document.querySelector('.fa-angle-left').addEventListener('click', swipeLeft)
document.querySelector('.fa-angle-right').addEventListener('click', swipeRight);

export default funcs;
