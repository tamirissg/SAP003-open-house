function loginGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {


    }).catch((error) => {
      alert('Falha na autenticação');
    });
}

export default loginGoogle;
