export const state = () =>({
    mainPosts: [],
    hasMorePost: true,

});

const totalPosts = 51;
const limit = 10;

export const mutations = {
    addMainPost(state, payload) {
        state.mainPosts.unshift(payload);
    },
    removeMainPost(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.id);
        state.mainPosts.splice(index, 1);
    },
    addComment(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id == payload.postId);
        state.mainPosts[index].Comments.unshift(payload)
    },
    loadPosts(state) { // 무한스크롤링 구현. virtual list는 직접 구현하기 복잡하므로 vue-virtual-scroll-list 사용하기
        const diff = totalPosts - state.mainPosts.length; // 아직 안불러온 게시글 수
        const fakePosts = Array(diff > limit ? limit : diff).fill()
            .map(v => ({
                id: Math.random().toString(),
                User: {
                    id: 1,
                    nickname: '제로초'
                },
                content: `Hello infinite scrolling~ ${Math.random()}`,
                Comments: [],
                Images: [],
            }));

        state.mainPosts = state.mainPosts.concat(fakePosts);
        state.hasMorePostMorePost = fakePosts.length === limit;
    },
    concatImagePaths(state, payload) {
        state.imagePaths = state.imagePaths.concat(payload);
    },
    removeImagePath(state, payload) {
        state.imagePaths = state.imagePaths.splice(payload, 1);
    }
};

export const actions = {
    add({ commit, state }, payload) {
        this.$axios.post('http://localhost:3085/post', {
            content: payload.content,
            imagePaths : state.imagePaths
        }, {
           withCredentials: true 
        }
        ).then((res) => {
            commit('addMainPost', res.data); // 같은 module안의 mutation이기 때문에 앞에 posts를 안넣어도됨
        }).catch(() => {

        });

        // commit('addMainPost', payload, { root: true }); 이런식으로 부를 경우 index 꺼의 addMainPost를 불러옴
    },
    remove({commit}, payload) {
        commit('removeMainPost', payload);
    },
    addComment({ commit }, payload ) {
        commit('addComment', payload);
    },
    loadPosts({commit, state}, payload) {
        if (state.hasMorePost) {
            commit('loadPosts', state);
        }
    },
    uploadImages({commit}, payload) {
        this.$axios.post('http://localhost:3085/post/images', payload, {
            withCredentials: true
        }).then((res) => {
            commit('concatImagePaths', res.data);
        }).catch(() => {

        });
    },
}
