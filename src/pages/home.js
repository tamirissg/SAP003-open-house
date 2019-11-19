import Card from '../components/main-card.js';

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
  (index === 0) ? index = tamanho -1 : index--;
  const card = document.querySelector('article');
  card.className = 'card card-size p-1 cards-background swiping-left';
  card.addEventListener('animationend', getEvents);
};

const moreInfo = (id) => {
  window.location.hash = id;
};

const getEvents = () => {
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
      document.querySelector('main').innerHTML = Card(arrayEvents[index], funcs);

    });
};


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

function templateCategory(){
const template = `
        <div class="container-category" class="grid">
            <div class="div-category">
                <a href="" class="a-category">
                    <img src="img/tickets.png" alt="" class="img-category">
                    <p class="p-category">Todos</p>
                </a>
            </div>
            <div class="div-category">
                <a href="" class="a-category">
                    <img src="img/karaoke.png" alt="" class="img-category">
                    <p class="p-category">Shows</p>
                </a>
            </div>
            <div class="div-category">
                <a href="" class="a-category">
                    <img src="img/theater.png" alt="" class="img-category">
                    <p class="p-category">Teatro</p>
                </a>
            </div>
            <div class="div-category">
                <a href="" class="a-category">
                    <img src="img/popcorn.png" alt="" class="img-category">
                    <p class="p-category">Cinema</p>
                </a>
            </div>
            <div class="div-category">
                <a href="" class="a-category">
                    <img src="img/stretching-exercises.png" alt="" class="img-category">
                    <p class="p-category">Esporte</p>
                </a>
            </div>
            <div class="div-category">
                <a href="" class="a-category">
                    <img src="img/museum.png" alt="" class="img-category">
                    <p class="p-category">Arte</p>
                </a>
            </div>
    </div>
  
`;


return document.getElementById('section-category').innerHTML = template;

};

templateCategory();


export default funcs;

