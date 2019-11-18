import Card from '../components/main-card.js';

const getEvents = () => {
  firebase.firestore().collection('events')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        document.querySelector('main').innerHTML = Card(doc.data());
      });
    });
};

export default getEvents;
