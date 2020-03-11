<template>
    <v-container>
        <post-form v-if="me" />
        <div>
            <post-card/>
            <post-card/>
            <post-card/>
            <post-card/>
        </div>
    </v-container>
</template>

<script>
    import PostCard from '~/components/PostCard';
    import PostForm from '~/components/PostForm';

    export default {
        components: {
            PostCard,
            PostForm
        },
        data() {
            return {
                name: 'nuxt.js',
            }
        },
        computed: {
            me() {
                return this.$store.state.users.me;
            }
        }
        // head() {
        //     return {
        //         title: '메인화면'
        //     }
        // }
    }
</script>
