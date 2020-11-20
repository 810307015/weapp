// pages/replyList/replyList.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true, // 是否正在加载
    replyList: [], // 反馈列表
  },

  /**
   * 获取反馈信息列表
   */
  getReplyList: function() {
    wx.showLoading({
      title: '获取反馈信息中...',
    })
    wx.cloud.callFunction({
      name: 'tableOperate',
      data: {
        type: 'getAll',
        cName: 'reply'
      },
      success: (res) => {
        wx.hideLoading()
        const list = res.result.data || [];
        const replyList = list.map(item => {
          const {
            timeStamp,
            ...props
          } = item;
          const date = util.formatTime(new Date(timeStamp));
          return {
            date,
            ...props
          };
        })
        this.setData({
          replyList,
          isLoading: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getReplyList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})