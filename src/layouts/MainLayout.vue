<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/')"
          flat
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
        />
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          v-go-back.single
          flat
          dense
          icon="arrow_back"
        />
        <q-toolbar-title class="absolute-center">{{ title }}</q-toolbar-title>
        <q-btn
          v-if="!user_details.userId"
          to="/login"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          flat
          dense
          no-caps
          label="Login"
        />
        <q-btn-dropdown
          class="absolute-right q-pr-sm"
          v-else
          color="white"
          dense
          flat
          :label="user_details.name"
          dropdown-icon="change_history"
        >
          <q-list>
            <q-item clickable v-close-popup @click="logOut()">
              <q-item-section>
                <q-item-label>Log Out</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list v-for="(menuItem, index) in menuList" :key="index">
          <q-item
            :to="menuItem.link"
            clickable
            :active="menuItem.label === 'Outbox'"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>{{ menuItem.label }}</q-item-section>
          </q-item>

          <q-separator v-if="menuItem.separator" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      menuList: [
        {
          icon: "inbox",
          label: "Inbox",
          separator: true,
          link: "/"
        },
        {
          icon: "send",
          label: "Outbox",
          separator: false,
          link: "/chat"
        },
        {
          icon: "delete",
          label: "Trash",
          separator: false
        },
        {
          icon: "error",
          label: "Spam",
          separator: true
        },
        {
          icon: "settings",
          label: "Settings",
          separator: false
        },
        {
          icon: "feedback",
          label: "Send Feedback",
          separator: false
        },
        {
          icon: "help",
          iconColor: "primary",
          label: "Help",
          separator: false
        }
      ]
    };
  },
  computed: {
    ...mapState("LoginRegister", ["user_details"]),
    // eslint-disable-next-line vue/return-in-computed-property
    title() {
      let currentPath = this.$route.fullPath;
      if (currentPath == "/") return "SLF Counciling";
      else if (currentPath == "/chat") return "Chat";
      else if (currentPath == "/login") return "Login";
      else if (currentPath == "/users") return "Users";
    }
  },
  methods: {
    ...mapActions("LoginRegister", ["userLogOut"]),
    logOut() {
      this.userLogOut();
    }
  }
};
</script>
