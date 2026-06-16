<script setup lang="ts">
const client = useCmsClient();
const { data: formDef } = await useForm('iletisim');
const values = reactive<Record<string, string>>({});
const status = ref<'idle' | 'sending' | 'ok' | 'error'>('idle');
const message = ref('');

watchEffect(() => {
  for (const field of formDef.value?.fields ?? []) {
    if (!(field.name in values)) values[field.name] = '';
  }
});

async function submit() {
  status.value = 'sending';
  message.value = '';
  const res = await client.submitForm('iletisim', values);
  if (res.success) {
    status.value = 'ok';
    message.value = 'Mesajınız gönderildi.';
    for (const key of Object.keys(values)) values[key] = '';
  } else {
    status.value = 'error';
    message.value = res.error?.message ?? 'Gönderim başarısız.';
  }
}
</script>

<template>
  <div class="section">
    <div class="container form-wrap">
      <h1 class="page-title">{{ formDef?.title || 'İletişim' }}</h1>
      <form v-if="formDef" @submit.prevent="submit">
        <div v-for="field in formDef.fields" :key="field.name" class="form-field">
          <label :for="field.name">{{ field.label }}</label>
          <textarea v-if="field.type === 'textarea'" :id="field.name" v-model="values[field.name]" rows="4" />
          <input v-else :id="field.name" v-model="values[field.name]" :type="field.type === 'email' ? 'email' : 'text'" />
        </div>
        <button class="submit-btn" type="submit" :disabled="status === 'sending'">
          {{ status === 'sending' ? 'Gönderiliyor...' : 'Gönder' }}
        </button>
      </form>
      <p v-if="message" :class="status === 'ok' ? 'ok' : 'error-box'">{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
.form-wrap {
  max-width: 36rem;
}

.ok {
  color: #166534;
  margin-top: 1rem;
}
</style>
