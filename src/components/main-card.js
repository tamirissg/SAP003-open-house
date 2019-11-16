function Card(props) {
  const template = `
    <div class=${props.class}>
      ${props.children}
    </div>
  `;
  return template;
}

export default Card;
