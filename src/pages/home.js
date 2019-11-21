import Card from '../components/main-card.js';
import templateCategory from '../components/event-categories.js';
import Select from '../components/input.js';

const hammer = new Hammer(document.querySelector('main'));
let index = 0;
let tamanho = 0;

const checkFilter = () => {
  if (window.location.hash.includes('Tipo')) {
    getCategory('type', window.location.hash);
  } else if (window.location.hash.includes('Regiao')) {
    getCategory('region', window.location.hash);
  }
}

const swipeRight = () => {
  (index === tamanho - 1) ? index = 0 : index += 1;  
  const card = document.querySelector('article');
  card.className = 'card card-size p-1 cards-background swiping-right';
  if (tamanho !== 11) {
    card.addEventListener('animationend', checkFilter);
  } else {
    card.addEventListener('animationend', getEvents);
  }
};


const swipeLeft = () => {
  (index === 0) ? index = tamanho - 1 : index -= 1;
  const card = document.querySelector('article');
  card.className = 'card card-size p-1 cards-background swiping-left';
  if (tamanho !== 11) {
    card.addEventListener('animationend', checkFilter);
  } else {
    card.addEventListener('animationend', getEvents);
  }
};

const moreInfo = (id) => { 
  window.location.hash = id;
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
        window.data.arrayEvents.push(docEvent);
        tamanho = data.arrayEvents.length;       
      });
      document.querySelector('.container-category').innerHTML = `
      ${Select(moreInfo)}
      ${templateCategory({ src: 'img/tickets.png', title: 'Todos' })}
      ${templateCategory({ src: 'img/karaoke.png', title: 'Show' })}
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

const save = (bookmark) => {
  bookmark.classList.add('animated', 'tada');
  if (firebase.auth().currentUser == null) {
    $('#myModal').modal('show');
  } else {
  const user = firebase.auth().currentUser.uid;
  if (bookmark.classList.contains('far')) {
    bookmark.classList.add('fas');
    bookmark.classList.remove('far');
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
    bookmark.classList.add('far');
    bookmark.classList.remove('fas');
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
}
};

const getCategory = (parameter, hash) => {
  const category = hash.replace(/\#(.*?)\-/, '')
  document.querySelector('main').innerHTML = '';

  firebase.firestore().collection('events')
    .where(parameter, 'array-contains', category)
    .orderBy('date')
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
      document.querySelector('.container-category').innerHTML = `
      ${Select(moreInfo)}
      ${templateCategory({ src: 'img/tickets.png', title: 'Todos' })}
      ${templateCategory({ src: 'img/karaoke.png', title: 'Show' })}
      ${templateCategory({ src: 'img/theater.png', title: 'Teatro' })}
      ${templateCategory({ src: 'img/popcorn.png', title: 'Cinema' })}
      ${templateCategory({ src: 'img/stretching-exercises.png', title: 'Esporte' })}
      ${templateCategory({ src: 'img/museum.png', title: 'Arte' })}
      `;
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
document.querySelector('.fa-angle-left').addEventListener('click', swipeLeft);
document.querySelector('.fa-angle-right').addEventListener('click', swipeRight);

export default funcs;
