const getEvents = () => {
  firebase.firestore().collection('events')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    });
};

export default getEvents;
