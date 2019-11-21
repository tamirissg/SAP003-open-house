const profile = (props) => {
  const template = `
    <div class="all-content">
      <div class="content-one">
      <img  class="img-profile" src="./testeprofile.png" />
      <div class="name">
        <span class="name-user">${props.nome}</span>
      </div>
      </div>
      <div class="border"></div>
      <div class="content-two">
        <div class="content edit-profile">
        <i class="icon fas fa-pencil-alt"></i>
        <span class="options"> Editar perfil</san>
        <div class="border-desktop"></div>
        </div>
        <div class="border"></div>
        <div class="content logout">
          <i class="icon fas fa-sign-out-alt"></i>
          <span class="options">Logout</span>
        </div>
        <div class="border"></div>
      </div>
    </div>
  `;
  return template;
};

const getUser = () => {
  const main = document.querySelector('main');
  const user = firebase.auth().currentUser.uid;
  document.querySelector('.container-category').innerHTML = '';
  document.querySelectorAll('.arrow').forEach((arrow) => arrow.classList.add('hide'));

  firebase.firestore().collection('users')
    .where('user_uid', '==', user)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        main.innerHTML = profile(doc.data());
      });
    })
    .then(() => {
      document.querySelector('.logout').addEventListener('click', () => {
        firebase.auth().signOut()
          .then(window.location.hash = '');
      });
      document.querySelector('.edit-profile').addEventListener('click', () => {
        console.log('editar');
        $('#edit-name').modal('show');
      });
    });
};

export default getUser;
