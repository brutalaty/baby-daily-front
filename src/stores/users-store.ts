import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useIsLoading } from 'src/composables/isloading';
import { useHasError } from 'src/composables/haserror';
import { api } from 'src/boot/axios';
import User from 'src/types/User';

export const useUsersStore = defineStore('users', () => {
  const state = ref<User>({
    id: -1,
    name: '',
    email: '',
    avatar: '',
    created_at: '',
    updated_at: '',
  });

  const user = computed(() => state.value);

  async function downloadUser() {
    setLoadingOn();
    setErrorOff();

    try {
      const response = await api.get('user');
      state.value = response.data;
    } catch (e) {
      setErrorOn();
      console.error(
        'Failed to get user from the server, may not be logged in or have a session'
      );
    } finally {
      setLoadingOff();
    }
  }

  const { hasError, setErrorOn, setErrorOff } = useHasError();

  const { isLoading, setLoadingOn, setLoadingOff } = useIsLoading();

  return {
    user,
    downloadUser,

    hasError,
    setErrorOn,
    setErrorOff,

    isLoading,
    setLoadingOn,
    setLoadingOff,
  };
});
