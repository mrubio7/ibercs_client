<script setup lang="ts">
import UserProfile from '@/components/ibercs/user/components/UserProfile.vue';
import UserState from '@/components/ibercs/user/user_state';
import Loader from '@/components/ui/loader/Loader.vue'
import { User_Auth } from '@/entities/user';
import { ref, watchEffect } from 'vue';

const myUser = ref<User_Auth | null>(null)
const loader = ref<Boolean>(true)

watchEffect(() => {
    myUser.value = UserState
    if (myUser.value.FaceitId !== "") {
        loader.value = false
    }
})

</script>

<template>
    <section v-if="loader">
        <div class="pt-2 pb-4">
            <Loader />
        </div>
    </section>
    <section v-else>
        <div v-if="myUser">
            <UserProfile :user="myUser" :roles="myUser.Roles" :my-profile="true" />
        </div>
    </section>
</template>