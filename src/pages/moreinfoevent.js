// funcão get do evento com id específico;
// função api mapa;
// template do card especifico do evento;
// possibilidade de voltar para a página anterior (guardar hash anterior);

const moreInfoTemplate = (props) => {
  const template = `
  <article class="card mb-3 cards-background p-1 more-info">
    <img src=${props.img} class="moreinfo-card mb-1" alt="...">
    <div class="card-body bg-white">
      <h5 class="card-title text-truncate font-regular-size"><span class="font-weight-bold">${props.title}</span> ${props.date} - ${props.hour}</h5>
      <p class="font-regular-size font-weight-bold">Avaliações:</p>
      <p class="font-regular-size"><span class="font-weight-bold">Descrição: </span>${props.description}</p>
      <p class="card-text text-truncate font-regular-size m-0"><i class="fas fa-map-marker-alt icon-small-size"></i> ${props.local}</p>
    </div>
    <div id="mapContainer" class="mt-1"></div>
  </article>
  `;
  return template;
};

const getMoreEvent = (id) => {
  const noHashId = id.replace(/#/, '');
  firebase.firestore().collection('events').doc(noHashId).get()
    .then((doc) => {
      document.querySelector('main').innerHTML = moreInfoTemplate(doc.data());     
      getMap(doc.data().location);
    });
};

const getMap = (searchText) => {
  let platform = new H.service.Platform({
    apikey: 'O9FC31KMgVFrvFFFc5QIMm2GWYnXeCpHXjRox3A0ENs',
  });

  let maptypes = platform.createDefaultLayers();

  let map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.vector.normal.map,
    {
      zoom: 14,
    },
  );

  const geocodingParams = {
    searchText,
  };

  const onResult = function (result) {
    const locations = result.Response.View[0].Result;
    let position;
    let marker;
    // Add a marker for each location found
    for (let i = 0; i < locations.length; i++) {
      position = {
        lat: locations[i].Location.DisplayPosition.Latitude,
        lng: locations[i].Location.DisplayPosition.Longitude,
      };

      map.setCenter(position);
      marker = new H.map.Marker(position);
      map.addObject(marker);
    }
  };

  console.log(searchText)

  const geocoder = platform.getGeocodingService();
  geocoder.geocode(geocodingParams, onResult);
};

export default getMoreEvent;

//local falta são paulo, brazil