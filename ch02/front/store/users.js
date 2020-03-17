export const state = () => ({
    me: null, // 로그인 상태면 값이 들어있고 비로그인 상태면 null임
    followingList: [
        {
            "id" : 1,
            "nickname" : "제로초"
        },
        {
            "id" : 2,
            "nickname" : "네로"
        },
        {
            "id" : 3,
            "nickname" : "히어로"
        }
    ]
});

export const mutations = {
    // state는 mutation로 바꾼다
    // 따라서, mutations 안에 비동기 작업이 있으면 안된다 Ex) Promise, axios, ajax  등등
    setMe(state, payload) {
        state.me = payload;
    },
    changeNickname(state, payload) {
        state.me.nickname = payload.nickname
    },
    removeFollowing(state, payload) {
        const index = state.followingList.findIndex(v => v.id === payload.id);
        state.followingList.splice(index, 1)
    }
}

// mutations에 비동기가 있으면 안되기 때문에 actions 사용
// mutations - 단순한 동기작업, actions - 좀 더 복잡한 동기 / 비동기 작업
export const actions = {
    // signUp(context, payload) { // context 안에는 commit, dispatch, state, rootState, getters, rootGetters 등이 들어있음. 직접 console.log(context)로 확인가능

    signUp({commit, state}, payload) {
        commit('setMe', payload);
    },

    logIn({commit}, payload) {
        commit('setMe', payload);

    },
    logOut({commit}, payload) {
        commit('setMe', null);
    },
    changeNickname({commit}, payload) {
        commit('changeNickname', payload);
    },
    removeFollowing({commit}, payload) {
        commit('removeFollowing', payload);
    }
};
