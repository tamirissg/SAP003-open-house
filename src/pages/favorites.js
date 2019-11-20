const favoritesTemplate = (props) => {
  const template = `
  <article class="card d-flex flex-row favorite-card-width">
    <img src=${props.img} class="favorite-card-img">
    <div class="card-body favorite-card-body">
    <h5 class="card-title text-truncate font-weight-bold font-regular-size mb-1">${props.title}</h5>
    <p class="card-text font-regular-size mb-1">${props.date} - ${props.hour}</p>
    </div>
</article>
    `;
return template;
};

const getFavorites = () => {
  const user = firebase.auth().currentUser.uid;

  firebase.firestore().collection('users')
    .where('user_uid', '==', user)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.data().id_save.forEach((ref) => {
          firebase.firestore().collection('events')
            .doc(ref)
            .get()
            .then((querySnapshot2) => {
              document.querySelector('main').innerHTML = favoritesTemplate(querySnapshot2.data());
            });
        });
      });
    });
};

export default getFavorites;
