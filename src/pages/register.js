const registerPage = () => {
  document.querySelectorAll('.arrow').forEach((arrow) => arrow.classList.add('hide'));
  const template = `
  <h3 class='mb-3'>Seja bem vindo(a)!</h3>
    <form>
      <div class="form-group">
        <input type="text" class="form-control nome-input" placeholder="Nome e Sobrenome">
        <input type="email" class="form-control email-register-input" placeholder="Email">
        <input type="password" class="form-control password-register-input" placeholder="Senha">
        <input type="password" class="form-control confirm-password-input" placeholder="Confirmar senha">
      </div>
      <button type="submit" class="btn btn-primary register-btn btn-block entry">Registrar</button>
      <div class='error'></div>
    </form>
  `;

  const main = document.querySelector('main');

  const create = (event) => {
    event.preventDefault();
    const email = document.querySelector('.email-register-input').value;
    const password = document.querySelector('.password-register-input').value;
    const passwordConfirmation = document.querySelector('.confirm-password-input').value;
    const name = document.querySelector('.nome-input').value;
    const errorMessage = document.querySelector('.error');
    if (name === '' || email === '' || password === '') {
      errorMessage.textContent = 'Preencha os campos em branco';
    } else if (password !== passwordConfirmation) {
      errorMessage.textContent = 'Senha não confere';
    } else if (password === passwordConfirmation) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase.auth().currentUser.updateProfile({ displayName: name });
          const user = firebase.auth().currentUser;
          if (user != null) {
            const userInfo = {
              nome: name,
              user_uid: user.uid,
            };
            firebase.firestore().collection('users').add(userInfo);
          }
        })
        .then(() => {
          window.location.hash = '';
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/weak-password') errorMessage.textContent = 'A senha deve possuir no mínimo 6 caracteres';
          if (errorCode === 'auth/email-already-in-use') errorMessage.textContent = 'O e-mail informado já está em uso';
          if (errorCode === 'auth/operation-not-allowed') errorMessage.textContent = 'Conta não ativada';
          if (errorCode === 'auth/invalid-email') errorMessage.textContent = 'Email inválido';
        });
    }
  };

  $('#myModal').modal('hide');
  document.querySelector('.container-category').textContent = '';
  main.innerHTML = template;

  document.querySelector('.register-btn').addEventListener('click', create);
};

export default registerPage;
