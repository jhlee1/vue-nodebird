<template>
    <v-list-tile>
        <v-list>
            <v-list-item v-for="c in followings" :key="c.id">
                <span>{{c.nickname}}</span>

                <v-btn dark color="red" @click="onRemoveFollowing"><v-icon>mdi-minus-circle-outline</v-icon></v-btn>
            </v-list-item>
        </v-list>
    </v-list-tile>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        computed: {
            followings() {
                return this.$store.state.users.followingList;
            }
        },
        methods: {
            onRemoveFollowing() {
                console.log("Clicked!");
                this.$store.dispatch('users/removeFollowing');
            }
        }
    }
</script>
<style>

</style>
