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
    doNothing: function() {
      console.log('阻止事件冒泡');
    },
    toggleModal: function() {
      this.setData({
        showModal: !this.data.showModal
      })
    },
    formInputChange: function(e) {
      const value = e.detail.value;
      this.setData({
        formData: {
          content: value
        }
      });
    },
    addReply: function() {
      this.setData({
        showModal: false
      }, () => {
        const { content } = this.data.formData;
        this.triggerEvent('add', { content  });
      })
    }
  }
})
