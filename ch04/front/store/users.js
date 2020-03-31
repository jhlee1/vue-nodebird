export const state = () => ({
    me: null, // 로그인 상태면 값이 들어있고 비로그인 상태면 null임
    followingList: [],
    followerList: [],
    hasMoreFollower: true,
    hasMoreFollowing: true
});

const totalFollowers = 8;
const totalFollowings = 6;
const limit = 3;

export const mutations = {
    // state는 mutation로 바꾼다
    // 따라서, mutations 안에 비동기 작업이 있으면 안된다 Ex) Promise, axios, ajax  등등
    setMe(state, payload) {
        state.me = payload;
    },
    changeNickname(state, payload) {
        state.me.nickname = payload.nickname
    },
    addFollowing(state, payload) {
        state.followingList.push(payload);
    },
    addFollower(state, payload) {
        state.followerList.push(payload);
    },
    removeFollower(state, payload) {
        const index = state.followerList.findIndex(v => v.id === payload.id);
        state.followerList.splice(index, 1);
    },
    removeFollowing(state, payload) {
        const index = state.followingList.findIndex(v => v.id === payload.id);
        state.followingList.splice(index, 1);
    },
    loadFollowings(state) {
        const diff = totalFollowings - state.followingList.length;
        const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
            id: Math.random().toString(),
            nickname: Math.floor(Math.random() * 1000)
        }));

        state.followingList = state.followingList.concat(fakeUsers);
        state.hasMoreFollowing = fakeUsers.length === limit;
    },
    loadFollowers(state) {
        const diff = totalFollowers - state.followerList.length;
        const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
            id: Math.random().toString(),
            nickname: Math.floor(Math.random() * 1000)
        }));

        state.followerList = state.followerList.concat(fakeUsers);
        state.hasMoreFollower = fakeUsers.length === limit;
    },

}

// mutations에 비동기가 있으면 안되기 때문에 actions 사용
// mutations - 단순한 동기작업, actions - 좀 더 복잡한 동기 / 비동기 작업
export const actions = {
    // signUp(context, payload) { // context 안에는 commit, dispatch, state, rootState, getters, rootGetters 등이 들어있음. 직접 console.log(context)로 확인가능

    signUp({commit, state}, payload) {
        console.log(this.$axios.post('http://localhost:3085/user'), {
            email: payload.email,
            nickname: payload.nickname,
            password: payload.password
        });
        commit('setMe', payload);
    },

    logIn({commit}, payload) {
        commit('setMe', payload);

    },
    logOut({commit}, payload) {
        this.$axios.post('http://localhost:3085/user/logout', {})
        .then((data) => {
            commit('setMe', null);    
        }).catch((err) => {
            console.error(err);
        });
    },
    changeNickname({commit}, payload) {
        commit('changeNickname', payload);
    },
    addFollowing({commit}, payload) {
        commit('addFollowing', payload);
    },
    removeFollowing({commit}, payload) {
        commit('removeFollowing', payload);
    },
    addFollower({commit}, payload) {
        commit('addFollower', payload);
    },
    removeFollower({commit}, payload) {
        commit('removeFollower', payload);
    },
    loadFollowers({commit, state}, payload) {
        if (state.hasMoreFollower) {
            commit('loadFollowers', payload);
        }
    },
    loadFollowings({commit, state}, payload) {
        if (state.hasMoreFollowing) {
            commit('loadFollowings', payload);
        }
    }
};
