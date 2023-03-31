<template>
  <section>
    <NavBar back="/" :title="STRINGS.get('registrate')" />
    <div class="container-fluid text-center">
      <div class="my-5">
        <form ref="signup_form">
          <div class="mb-3">
            <input class="form-control" type="text" :placeholder="STRINGS.get('nombre')" required>
          </div>
          <div class="mb-3">
            <input class="form-control" type="email" :placeholder="STRINGS.get('correo')" required>
          </div>
          <div class="mb-3">
            <input class="form-control" type="password" :placeholder="STRINGS.get('password')" required>
          </div>
          <div class="mb-3">
            <input class="form-control" type="password" :placeholder="STRINGS.get('password_check')" required>
          </div>
          <div class="d-grid gap-2 mt-5 mt-auto">
            <a class="btn btn-primary mb-4" role="button">{{ STRINGS.get("registrate") }}</a>
          </div>
        </form>
        <p class="mb-3">{{ STRINGS.get("tiene_cuenta") }} <NuxtLink to="/">{{ STRINGS.get("ingresa") }}</NuxtLink></p>
        <p class="mb-3"><small>{{ STRINGS.get("nota2") }}</small></p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SignupPage",
  data () {
    return {

    };
  }
};
</script>
