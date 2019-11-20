import Card from '../components/main-card.js';

const getCategory = () => {
  console.log(event.originalTarget.innerText)
  const category = event.originalTarget.innerText;
  firebase.firestore().collection('events')
  .where('type', '==', category)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      document.querySelector('main').innerHTML = '';
      document.querySelector('main').innerHTML = Card(doc.data())
      console.log(doc.data())
    })
  })
  


/*     const db = firebase.firestore().collection('events');
    const arrayType = []
  const teste = 'Arte';
    db.where('type', '==', teste)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docEvent = {
            ...doc.data(),
            id: doc.id,
            position: 0,
          };
          tamanho = arrayType.length+1;
         arrayType.push(docEvent)
          console.log(index);
        });
        document.querySelector('main').innerHTML = templateCategory(arrayType[index], type);
    }); */
};
  
 
export default getCategory;