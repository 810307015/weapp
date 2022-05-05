// components/gua-new/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    guaList: {
      type: Array,
      default: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    styles: [
      "transition: unset; transform: none",
      "transition: unset; transform: none",
      "transition: unset; transform: none",
    ],
    guaOrigin: [],
    dataMap: {
      '111': 1,
      '011': 2,
      '101': 3,
      '001': 4,
      '110': 5,
      '010': 6,
      '100': 7,
      '000': 8
    },
    currentGua: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    exchange() {
      this.triggerEvent("exchange", { index: 0 });
    },
    start() {
      if(this.isStarting) {
        return;
      }
      this.isStarting = true;
      this.setData({
        styles: [
          "transition: unset; transform: none",
          "transition: unset; transform: none",
          "transition: unset; transform: none",
        ],
        guaOrigin: [],
        currentGua: {}
      });
      this.once();
    },
    getGua(list) {
      const t = this.data.dataMap[list.slice(0, 3).join('')];
      const b = this.data.dataMap[list.slice(3).join('')];
      console.log(t, b, this.data.guaList)
      const gua = this.data.guaList.find(item => item.top == t && item.bottom == b);
      return gua;
    },
    once(count = 0) {
      const list = new Array(3)
        .fill(0)
        .map(() => Math.floor(Math.random() * 10) + 10);
      wx.nextTick(() => {
        this.setData({
          styles: [
            `transition: all 0.5s; transform: rotateY(${list[0] * 180}deg)`,
            `transition: all 0.5s; transform: rotateY(${list[1] * 180}deg)`,
            `transition: all 0.5s; transform: rotateY(${list[2] * 180}deg)`,
          ],
          guaOrigin: [
            ...this.data.guaOrigin,
            list.map(item => (item + 1) % 2).reduce((sum, item) => sum + item, 0) > 1 ? 1 : 0,
          ],
        });
        setTimeout(() => {
          if(count < 5) {
            ++count;
            this.setData({
              styles: [
                "transition: unset; transform: none",
                "transition: unset; transform: none",
                "transition: unset; transform: none",
              ]
            });
            this.once(count);
          } else {
            this.isStarting = false;
            const gua = this.getGua(this.data.guaOrigin);
            this.setData({
              currentGua: gua
            });
          }
        }, 1000)
      });
    },
  },
});
