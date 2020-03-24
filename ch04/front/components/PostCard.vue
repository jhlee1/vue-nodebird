<template>
    <div style="margin-bottom: 20px"> <!-- 여기는 왜 :style을 안쓸까? -->
        <v-card >
<!--            <v-image />-->
            <v-card-title>
                <h3>
                    <nuxt-link :to="'/user/' + post.User.id">{{post.User.nickname}}</nuxt-link>
                </h3>
            </v-card-title>
            <v-card-text>
                <div>
                    <div>{{post.content}}</div>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="orange">
                    <v-icon>mdi-twitter-retweet</v-icon>
                </v-btn>
                <v-btn text color="orange">
                    <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
                <v-btn text color="orange" @click="onToggleComment">
                    <v-icon>mdi-comment-outline</v-icon>
                </v-btn>
                <v-btn text color="orange">
                    <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
                <v-menu offset-y open-on-hover>
                    <template v-slot:activator="{ on }">
                        <v-btn text color="orange" v-on="on">
                            <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                    </template>
                    <div style="background: white">
                        <v-btn dark color="red" @click="onRemovePost">삭제</v-btn>
                        <v-btn dark color="orange" @click="onEditPost">수정</v-btn>
                    </div>
                </v-menu>

            </v-card-actions>
        </v-card>
        <template v-if="commentOpened"> <!-- if 를 쓰기 위해 div 대신 template -->
            <comment-form :post-id="post.id"></comment-form>
            <v-list>
                <v-list-item v-for="c in post.Comments" :key="c.id">
                    <v-list-item-avatar color="teal">
                        <span>{{c.User.nickname[0]}}</span>
                    </v-list-item-avatar>
                    <v-list-item-title>{{c.User.nickname}}</v-list-item-title>
                    <v-list-item-subtitle>{{c.content}}</v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </template>
    </div>
</template>

<script>
    import CommentForm from "~/components/CommentForm";

    export default {
        components: {CommentForm},
        props: {
            post: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                commentOpened: false,
            }
        },
        methods: {
            onRemovePost() {
                this.$store.dispatch.remove('posts/remove', {
                    id: this.post.id
                });
            },
            onEditPost() {

            },
            onToggleComment() {
                this.commentOpened = !this.commentOpened;
            }
        }
    }
</script>
<style scoped>
    a {
        color: inherit;
        text-decoration: none;
    }
</style>
