import Card from '../components/main-card.js';
import templateCategory from '../components/event-categories.js';

const hammer = new Hammer(document.querySelector('main'));
let index = 0;

const swipeRight = () => {
  (index === data.tamanho - 1) ? index = 0 : index += 1;
  const card = document.querySelector('article');
  card.className = 'card card-size p-1 cards-background swiping-right';
  card.addEventListener('animationend', getEvents);
};


const swipeLeft = () => {
  (index === 0) ? index = data.tamanho - 1 : index -= 1;
  const card = document.querySelector('article');
  card.className = 'card card-size p-1 cards-background swiping-left';
  card.addEventListener('animationend', getEvents);
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
        tamanho: 0,
      };
      querySnapshot.forEach((doc) => {
        const docEvent = {
          ...doc.data(),
          id: doc.id,
          position: index,
        };
        window.data.arrayEvents.push(docEvent);
        window.data.tamanho = window.data.arrayEvents.length;
      });

      document.querySelector('.container-category').innerHTML = `
      ${templateCategory({ src: 'img/tickets.png', title: 'Todos' })}
      ${templateCategory({ src: 'img/karaoke.png', title: 'Shows' })}
      ${templateCategory({ src: 'img/theater.png', title: 'Teatro' })}
      ${templateCategory({ src: 'img/popcorn.png', title: 'Cinema' })}
      ${templateCategory({ src: 'img/stretching-exercises.png', title: 'Esporte' })}
      ${templateCategory({ src: 'img/museum.png', title: 'Arte' })}
      `;
      const userUid = firebase.auth().currentUser.uid;
      firebase.firestore().collection('users').where('user_uid', '==', userUid)
        .get()
        .then((query) => {
          query.forEach((user) => {
            main.innerHTML = Card(window.data.arrayEvents[index], funcs);
            const arraySalvos = user.data().id_save;

            if (arraySalvos.includes(window.data.arrayEvents[index].id)) {
              const bookmark = document.querySelector('.save');
              bookmark.classList.add('fas');
              bookmark.classList.remove('far');
            }
          });
        });
    });
};


const save = (id) => {
  console.log(event.currentTarget);
  const user = firebase.auth().currentUser.uid;

  if (event.currentTarget.classList.contains('far')) {
    event.currentTarget.classList.add('fas');
    event.currentTarget.classList.remove('far');
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
  } else {
    event.currentTarget.classList.add('far');
    event.currentTarget.classList.remove('fas');
    firebase.firestore().collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (user === doc.data().user_uid) {
            firebase.firestore().collection('users').doc(doc.id)
              .update({
                id_save: firebase.firestore.FieldValue.arrayRemove(id),
              });
          }
        });
      });
  }
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
document.querySelector('.fa-angle-left').addEventListener('click', swipeLeft);
document.querySelector('.fa-angle-right').addEventListener('click', swipeRight);

export default funcs;
