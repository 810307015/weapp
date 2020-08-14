// components/zhouyi/zhouyi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    guaList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    search: function(e) {
      const { value } = e.detail;
      const list = this.data.guaList.filter(gua => gua.name.includes(value));
      this.setData({
        list
      })
    }
  },

  observers: {
    'guaList': function(guaList) {
      // 在 numberA 或者 numberB 被设置时，执行这个函数
      this.setData({
        list: guaList
      })
    }
  }
})
