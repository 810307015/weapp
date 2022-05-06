// pages/runData/index.js
const echarts = require('../../components/ec-canvas/echarts.js')
import { formatTime } from '../../utils/util';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    runList: [],
    ec: {}, // echarts图的配置
    failed: false, // 获取失败
    activeTab: 0,
  },

  // 初始化echarts图的配置
  initChart: function (canvas, width, height, dpr) {
    const list = this.data.runList;
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr, // 像素
    });
    canvas.setChart(chart);
    const xAxisData = list.map(item => item.label);
    const yAxisData = list.map(item => item.value);
    const option = {
      color: [ "#7FC73A","#5BE2D4", "#0694F3"],
      grid: {
        top: 45,
        left: 50,
        right: 10,
        bottom: 40,
      },
      legend: {
        show: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          shadowStyle: {
            color: "rgba(0, 112, 251, 0.05)",
          },
        },
        formatter: (params) => {
            return `${params[0].axisValue}\n步数：${params[0].value}`;
          }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xAxisData,
        axisLine: {
          lineStyle: {
            color: "#EFF1F4",
            type: "dashed",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#EFF1F4",
            type: "solid",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#B0B1B9",
        },
      },
      yAxis: {
        type: "value",
        data: yAxisData,
        position: "left",
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#EFF1F4",
            type: "solid",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#EFF1F4",
            type: "dashed",
          },
        },
        axisLabel: {
          color: "#B0B1B9",
        },
        nameTextStyle: {
          color: "#B0B1B9",
        },
      },
      series: [{
          type: 'line',
          data: yAxisData
      }]
    };
    chart.setOption(option);
    return chart;
  },

  exChangeTab(e) {
    const index = +e.target.dataset.index;
    this.setData({
      activeTab: index
    });
  },

  init() {
    wx.showLoading({
      title: '运动数据加载中...',
    })
    wx.getWeRunData({
        success: (res) => {
            const cloudID = res.cloudID;
            wx.cloud.callFunction({
                name: 'getRunData',
                data: {
                    data: wx.cloud.CloudID(cloudID),
                },
                success: (res) => {
                    const data = res.result.data.data || {};
                    const { stepInfoList = [] } = data;
                    this.setData({
                        runList: stepInfoList.map(item => ({
                            label: formatTime(new Date(item.timestamp * 1000)),
                            value: item.step
                        })),
                        ec: {
                            onInit: this.initChart
                        },
                        failed: false
                    })
                    wx.hideLoading();
                },
                error: () => {
                    this.setData({
                        failed: true
                    });
                    wx.hideLoading();
                }
            })
        },
        error: () => {
            this.setData({
                failed: true
            });
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
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
