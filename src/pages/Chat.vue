<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-4 text-center">
      User is offline
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="(message, index) in messages"
        :key="index"
        :name="message.from"
        :text="[message.text]"
        stamp="7 minutes ago"
        :sent="message.from == 'me' ? true : false"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-input
          bg-color="white"
          class="full-width"
          rounded
          outlined
          v-model="newMessage"
          label="Message"
          @keyup.enter="sendMessage"
          dense
        >
          <template v-slot:after>
            <q-btn
              @click.native="sendMessage"
              round
              dense
              flat
              color="white"
              icon="send"
            />
          </template>
        </q-input>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      newMessage: "",
      ph: "",
      dense: false,
      messages: [
        {
          text: "Hello",
          from: "me"
        },
        {
          text: "hi how are u",
          from: "them"
        },
        {
          text: "fine",
          from: "me"
        }
      ]
    };
  },
  methods: {
    sendMessage() {
      this.messages.push({
        text: this.newMessage,
        from: "me"
      });
    }
  }
};
</script>
