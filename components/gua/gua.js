// components/gua/gua.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    guaList: { // 卦象
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isActive: false,
    activeIndex: -1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    start: function() {
      this.setData({
        isActive: !this.data.isActive
      }, () => {
        if(this.data.isActive) {
          this.timer = setInterval(() => {
            const index = Math.floor(Math.random()*64 + 1);
            this.setData({
              activeIndex: index
            });
          }, 50);
        } else {
          if(this.timer) {
            clearInterval(this.timer);
          }
        }
      });
    }
  }
})
