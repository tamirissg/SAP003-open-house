const profile = (user) => {
  const template = `
    <div class="all-content">
      <div class="content-one">
      <img  class="img-profile" src="./testeprofile.png" />
      <div class="name">
        <span class="name-user">${user.nome} ${user.sobrenome}</span>
      </div>
      </div>
      <div class="border"></div>
      <div class="content-two">
        <div class="content">
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

const getProfile = () => {
  const userId = firebase.auth().currentUser.uid;
  firebase.firestore().collection('users').where('user_uid', '==', userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        document.querySelector('main').innerHTML = profile(doc.data());
      });
    })
    .then(() => {
      const logoutBtn = document.querySelector('.logout');
      logoutBtn.addEventListener('click', () => {
        firebase.auth().signOut()
          .then(() => {
            window.location = '';
          });
      });
    });
};

export default getProfile;
