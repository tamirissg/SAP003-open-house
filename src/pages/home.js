const hammer = new Hammer(document.querySelector('main'));
let tamanho = 0;
let index = 0;


const cardsTemplate = (event) => {
  const template = `
    <article class="card card-size p-1 cards-background">
        <div class="d-flex justify-content-between p-2 bg-white">
            <div>
                <p class="font-regular-size m-0 font-weight-bold">Avaliações:</p>
            </div>
            <div>
                <i class="far fa-bookmark icon-regular-size"></i>
            </div>
        </div>
        <img class="img-card my-1" src=${event.img} alt="Imagem de capa do card">
        <div class="card-body p-2 d-flex bg-white justify-content-between">
            <div class="w-75">
                <h5 class="card-title text-truncate font-weight-bold font-regular-size mb-1">${event.title}</h5>
                <p class="card-text font-regular-size mb-1">${event.date} - ${event.hour}</p>
                <p class="card-text text-truncate font-regular-size m-0"><i class="fas fa-map-marker-alt icon-small-size"></i> ${event.local}</p>
            </div>
            <div class="d-flex align-items-center flex-column justify-content-around">
                <i class="fas fa-plus icon-regular-size"></i>
                <p class="font-small-size text-center m-0">Saiba Mais</p>
            </div>
        </div>
    </article>
    `;

  return template;
};

const getEvents = () => {
  firebase.firestore().collection('events')
    .get()
    .then((querySnapshot) => {
      const arrayEvents = []
      querySnapshot.forEach((doc) => {
        arrayEvents.push(doc.data())        
        tamanho = arrayEvents.length;
      });  
      document.querySelector('main').innerHTML = cardsTemplate(arrayEvents[index]); 
    });
};


hammer.on('swiperight', () => {
  (index === tamanho - 1) ? index = 0 : index++;
  getEvents();   
})

hammer.on('swipeleft', () => { 
  (index === 0) ? index = tamanho -1 : index--;
  getEvents();       
})


export default getEvents;
