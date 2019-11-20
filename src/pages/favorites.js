import funcs from './home.js';

const favoritesTemplate = (props) => {
  const template = `
  <article class="card d-flex flex-row favorite-card p-1 cards-background">
    <img src=${props.img} class="favorite-card-img">
    <div class="p-2 favorite-card-body bg-white ml-1">
      <h5 class="card-title text-truncate font-weight-bold font-regular-size mb-1">${props.title}</h5>
      <p class="card-text font-regular-size mb-1">${props.date} - ${props.hour}</p>
      <p class="card-text text-truncate font-regular-size m-0"><i class="fas fa-map-marker-alt icon-small-size"></i> ${props.local}</p>
      <div class="d-flex align-items-center flex-row justify-content-center mt-2" id=${props.id} onClick="a.handleClick(event,${funcs.moreInfo})">
        <i class="fas fa-plus icon-regular-size"></i>
        <p class="text-center mb-0 ml-1"> Saiba Mais</p>
      </div>
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
              const docEvent = {
                ...querySnapshot2.data(),
                id: doc.id,
              }
              document.querySelector('main').innerHTML = favoritesTemplate(docEvent);
            });
        });
      });
    });
};

export default getFavorites;
