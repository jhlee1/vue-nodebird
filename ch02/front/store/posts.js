export const state = () =>({
    mainPostsL: []
});

export const mutations = {
    addMainPost(state, payload) {
        state.mainPosts.unshift(payload);
    }
};

export const actions = {
    add({ commit }, payload) {
        //TODO: 나중에 서버에 게시글 등록 요청을 보냄
        commit('addMainPost', payload); // 같은 module안의 mutation이기 때문에 앞에 posts를 안넣어도됨
        // commit('addMainPost', payload, { root: true }); 이런식으로 부를 경우 index 꺼의 addMainPost를 불러옴
    }
}
