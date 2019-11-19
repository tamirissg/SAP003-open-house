import Card from '../components/main-card.js';

const hammer = new Hammer(document.querySelector('section'));
let tamanho = 0;
let index = 0;


const getEvents = () => {
  firebase.firestore().collection('events').orderBy('date') 
    .get()
    .then((querySnapshot) => {
      const arrayEvents = []
      querySnapshot.forEach((doc) => {
        arrayEvents.push(doc.data())        
        tamanho = arrayEvents.length;
      });
    document.querySelector('section').innerHTML = Card(arrayEvents[index]);
})};

hammer.on('swipeleft', () => {
  (index === tamanho - 1) ? index = 0 : index++;
  getEvents();   
});

hammer.on('swiperight', () => { 
  (index === 0) ? index = tamanho -1 : index--;
  getEvents();       
});


export default getEvents;

