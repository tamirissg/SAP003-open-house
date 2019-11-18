function loginGoogle() {

  let provider = new firebase.auth.GoogleAuthProvider();  
  firebase.auth().signInWithPopup(provider)
  .then(function(result) {
          
              
  }).catch(function(error) {
    alert("Falha na autenticação")
    
           
  });  
};

export default loginGoogle;