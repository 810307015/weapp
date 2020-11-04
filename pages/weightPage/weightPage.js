// pages/weightPage/weightPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weightList: [], // 体重列表
    showModal: false, // 是否显示modal
    formData: {}, // 表单数据
  },

  showAdd: function() {
    this.setData({
      showModal: true
    })
  },

  toggleModal: function() {
    this.setData({
      showModal: !this.data.showModal
    })
  },

  formInputChange: function(e) {
    const value = e.detail.value;
    const field = e.currentTarget.dataset.field;
    this.setData({
      formData: {
        ...this.data.formData,
        [field]: value
      }
    });
  },

  addRecord: function() {
    const { name, range } = this.data.formData;
    if(!name || !range) {
      wx.showToast({
        title: '输入框不能为空',
      });
      return;
    }
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    wx.showLoading({
      title: '新增记录中...',
    })
    wx.cloud.callFunction({
      name: 'tableOperate',
      data: {
        cName: 'weight',
        type: 'add',
        data: {
          name,
          range,
          time: `${year}-${month}-${day}`
        }
      },
      success: () => {
        wx.hideLoading();
        wx.showToast({
          title: '新增笔记成功',
          success: () => {
            this.setData({
              showModal: false
            });
            this.init();
          }
        });
      }
    })
  },

  init() {
    wx.cloud.callFunction({
      name: 'tableOperate',
      data: {
        type: 'getAll',
        cName: 'weight'
      },
      success: (res) => {
        const list = res.result.data || [];
        this.setData({
          weightList: list
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
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