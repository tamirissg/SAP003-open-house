function profile() {
  const template = `
    <div class="all-content">
      <div class="content-one">
      <img  class="img-profile" src="./testeprofile.png" />
      <div class="name">
        <span class="name-user">Fulana de tal</span>
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
        <div class="content">
          <i class="icon fas fa-sign-out-alt"></i>
          <span class="options">Logout</span>
        </div>
        <div class="border"></div>
      </div>
    </div>
  `;
  return template;
}

export default profile;
