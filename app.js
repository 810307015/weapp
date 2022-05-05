//app.js
App({
  onLaunch: function (options) {
    const { scene} = options;
    if(scene === 1154) {
      this.globalData.isOpenInTimeline = true;
    }
    wx.cloud.init();
  },
  globalData: {
    userInfo: null,
    openid: '',
    appid: '',
    currentQian: {
      index: -1,
      date: null
    },
    isOpenInTimeline: false, // 是否从朋友圈打开
  }
})