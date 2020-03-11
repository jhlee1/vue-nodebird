export const state = () =>({
    name: "posts"
});

export const mutations = { // 왜 안될까?
    bye(state) {
        state.hello = "goodbye posts";
    }
};
