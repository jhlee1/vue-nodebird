<template>
    <v-app>
        <nav>
            <v-toolbar dark color="green">
                <v-toolbar-title>
                    <nuxt-link to="/">NodeBird</nuxt-link>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-text-field label="검색" hide-details prepend-icon="mdi-magnify" :style="{display: 'flex', alignItems: 'center'}" />
                    <v-btn text nuxt to="/profile" :style="{display: 'flex', alignItems: 'center'}">
                        <div>프로필</div>
                    </v-btn>
                    <v-btn text nuxt to="/signup" :style="{display: 'flex', alignItems: 'center'}">
                        <div>회원가입</div>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </nav>
        <v-row no-gutters>
            <v-col cols="12" md="4"> <!-- cols가 xs의 역할을 하기 때문에 따로 쓸 필요 없음 -->
                <login-form />
            </v-col>
            <v-col cols="12" md="8">
                <nuxt />
            </v-col>
        </v-row>
    </v-app>
</template>
<script>
    import LoginForm from '~/components/LoginForm';

    export default {
        components: {
            LoginForm,
        },
    };
</script>
