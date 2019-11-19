import Card from '../components/main-card.js';

const hammer = new Hammer(document.querySelector('main'));
let tamanho = 0;
let index = 0;
let arrayIndex = 0;


const swipeLeft = () => {
  (index === tamanho - 1) ? index = 0 : index++;
  const card = document.querySelector('article');
  card.className = 'card card-size p-1 cards-background swiping-left';
  card.addEventListener('animationend', getEvents);
};

const swipeRight = () => {
  (index === 0) ? index = tamanho -1 : index--;
  const card = document.querySelector('article');
  card.className = 'card card-size p-1 cards-background swiping-right';
  card.addEventListener('animationend', getEvents);
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

const save = (id) => {
  const user = firebase.auth().currentUser.uid;

  firebase.firestore().collection('users')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (user === doc.data().user_uid) {
        firebase.firestore().collection('users').doc(doc.id)
        .update({
          id_save: firebase.firestore.FieldValue.arrayUnion({
          id}),
        })        
    }
  }    
  )});  
}

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
