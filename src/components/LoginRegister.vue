<template>
  <q-form @submit.prevent="submitForm()">
    <q-input
      v-if="tab == 'register'"
      outlined
      class="q-mb-md"
      v-model="formData.name"
      label="Name"
    />
    <q-input
      outlined
      class="q-mb-md"
      type="email"
      v-model="formData.email"
      label="Email"
    />
    <q-input
      outlined
      class="q-mb-md"
      type="password"
      v-model="formData.password"
      label="Password"
    />
    <div class="row">
      <q-space />
      <q-btn type="submit" color="primary" :label="tab" />
    </div>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        profile_pic: null
      },
      text: ""
    };
  },
  methods: {
    ...mapActions("LoginRegister", ["registerUser", "loginUser"]),
    submitForm() {
      if (this.tab == "login") {
        this.loginUser(this.formData);
      } else {
        this.registerUser(this.formData);
      }
    }
  }
};
</script>
