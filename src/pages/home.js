import Card from '../components/main-card.js';

const hammer = new Hammer(document.querySelector('section'));
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
  (index === 0) ? index = tamanho -1 : index--;
  const card = document.querySelector('article');
  card.className = 'card card-size p-1 cards-background swiping-left';
  card.addEventListener('animationend', getEvents);
};

const getEvents = () => {
  firebase.firestore().collection('events').orderBy('date') 
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
      document.querySelector('main').innerHTML = Card(arrayEvents[index], [swipeLeft, swipeRight]);
})};

hammer.on('swiperight', swipeRight);
hammer.on('swipeleft', swipeLeft);



export default getEvents;
