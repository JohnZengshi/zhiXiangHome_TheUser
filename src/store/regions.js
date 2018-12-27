// 地址列表
const state = {
  list: [],
};

const mutations = {
  listUpdata(state,list) {
    state.list = list
  }
}

export default {
  state,
  mutations
}