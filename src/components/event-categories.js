const templateCategory = (props) => {
  const template = `
    <div class="div-category">
        <a href="#Tipo-${props.title}" class="a-category">
            <img src=${props.src} alt="" class="img-category">
            <p class="p-category">${props.title}</p>
        </a>
    </div>
    `;
  return template;
};

export default templateCategory;
