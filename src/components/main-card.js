const Card = (props, funcs) => {
  const template = `
    <article class="card card-size p-1 cards-background">
        <div class="d-flex justify-content-end p-2 bg-white">
            <div>
              <i class="far fa-bookmark icon-regular-size save" onClick="main.handleClick(event,${funcs.save})" id=${props.id}></i>
            </div>
        </div>
        <img class="img-card my-1" src=${props.img} alt="Imagem de capa do card">
        <div class="card-body p-2 d-flex bg-white justify-content-between">
            <div class="w-75">
                <h5 class="card-title text-truncate font-weight-bold font-regular-size mb-1">${props.title}</h5>
                <p class="card-text font-regular-size mb-1">${props.date} - ${props.hour}</p>
                <p class="card-text text-truncate font-regular-size m-0"><i class="fas fa-map-marker-alt icon-small-size"></i> ${props.local}</p>
            </div>
            <div class="d-flex align-items-center flex-column justify-content-around" id=${props.id} onClick="main.handleClick(event,${funcs.moreInfo})">
                <i class="fas fa-plus icon-regular-size"></i>
                <p class="font-small-size text-center m-0">Saiba Mais</p>
            </div>
        </div>
    </article>
    `;

  return template;
};

window.main = {
  handleClick: (event, callBack) => {
    callBack(event.currentTarget);
  },
};


export default Card;
