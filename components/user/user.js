// components/user/user.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    showModal: false,
    showToast: false,
    isMain: false, // 是否是管理员
    rules: [
      {
        name: 'content',
        rules: { required: true, message: '请输入反馈内容' }
      }
    ],
    formData: {},
    buttons: [
      {
        type: 'primary',
        className: '',
        text: '提交反馈',
        value: 0
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    doNothing: function () {
      console.log('阻止事件冒泡');
    },
    toggleModal: function () {
      this.setData({
        showModal: !this.data.showModal
      })
    },
    formInputChange: function (e) {
      const value = e.detail.value;
      this.setData({
        formData: {
          content: value
        }
      });
    },
    goToWeight: function () {
      this.triggerEvent('weight');
    },
    goToRelpyList: function() {
      this.triggerEvent('replylist');
    },
    addReply: function (e) {
      const { nickName, avatarUrl } = e.detail.userInfo;
      const { content } = this.data.formData;
      if (!content) {
        wx.showToast({
          title: '请提出您的建议',
          icon: 'none'
        });
        return;
      }
      this.setData({
        showModal: false
      }, () => {
        this.triggerEvent('add', { content, nickName, avatarUrl });
      })
    }
  },

  lifetimes: {
    attached: function() {
      const app = getApp();
      const { openid } = app.globalData;
      console.log(openid)
      this.setData({
        isMain: openid === 'oFnVq5OqS_fWzPmazA_DBTQvM3HU' // 判断是不是我在看
      });
    }
  }
})
