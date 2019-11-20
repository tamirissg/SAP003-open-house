import Card from '../components/main-card.js';
import templateCategory from '../components/event-categories.js';

const hammer = new Hammer(document.querySelector('main'));
let tamanho = 0;
let index = 0;
let arrayIndex = 0;


const swipeRight = () => {
  (index === tamanho - 1) ? index = 0 : index++;
  const card = document.querySelector('article');
  card.className = 'card card-size p-1 cards-background swiping-right';
  card.addEventListener('animationend', getEvents);
};

const swipeLeft = () => {
  (index === 0) ? index = tamanho - 1 : index--;
  const card = document.querySelector('article');
  card.className = 'card card-size p-1 cards-background swiping-left';
  card.addEventListener('animationend', getEvents);
};

const moreInfo = (id) => {
  window.location.hash = id;
};

const getEvents = () => {
  const main = document.querySelector('main');
  main.classList.remove('flex-column');

  firebase.firestore().collection('events').orderBy('date')
    .get()
    .then((querySnapshot) => {
      const arrayEvents = [];
      querySnapshot.forEach((doc) => {
        const docEvent = {
          ...doc.data(),
          id: doc.id,
          position: arrayIndex++,
        };
        arrayEvents.push(docEvent);
        tamanho = arrayEvents.length;
      });
      document.querySelector('.container-category').innerHTML = `
      ${templateCategory({ src: 'img/tickets.png', title: 'Todos' })}
      ${templateCategory({ src: 'img/karaoke.png', title: 'Shows' })}
      ${templateCategory({ src: 'img/theater.png', title: 'Teatro' })}
      ${templateCategory({ src: 'img/popcorn.png', title: 'Cinema' })}
      ${templateCategory({ src: 'img/stretching-exercises.png', title: 'Esporte' })}
      ${templateCategory({ src: 'img/museum.png', title: 'Arte' })}
      `;
      main.innerHTML = Card(arrayEvents[index], funcs);
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
      })
 });
};


const funcs = {
  swipeLeft,
  swipeRight,
  moreInfo,
  getEvents,
  save,
};

hammer.on('swiperight', swipeRight);
hammer.on('swipeleft', swipeLeft);

export default funcs;
