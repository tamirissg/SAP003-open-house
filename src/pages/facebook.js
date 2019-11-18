function loginFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {


    }).catch((error) => {
      alert('Falha na autenticação');
    });
}

export default loginFacebook;
