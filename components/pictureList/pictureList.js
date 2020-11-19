// components/pictureList/pictureList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: [
        'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/1.png',
        'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/2.png',
        'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/3.png',
        'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/4.png',
        'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/5.png',
        'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/6.png',
        'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/7.png',
        'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/8.png',
        'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/9.png'
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    index: 0,
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick: function(e) {
      const { index } = e.target.dataset;
      this.setData({
        index,
        show: true
      })
    }
  }
})
