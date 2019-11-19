import Card from '../components/main-card.js';

const hammer = new Hammer(document.querySelector('main'));
let tamanho = 0;
let index = 0;
let arrayIndex = 0;


const swipeRight = () => {
  console.log('direita');
  
  (index === tamanho - 1) ? index = 0 : index++;
  const card = document.querySelector('article');
  card.className = 'card card-size p-1 cards-background swiping-right';
  card.addEventListener('animationend', getEvents);
};

const swipeLeft = () => {
  (index === 0) ? index = tamanho -1 : index--;
  const card = document.querySelector('article');
  card.className = 'card card-size p-1 cards-background swiping-left';
  card.addEventListener('animationend', getEvents);
};

const moreInfo = (id) => {
  location.hash = id;
};

const getEvents = () => {
  firebase.firestore().collection('events')
    .get()
    .then((querySnapshot) => {
      const arrayEvents = []
      querySnapshot.forEach((doc) => {
        const docEvent = {
          ...doc.data(),
          id: doc.id,
          position: arrayIndex++,
        };
        arrayEvents.push(docEvent);
        tamanho = arrayEvents.length;
      });      
      document.querySelector('main').innerHTML = Card(arrayEvents[index], funcs);
})};

const funcs = {
  swipeLeft,
  swipeRight,
  moreInfo,
  getEvents,
};

hammer.on('swiperight', swipeRight);
hammer.on('swipeleft', swipeLeft);

export default funcs;
