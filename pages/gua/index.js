// pages/gua/index.js
import { shake } from '../../utils/util';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    styles: [
      "transition: unset; transform: none",
      "transition: unset; transform: none",
      "transition: unset; transform: none",
    ],
    guaOrigin: [],
    dataMap: {
      "111": 1,
      "011": 2,
      "101": 3,
      "001": 4,
      "110": 5,
      "010": 6,
      "100": 7,
      "000": 8,
    },
    guaShowList: [],
    guaList: [],
    yaoList: []
  },
  getGuaList: function () {
    wx.showLoading({
      title: "数据加载中...",
    });
    wx.cloud.callFunction({
      name: "tableOperate",
      data: {
        type: "getAll",
        cName: "gua",
      },
      success: (res) => {
        wx.hideLoading();
        const list = res.result.data || [];
        this.setData({
          guaList: list,
        });
      },
    });
  },
  start() {
    if (this.isStarting) {
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
      yaoList: [],
      guaShowList: []
    });
    this.once();
  },
  getCuoGua(list) {
    const _list = list.map(item => item === 1 ? 0 : 1);
    return this.getGua(_list);
  },
  getZongGua(list) {
    const _list = [...list].reverse();
    return this.getGua(_list);
  },
  getHuGua(list) {
    const t = this.data.dataMap[list.slice(1, 4).join("")];
    const b = this.data.dataMap[list.slice(2, 5).join("")];
    const gua = this.data.guaList.find(
      (item) => item.top == t && item.bottom == b
    );
    return gua;
  },
  getBianGua(list, yaoList) {
    const _list = [...list];
    let yang = [],
        yin = [],
        index = -1;
    yaoList.forEach((yao, index) => {
      if(yao === 1) {
        yang.push(index);
      } else if(yao === -1) {
        yin.push(index);
      }
    });
    // 一爻动
    if(yang.length + yin.length === 1) {
      if(yang[0] !== undefined) {
        index = yang[0];
      } else {
        index = yin[0];
      }
    }
    // 二爻动
    // 同阴或同阳
    if(yang.length === 2 && yin.length === 0) {
      index = yang[0];
    }
    if(yang.length === 0 && yin.length === 2) {
      index = yin[0];
    }
    // 一阴一阳
    if(yang.length === 1 && yin.length === 1) {
      index = yin[0];
    }
    // 三爻动
    if(yang.length + yin.length === 3) {
      index = [].concat(yang).concat(yin).sort((a, b) => a - b)[1];
    }
    // 四爻动
    if(yang.length + yin.length === 4) {
      const rest = [0,1,2,3,4,5,6].filter(item => !yang.includes(item) && !yin.includes(item));
      const top = rest[0];
      const bottom = rest[1];
      if(list[top] === list[bottom]) {
        index = bottom;
      } else {
        if(list[top] === 0) {
          index = top;
        } else {
          index = bottom;
        }
      }
    }
    // 五爻动
    if(yang.length + yin.length === 5) {
      const rest = [0,1,2,3,4,5,6].filter(item => !yang.includes(item) && !yin.includes(item));
      index = rest[0];
    }
    if(index !== -1) {
      _list[index] = _list[index] === 1 ? 0 : 1;
    }
    return this.getGua(_list);
  },
  getGua(list) {
    const t = this.data.dataMap[list.slice(0, 3).join("")];
    const b = this.data.dataMap[list.slice(3).join("")];
    const gua = this.data.guaList.find(
      (item) => item.top == t && item.bottom == b
    );
    return gua;
  },
  getAllGua(list, yaoList) {
    return [
      { label: '本卦', ...this.getGua(list) },
      { label: '互卦', ...this.getHuGua(list) },
      { label: '变卦', ...this.getBianGua(list, yaoList) },
      { label: '综卦', ...this.getZongGua(list) },
      { label: '错卦', ...this.getCuoGua(list) },
    ];
  },
  once(count = 0) {
    const list = new Array(3)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10) + 10);
    const total = list
    .map((item) => (item + 1) % 2).reduce((sum, item) => sum + item, 0);
    wx.nextTick(() => {
      this.setData({
        styles: [
          `transition: all 0.5s; transform: rotateY(${list[0] * 180}deg)`,
          `transition: all 0.5s; transform: rotateY(${list[1] * 180}deg)`,
          `transition: all 0.5s; transform: rotateY(${list[2] * 180}deg)`,
        ],
        guaOrigin: [
          ...this.data.guaOrigin,
          total > 1
            ? 1
            : 0,
        ],
        yaoList: [
          ...this.data.yaoList,
          total === 3 ? 1 : (total === 0 ? -1 : 0)
        ]
      });
      setTimeout(() => {
        if (count < 5) {
          ++count;
          this.setData({
            styles: [
              "transition: unset; transform: none",
              "transition: unset; transform: none",
              "transition: unset; transform: none",
            ],
          });
          this.once(count);
        } else {
          this.isStarting = false;
          const guaShowList = this.getAllGua(this.data.guaOrigin, this.data.yaoList);
          this.setData({
            guaShowList
          });
          this.init();
        }
      }, 1000);
    });
  },
  init() {
    shake().then(() => {
      this.start();
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getGuaList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
