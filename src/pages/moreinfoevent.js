// funcão get do evento com id específico;
// função api mapa;
// template do card especifico do evento;
// possibilidade de voltar para a página anterior (guardar hash anterior);

const moreInfoTemplate = (props) => {
  console.log(props.title);
  const template = `
  <article>
  ${props.title}
  <img src=${props.img} />
  </article>
  `;
  return template;
};

const getMoreEvent = (id) => {
  const noHashId = id.replace(/#/, '');
  firebase.firestore().collection('events').doc(noHashId).get()
    .then((doc) => {
      moreInfoTemplate(doc.data());
    });
};

export default getMoreEvent;
