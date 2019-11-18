function loginFacebook() {

  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then(function(result) {  
      
            
  }).catch(function(error) {
    alert("Falha na autenticação")
    
            
  });  
};

export default loginFacebook;