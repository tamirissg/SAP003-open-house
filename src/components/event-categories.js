const templateCategory = (props) => {
  const template = `
    <div class="div-category">
        <button class="b-category" Id='category' onclick="a.handleClick(event, ${props.onClick})">
            <img src=${props.src} alt="" class="img-category">
        </button>
           <a href="" class="a-category"><p class="p-category">${props.title}</p></a>
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
