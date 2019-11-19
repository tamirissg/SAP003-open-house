import Button from '../components/button.js';

const openForm = (e) => {
  console.log("form aberto")
};

function Info() {
  const template = `
    <article class="description">
      <h1>O Zero800</h1>
      <span> É uma plataforma que conecta pessoas aos mais extraordinários eventos gratuitos na cidade de São Paulo.
      Através dos nossos serviços possibilitamos que organizadores possam criar, organizar, gerir e divulgar eventos, proporcionando a melhor experiência
      na busca de eventos gratuitos. 
      </span>
      <p> Zero800 a melhor plataforma de busca!</p>
      </article>
      <div class="border"></div>
      <div class="container-button">
        ${Button({ title: 'Fale Conosco', class: 'button-info', onClick: openForm })}
      </div>
    `;
  return template;
}

export default Info;
