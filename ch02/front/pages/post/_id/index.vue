<template>
  <v-container v-if="post">
      <post-card :post="post"></post-card>
  </v-container>
  <div v-else>
      해당 아이디의 게시글이 없습니다.
  </div>
</template>

<script>
//TODO: 아래 내용 확인해보기
// _id 폴더에 index.vue로 생성하는 경우 localhost:3000/post인 경우 매칭되지 않음. localhost:3000/post/123 이런식으로 뒤에 아이디가 오는 경우에만 매칭됨
// 현재 버전에서는 버그가 있어서 안됨

import PostCard from '~/components/PostCard';

export default {
    components: {
        PostCard
    },
    computed: {
        post() {
            return this.$store.state.posts.mainPosts.find(v => v.id === parseInt(this.$route.params.id, 10));
        }
    }
}
</script>
  
<style>

</style>script