const cardsTemplate = (event) => {
  const template = `
    <article class="card" style="width: 18rem;">
        <div class="d-flex justify-content-between">
            <div>
                Avaliações
            </div>
            <div>
                <i class="fas fa-share-alt"></i>
                <i class="far fa-bookmark"></i>
            </div>
        </div>
        <img class="card-img-top" src=${event.img} alt="Imagem de capa do card">
        <div class="card-body p-2">
            <h5 class="card-title text-truncate font-weight-bold font-regular-size">${event.title}</h5>
            <p class="card-text font-regular-size">${event.date} - ${event.hour}</p>
            <p class="card-text text-truncate font-regular-size"><i class="fas fa-map-marker-alt"></i> ${event.local}</p>
        </div>
    </article>
    `;

  return template;
};

const getEvents = () => {
  firebase.firestore().collection('events')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        document.querySelector('main').innerHTML = cardsTemplate(doc.data());
      });
    });
};

export default getEvents;
