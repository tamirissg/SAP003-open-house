const getEvents = () => {
  firebase.firestore().collection('events')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    });
};

const cardsTemplate = () => {};

export default getEvents;
