// pages/weightPage/weightPage.js
const util = require('../../utils/util.js');
const echarts = require('../../components/ec-canvas/echarts.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weightList: [], // 体重列表
    showList: [], // 展示的体重列表
    showModal: false, // 是否显示modal
    formData: {}, // 表单数据
    people: ['全部'], // 记录人列表
    currentPerson: '全部', // 当前选择的记录人
    showType: 0, // 0 列表展示， 1 echarts展示
    ec: {}, // echarts图的配置
  },

  // 初始化echarts图的配置
  initChart: function (canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // 像素
    });
    canvas.setChart(chart);
    const list = this.data.weightList;
    const people = this.data.people;
    let xAxisData = [],
        minY = 100,
        maxY = 0;
    const series = people.filter(item => item !== '全部').map(person => {
      const personList = list.filter(item => item.name === person).sort((a, b) => (+new Date(a.time)) - (+new Date(b.time)));
      const timeList = personList.map(item => util.formatTime(new Date(item.time)));
      const valueList = personList.map(item => item.range);
      const min = Math.min.apply(null, valueList);
      const max = Math.max.apply(null, valueList);
      minY = minY < min ? minY : min;
      maxY = maxY > max ? maxY : max;
      xAxisData.push(...timeList);
      return {
        type: 'line',
        name: person,
        data: personList
      }
    });
    xAxisData = [ ...new Set(xAxisData) ];
    series.forEach(item => {
      const { data } = item;
      const _data = [...data];
      const newData = [];
      xAxisData.forEach((time, index) => {
        const fItem = _data.find(item => util.formatTime(new Date(item.time)) === time);
        newData[index] = fItem ? fItem.range : null;
      });
      item.data = newData;
    })
    const option = {
      color: ['#0694F3', '#5BE2D4', '#7FC73A'],
      grid: {
        top: 45,
        left: 50,
        right: 10,
        bottom: 40
      },
      legend: {
        show: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(0, 112, 251, 0.05)'
          }
        },
        formatter: (params) => {
          let time = '',
              list = [];
          params.forEach(param => {
            time = param.axisValue;
            list.push({
              name: param.seriesName,
              value: param.value || '暂无记录'
            })
          });
          let valueStr = '';
          list.forEach(item => {
            valueStr += `${item.name}：${item.value}\n`
          })

          return `${time}\n${valueStr}`;
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
        axisLine: {
          lineStyle: {
            color: '#EFF1F4',
            type: 'dashed'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#EFF1F4',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#B0B1B9'
        }
      },
      yAxis: {
        name: '',
        type: 'value',
        position: 'left',
        min: minY,
        max: maxY,
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#EFF1F4',
            type: 'solid'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#EFF1F4',
            type: 'dashed'
          }
        },
        axisLabel: {
          color: '#B0B1B9'
        },
        nameTextStyle: {
          color: '#B0B1B9'
        }
      },
      series: series
    };
    chart.setOption(option);
    return chart;
  },

  changeShowType: function () {
    this.setData({
      showType: this.data.showType === 0 ? 1 : 0
    })
  },

  showAdd: function () {
    this.setData({
      showModal: true
    })
  },

  toggleModal: function () {
    this.setData({
      showModal: !this.data.showModal
    })
  },

  formInputChange: function (e) {
    const value = e.detail.value;
    const field = e.currentTarget.dataset.field;
    this.setData({
      formData: {
        ...this.data.formData,
        [field]: value
      }
    });
  },

  addRecord: function () {
    const {
      name,
      range
    } = this.data.formData;
    if (!name || !range) {
      wx.showToast({
        title: '输入框不能为空',
      });
      return;
    }
    const app = getApp();
    const { openid } = app.globalData;
    const now = new Date();
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
          time: util.formatTime(now),
          openid
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

  // 切换显示的列表
  changeShowList(e) {
    const {
      person
    } = e.target.dataset;
    let showList = this.data.weightList;
    if (person !== '全部') {
      showList = showList.filter(item => item.name === person);
    }
    this.setData({
      showList,
      currentPerson: person
    })
  },

  init() {
    wx.showLoading({
      title: '获取记录中...',
    })
    wx.cloud.callFunction({
      name: 'tableOperate',
      data: {
        type: 'getAll',
        cName: 'weight'
      },
      success: (res) => {
        wx.hideLoading()
        const list = res.result.data || [];
        list.sort((a, b) => {
          return (+new Date(b.time)) - (+new Date(a.time));
        });
        const people = ['全部', ...new Set(list.map(item => item.name))];
        this.setData({
          weightList: list,
          showList: list,
          people,
          ec: {
            onInit: this.initChart
          }
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