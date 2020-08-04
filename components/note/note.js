// components/note/note.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    noteList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bannerList: [
      'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/banner.png',
      'cloud://xhwy-yry-gwvlb.7868-xhwy-yry-gwvlb-1302619666/images/banner1.png'
    ],
    slideButtons: [
      {
        text: '编辑',
        extClass: 'btn-view',
        data: 'edit'
      },
      {
        text: '删除',
        extClass: 'btn-delete',
        type: 'warn',
        data: 'delete'
      }
      // {
      //   text: '删除',
      //   type: 'warn',
      //   extClass: 'btn-delete',
      //   date: 'delete'
      // }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    slideButtonTap: function (e) {
      const { data } = e.detail;
      if(data === 'edit') {
        const { title, content, id } = e.currentTarget.dataset;
        wx.setStorage({
          data: {
            title,
            content,
            id
          },
          key: 'currentItem',
          success: function() {
            wx.navigateTo({
              url: `/pages/editNote/editNote?type=edit`,
            })
          }
        })
      } else {
        const { id } = e.currentTarget.dataset;
        this.triggerEvent('delete', { id });
      }
    },
    goToView: function(e) {
      const { title, content, id } = e.currentTarget.dataset;
      wx.setStorage({
        data: {
          title,
          content,
          id
        },
        key: 'currentItem',
        success: function() {
          wx.navigateTo({
            url: `/pages/editNote/editNote?type=view`,
          })
        }
      })
    },
    addNote: function() {
      wx.navigateTo({
        url: '/pages/editNote/editNote?type=add',
      })
    }
  }
})
