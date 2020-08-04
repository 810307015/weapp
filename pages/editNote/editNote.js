// pages/editNote/editNote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    status: 0, // 0 查看 1 编辑 2新增
    id: -1
  },

  handleChange: function(e) {
    const { field } = e.target.dataset;
    const { value } = e.detail;
    this.setData({
      [field]: value
    })
  },
  add: function() {
    const app = getApp();
    const { title, content } = this.data;
    const { openid } = app.globalData;
    const timeStamp = +new Date();
    if(title.trim() === '' || content.trim() === '') {
      wx.showToast({
        title: '标题和内容都不能为空',
      });
      return;
    }
    wx.showLoading({
      title: '新增笔记中...',
    })
    wx.cloud.callFunction({
      name: 'tableOperate',
      data: {
        cName: 'notes',
        type: 'add',
        data: {
          title,
          content,
          openid,
          timeStamp
        }
      },
      success: () => {
        wx.hideLoading();
        wx.showToast({
          title: '新增笔记成功',
          success: () => {
            wx.navigateBack({
              delta: 0,
            })
          }
        });
      }
    })
  },
  edit: function() {
    const { title, content, id } = this.data;
    const timeStamp = +new Date();
    if(title.trim() === '' || content.trim() === '') {
      wx.showToast({
        title: '标题和内容都不能为空',
      });
      return;
    }
    wx.showLoading({
      title: '修改笔记中...',
    })
    wx.cloud.callFunction({
      name: 'tableOperate',
      data: {
        cName: 'notes',
        type: 'edit',
        data: {
          title,
          content,
          timeStamp
        },
        id
      },
      success: () => {
        wx.hideLoading();
        wx.showToast({
          title: '修改笔记成功',
          success: () => {
            wx.navigateBack({
              delta: 0,
            })
          }
        });
      }
    })
  },
  save: function() {
    if(this.data.status === 1) {
      this.edit();
    } else if(this.data.status === 2) {
      this.add();
    }
    // wx.showLoading({
    //   title: '操作中...',
    // })
    // wx.cloud.callFunction({
    //   name: 'addNote',
    //   data: {
    //     ...this.data
    //   },
    //   success: function(res) {
    //     wx.hideLoading();
    //     if(res.result && res.result.code === 200) {
    //       wx.showToast({
    //         title: '新增成功',
    //         success: () => {
    //           wx.redirectTo({
    //             url: '/pages/index/index',
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { type } = options;
    if(type === 'view') {
      wx.getStorage({
        key: 'currentItem',
        success: (res) => {
          const { title, content, id } = res.data || {};
          this.setData({
            title, 
            content,
            id,
            status: 0
          })
        }
      });
    } else if(type === 'edit') {
      wx.getStorage({
        key: 'currentItem',
        success: (res) => {
          const { title, content, id } = res.data || {};
          this.setData({
            title, 
            content,
            id,
            status: 1
          })
        }
      });
    } else {
      this.setData({
        status: 2
      })
    }
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