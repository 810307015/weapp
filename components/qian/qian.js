// components/qian/qian.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    qianList: {
      type: Array,
      default: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: {
      index: -1,
      date: null,
    },
    buttonProps: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    },
    isRendered: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 绘制图片
    drawImageList(canvas, ctx, imageList) {

      function run(i, callback) {
        const item = imageList[i];
        const { src, x, y, w, h } = item;
        // wx.getImageInfo({
        //   src,
        //   success: (res) => {
        //       console.log(res)
        //     const { path } = res;
        //     ctx.drawImage(path, x, y, w, h);
        //     if (i < imageList.length - 1) {
        //       run(++i, callback);
        //     } else {
        //       callback && callback();
        //     }
        //   },
        // });
        const image = canvas.createImage();
        image.src = src;
        image.onload = () => {
          ctx.drawImage(image, x, y, w, h);
          if (i < imageList.length - 1) {
            run(++i, callback);
          } else {
            callback && callback();
          }
        };
      }

      return new Promise((resolve, reject) => {
        try {
          run(0, resolve);
        } catch (e) {
          reject(e);
        }
      });
    },
    // 绘制线条
    drawLine(ctx, width, height) {
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(20, 150);
      ctx.lineTo(20, 20);
      ctx.lineTo(120, 20);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(width - 20, height - 150);
      ctx.lineTo(width - 20, height - 20);
      ctx.lineTo(width - 120, height - 20);
      ctx.stroke();
    },
    // 绘制文字
    drawText(ctx, text, width, x, y, font) {
      ctx.font = font;
      ctx.fillStyle = "#fff";
      const len = text.length;
      const word = ctx.measureText("测");
      const w = word.width;
      const dpr = wx.getSystemInfoSync().pixelRatio;
      const count = Math.floor((width - 60 * dpr) / w);
      const line = Math.ceil(len / count);
      let start = 0,
        i = 1;
      if (start + count <= len) {
        while (start <= len) {
          ctx.fillText(
            text.slice(start, start + count),
            x,
            y - (line - i) * (w + 10 * dpr)
          );
          start += count;
          ++i;
        }
      } else {
        ctx.fillText(text, x, y);
      }
      return {
        x,
        y: line > 1 ? y - line * (w + 10 * dpr) : y - w - 10 * dpr,
      };
    },
    // 绘制按钮
    drawButton(ctx, text, width) {
      const dpr = wx.getSystemInfoSync().pixelRatio;
      ctx.font = `${12 * dpr}px serif`;
      const word = ctx.measureText(text);
      const w = word.width;
      ctx.fillText(text, width - 30 * dpr - w, 300 * dpr);
      this.setData({
        buttonProps: {
          x1: 0,
          y1: 300 * dpr - 30 * dpr,
          x2: width - 30,
          y2: 300 * dpr + 30 * dpr,
        },
      });
    },
    taphandler(e) {
      const dpr = wx.getSystemInfoSync().pixelRatio;
      let { x, y } = e.detail;
      x = x * dpr;
      y = y * dpr;
      const { x1, y1, x2, y2 } = this.data.buttonProps;
      if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
        this.triggerEvent("exchange", { index: 1 });
      }
    },
    // 获取对应的签
    async getQian() {
      return await wx.cloud.callFunction({
        name: "common",
      });
    },
    init() {
      const query = this.createSelectorQuery();
      query
        .select("#myCanvas")
        .fields({ node: true, size: true })
        .exec((res) => {
          if (!res[0]) {
            return;
          }

          const canvas = res[0].node;
          const ctx = canvas.getContext("2d");

          const dpr = wx.getSystemInfoSync().pixelRatio;
          const width = res[0].width * dpr;
          const height = res[0].height * dpr;
          canvas.width = width;
          canvas.height = height;
          ctx.clearRect(0, 0, width, height);

          const imageList = [
            {
              src: "https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/images/Thursday.png?sign=6208a1f90f96597758ae821c8f4d50cc&t=1650639287",
              x: 0,
              y: 0,
              w: width,
              h: height,
            },
            {
              src: "https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/images/qian_title.png?sign=139c02c896a1bf558c57323f6d9d8bd3&t=1650639308",
              x: width - 110 * dpr,
              y: 20 * dpr,
              w: 90 * dpr,
              h: 110 * dpr,
            },
          ];
          this.drawImageList(canvas, ctx, imageList).then(async () => {
            this.drawLine(ctx, width, height);
            const {
              result: { data },
            } = await this.getQian();
            const { index } = data;
            const current = this.data.qianList[index];
            const { qian, jie } = current;

            const { x, y } = this.drawText(
              ctx,
              jie,
              width,
              30 * dpr,
              height - 50 * dpr,
              `${14 * dpr}px Georgia`
            );
            this.drawText(
              ctx,
              qian,
              width,
              x,
              y - 20 * dpr,
              `${20 * dpr}px serif`
            );

            this.drawButton(ctx, "遇事不决，可问春风 >>", width);
          });
        });
    },
  },
  observers: {
    qianList: function (qianList) {
      wx.nextTick(() => {
        if (qianList.length > 0 && !this.data.isRendered) {
          this.setData({
            isRendered: true,
          });
          this.init();
        }
      });
    },
  },
});
