//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    activeTabIndex: 0, // 当前的tab页
    tabbarList: [
      {
        'text': '关于',
        'iconPath': 'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/resume_unselected.png',
        'selectedIconPath': 'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/resume_selected.png'
      },
      {
        'text': '成长',
        'iconPath': 'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/icon_note.png',
        'selectedIconPath': 'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/icon_note_active.png'
      },
      {
        'text': '占卜',
        'iconPath': 'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/icon_gua.png',
        'selectedIconPath': 'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/icon_gua_active.png'
      },
      {
        'text': '我的',
        'iconPath': 'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/icon_user.png',
        'selectedIconPath': 'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/icon_user_active.png'
      }
    ],
    noteList: [],
    guaList: [], // 卦象列表
  },
  tabbarChange: function (e) {
    const {
      index
    } = e.detail;
    this.setData({
      activeTabIndex: index
    })
  },
  onDelete: function (e) {
    console.log(e);
    const {
      id
    } = e.detail;
    wx.showModal({
      title: '提示',
      content: '确定要删除该条笔记吗',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中...',
          })
          wx.cloud.callFunction({
            name: 'tableOperate',
            data: {
              type: 'delete',
              id,
              cName: 'notes'
            },
            success: (res) => {
              wx.hideLoading()
              wx.showToast({
                title: '删除成功',
                success: () => {
                  this.getList();
                }
              })
            }
          })
        }
      }
    })
  },
  getList: function () {
    const app = getApp();
    const { openid } = app.globalData;
    wx.cloud.callFunction({
      name: 'tableOperate',
      data: {
        type: 'getAll',
        cName: 'notes'
      },
      success: (res) => {
        const list = res.result.data || [];
        const noteList = list.map(item => {
          const {
            title,
            content,
            timeStamp,
            openid,
            _id
          } = item;
          const date = new Date(timeStamp).toLocaleDateString();
          return {
            title,
            content,
            openid,
            date,
            id: _id
          };
        })
        const _noteList = noteList.filter(item => item.openid === openid)
        this.setData({
          noteList: _noteList
        })
      }
    })
  },
  addReply: function (e) {
    const { content = '', avatarUrl, nickName } = e.detail;
    const app = getApp();
    const { openid } = app.globalData;
    if(!content.trim()) {
      wx.showToast({
        icon: 'none',
        title: '请输入反馈内容',
      })
      return;
    }
    wx.showLoading({
      title: '提交反馈中...',
    })
    wx.cloud.callFunction({
      name: 'tableOperate',
      data: {
        type: 'add',
        cName: 'reply',
        data: {
          content,
          avatarUrl,
          nickName,
          timeStamp: +new Date(),
          openid
        }
      },
      success: () => {
        wx.hideLoading();
        wx.showToast({
          title: '提交反馈成功',
        })
      }
    })
  },
  getGuaList: function() {
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.cloud.callFunction({
      name: 'tableOperate',
      data: {
        type: 'getAll',
        cName: 'gua'
      },
      success: (res) => {
        wx.hideLoading()
        const list = res.result.data || [];
        this.setData({
          guaList: list
        })
      }
    })
  },
  goToWeight: function() {
    wx.navigateTo({
      url: '/pages/weightPage/weightPage',
    })
  },
  goToReplyList: function() {
    wx.navigateTo({
      url: '/pages/replyList/replyList',
    })
  },
  onLoad: function () {
    this.getGuaList();
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onShow: function() {
    const app = getApp();
    if(!app.globalData.openid) {
      wx.cloud.callFunction({
        name: 'getBaseInfo',
        success: (res) => {
          const { appid, openid } = res.result;
          app.globalData.appid = appid;
          app.globalData.openid = openid;
          this.getList();
        }
      })
    } else {
      this.getList();
    }
  }
})