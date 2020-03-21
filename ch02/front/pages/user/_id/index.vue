<template>
    <v-container>
        <div>
            <post-card v-for="p in mainPosts" :key="p.id" :post="p" />
        </div>
    </v-container>
</template>

<script>
    import PostCard from '~/components/PostCard';
    import PostForm from '~/components/PostForm';

    export default {
        components: {
            PostCard
        },
        data() {
            return {
                name: 'nuxt.js',
            }
        },
        computed: {
            me() {
                return this.$store.state.users.me;
            },
            mainPosts() {
                return this.$store.state.posts.mainPosts;
            },
            hasMorePost() {
                return this.$store.state.posts.hasMorePost;
            }
        },
        fetch({store}) { // component가 mount되기 전 비동기 적으로 store에 데이터를 넣을 수 있도록 사용
            store.dispatch('posts/loadPosts');
        },
        mounted() { // window는 created에서는 못씀
            window.addEventListener('scroll', this.onScroll);
            //  window.scrollY - 내가 얼마나 올리고 내렸는지 알려주는 속성
            // document.documentElement.clientHeight - 현재 보여지는 화면 맨위부터 아래까지 높이
            // document.documentElement.scrollHeight - 스크롤을 최대한 내렸을 때 최대한 내릴 수 있는 높이
            // 스크롤을 제일 아래까지 내린 경우 window.scrollY + document.documentElement.clientHeight === document.documentElement.scrollHeight
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.onScroll());
        },
        methods: {
            onScroll() {
                if( window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                    if (this.hasMorePost) {
                        this.$store.dispatch('posts/loadPosts');
                    }
                }

            }
        }

        // head() { head 설정
        //     return {
        //         title: '메인화면'
        //     }
        // }
    }
</script>
