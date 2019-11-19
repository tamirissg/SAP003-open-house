import Card from '../components/main-card.js';

const hammer = new Hammer(document.querySelector('main'));
let tamanho = 0;
let index = 0;
let arrayIndex = 0;


const swipeRight = () => {
  (index === tamanho - 1) ? index = 0 : index++;
  const card = document.querySelector('article');
  card.className = 'card card-size p-1 cards-background swiping-right';
  card.addEventListener('animationend', getEvents );
};

const swipeLeft = () => {
  (index === 0) ? index = tamanho -1 : index--;
  const card = document.querySelector('article');
  card.className = 'card card-size p-1 cards-background swiping-left';
  card.addEventListener('animationend', getEvents );
};


const moreInfo = (id) => {
  location.hash = id;
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
      document.querySelector('main').innerHTML = Card(arrayEvents[index], funcs);
    })};
    
const templateFilterRegion = () => {
  const template = `
  <select id="select-section" >
  <option  value="Zona Leste">Zona Leste</option>
  <option value="Zona Sul">Zona Sul</option>
  </select>
  `;
  return template;
}
    
document.querySelector('.filter-region').innerHTML = templateFilterRegion();

const filterRegion = () => {
  const db = firebase.firestore().collection('events');
  const arrayRegion = []
const teste = 'Zona Leste';
  db.where('region', '==', teste)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const docEvent = {
          ...doc.data(),
          id: doc.id,
          position: 0,
        };
        tamanho = arrayRegion.length+1;
       arrayRegion.push(docEvent)
        console.log(index);
      });
      document.querySelector('main').innerHTML = Card(arrayRegion[index], funcs);
  });
};

const printSelect = document.getElementById('select-section');
  printSelect.addEventListener('change', () => {
    filterRegion();
  })


const funcs = {
  swipeLeft,
  swipeRight,
  moreInfo,
  getEvents,
};

hammer.on('swiperight', swipeRight);
hammer.on('swipeleft', swipeLeft);

export default funcs;
