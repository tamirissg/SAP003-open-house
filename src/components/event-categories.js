const templateCategory = (props) => {
  const template = `
    <div class="div-category">
        <a href="" class="a-category">
            <img src=${props.src} alt="" class="img-category">
            <p class="p-category">${props.title}</p>
        </a>
    </div>
    `;
  return template;
};

window.a = {
  handleClick: (event, callBack) => {
    callBack(event.target.id);
  },
};

export default templateCategory;
