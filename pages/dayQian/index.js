// pages/dayQian/index.js
import { formatTime, shake } from '../../utils/util';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    qianList: [],
    current: {
      index: -1,
      date: null,
    },
    showTip: true,
    dayMap: ['日', '一', '二', '三', '四', '五', '六'],
    bgList: [
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/00e4869778d2b3e49745099935528870.jpeg?sign=ae449cec5e75c971d473935a84368631&t=1651740925',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/00ee5a1eca89d7705ee8d67f1d27e942.jpeg?sign=477f231c7d2cc6e1f4cbd5d7119c02d2&t=1651740978',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/02390a2e3aa725f281cd5676032f6a19.jpeg?sign=77bc64d208a69952b144ed59c1077f46&t=1651740990',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/036283c7018fcac1fa351abbde0d6723.jpeg?sign=9a4fcc8769c2c09551e04ae7094516ce&t=1651741003',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/0611d077ab57c4539892529ea8ea6334.jpeg?sign=0fe3ad6c40754b9be500458b66609e80&t=1651741017',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/244accbe08f6c3742b6f01f9be605c8b.jpeg?sign=402284dd6caf9062a987cbe40242e3b7&t=1651741028',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/24faa806dc74c7ab96354a8ed5dd6ae6.jpeg?sign=55d42a2b947dfd4d54b88d9f001f6b99&t=1651741038',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/2cffab009471e77725f9fa7639f7a8ed.jpeg?sign=7af2e3be6cce15916449bfa19fa589f1&t=1651741048',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/32bf9a4a3b478d64e1e68a2e65dbbc1d.jpeg?sign=61ab12804ece38e8a1542f4b3dcff0aa&t=1651741058',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/3344792e5f719ab249686181cca26f45.jpeg?sign=6f3e3715bf0485ca597aefecc8f80b56&t=1651741067',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/33b8fdf8fc08b7980cdfb49096ae0885.jpeg?sign=33a9b29b0a95b874129ea2a0ac1e7afd&t=1651741082',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/3af47cdbab3a1018131bd86ba3390948.jpeg?sign=03695f41382ea2f00d3a2bea65c62cd8&t=1651741097',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/3fd1b112ebaeab0e324ee1a3a7d49b1d.jpeg?sign=7e0fb75fc351096399415d38d3b667aa&t=1651741107',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/421a0914492c34581ec1960c714045a2.jpeg?sign=d840b2cdbcd393c224a40d26673a6a61&t=1651741118',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/422eded62ae412976ce40b9048a8aa5a.jpeg?sign=49c2ff755f434f64c092a40747cb8a0a&t=1651741138',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/4330932e758c75106dcf701a5757be1e.jpeg?sign=7c78c54551ca25b69434ed6d0f0b9476&t=1651741157',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/443ab9ae4dc41bee70a1e05261fa1385.jpeg?sign=7626d8686255d6ba0b2341a561171f6a&t=1651741165',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/4ed7083118433f6e8a43a2303f87b17b.jpeg?sign=abe9034f1016f86273d71e0ac967cd8c&t=1651741173',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/505cccce0ac4786fd91be1cc847ba7f7.jpeg?sign=3300e70eb1c9eda22660191b2f9c30a1&t=1651741182',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/54d77860b1dd42a0542360ba4b961b95.jpeg?sign=db980b7518370003e9f7477d2485b737&t=1651741194',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/60284115d9021c8634b55e142f5e55ed.jpeg?sign=df8443a200b37b231ba442e3f9c98746&t=1651741207',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/612795d82cf5a582f64ebc0ab7664771.jpeg?sign=bd71b6622d8c701184c381ab48a3500c&t=1651741224',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/6d534ac4e4b9b8a1a7a8480ab4f162f7.jpeg?sign=e6a130048ed7de3dfc346c1de6587739&t=1651741234',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/6f87840842fe8f065c0af0e105b06fad.jpeg?sign=ede12dc85e9d611ff884fb38f6a60ef7&t=1651741247',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/7113fb6d79c11d8c8844cdb7b0981866.jpeg?sign=c4f6c800be3960478bb159516b694d51&t=1651741255',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/71cf8874b1c366113631a1f3073b025f.jpeg?sign=123141e70f89f0d59eb6e83410fb26b1&t=1651741266',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/7227a3431c308a1ec48fc0eebd13405c.jpeg?sign=0f04ab6f605c129818d0db50c15b647d&t=1651741275',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/72f86d408e47dec376c2e951190b7933.jpeg?sign=ee18b88d530285bafdf7da1fab856d93&t=1651741284',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/7420bd7f1a2b9e7d0fefb005071407c9.jpeg?sign=99d51a6926327bc2a0f9fcbd80b1b4d4&t=1651741292',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/7a365fd7e22ad5a05f36663a3da18b69.jpeg?sign=672c380a1b8cd7d4a3d9b8679b92aa1b&t=1651741305',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/7caf417dd06c2f432a839af35123f916.jpeg?sign=f316499b80eae758b1eb6c28fce19e16&t=1651741314',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/7e5661aaf7066b56b93e4ebb656ad40e.jpeg?sign=34389cb90f00dbbffe6c318e00fb6af1&t=1651741330',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/805e8ea4f82baa6cc5e6d6130b74211d.jpeg?sign=b3be52d70da28716d6e751a64a7a7492&t=1651741345',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/8857d83da724202cccc966b5f7ed9a49.jpeg?sign=7df6f01f08f3e3b47ed1c2c4079c1912&t=1651741354',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/896ebbf720d961ba6ee2aa06f75eb50c.jpeg?sign=c45f42d20472a966331b2ae9b8009d7a&t=1651741366',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/90798b47dca2bc894bf97a672942db86.jpeg?sign=fc2f95aa2c8ea72f06d6c6e52e354f41&t=1651741376',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/94151e23a698b8ef5a0c37dab88097eb.jpeg?sign=c27721aa130da18edf2074c44e633703&t=1651741400',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/96110bfb2068dc7c809420ebcbcee074.jpeg?sign=c13c197c5776910b144288f07064efca&t=1651741409',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/a153c0e4fc1f45b96ee983a2366794f8.jpeg?sign=70422e212477a8e0eff1aa3a31279412&t=1651741594',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/a226e7b69f90ca584841e468d23387f6.jpeg?sign=b971003e6be0692e2d5cf6a8170d2514&t=1651741610',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/a8a2a4b2101e1dba48d17d66ba120399.jpeg?sign=925320f4fe5ce2d3b868572c25ba190f&t=1651741620',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/ad4f8dc19e2cf98afb01ca90527d71e9.jpeg?sign=ce340238a5a954fab5759c46dabc6c44&t=1651741630',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/ada5c5d327f7be69786ba201b3eea2b2.jpeg?sign=6e991de7454b89d276515a5533219b08&t=1651741642',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/ae6d2c5b978a35830179eadc16871c9e.jpeg?sign=994e4ec1fae5be880fee5ae15340593a&t=1651741652',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/b0ac7fb88a2c87a558e748cb47e88eff.jpeg?sign=e165fc898cc5ceebe128d2cb03249617&t=1651741665',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/b3dd1a177e8b2101eac098d73eb00df0.jpeg?sign=5871161e736460eb37f99bd7f2350930&t=1651741678',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/b595b39e1e2ff3e28eeccaf7bee05618.jpeg?sign=ad6b186db1db812eea9fdcbe2e4b9f8b&t=1651741688',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/b8f6715cb8a67f807e5146aedd8870ec.jpeg?sign=5ad64b27003d174d82c9633635f0c60e&t=1651741700',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/bfc8dfd74b5e996cfbece50d27b84989.jpeg?sign=dd0ae9c240df49b9abcf8034b05a69eb&t=1651742276',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/bfda1d6e405072477143b24c8696a6cd.jpeg?sign=f033f1dc45623b5f589636db661c1ffc&t=1651741716',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/c22bf9069288b04cdbddadd93a413e9d.jpeg?sign=45b34b8537af845ded7fc7ceef3a4557&t=1651741727',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/c4ba5db055cd1eba4d55e30dc1a00630.jpeg?sign=ec51255030a436fddb3bfd4170f86e8a&t=1651741740',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/c9e7bc016e86b15263435bfcadcf3dc6.jpeg?sign=0d850ec86b3ecc4791001b81b60d28bb&t=1651741754',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/cc932128b2d884a7efe5c9f79c062409.jpeg?sign=fb340c8199c8468030b30cc868e480df&t=1651741765',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/d41ba75e9dba01102987f6724ac01920.jpeg?sign=1f13f27a5dfac20d6c9b878a5844d243&t=1651741776',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/d96d3d6874b282aa4c83609f94d5f4d7.jpeg?sign=a7f14322b18a47b52835f3c4c8543635&t=1651741787',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/db2260308bc90f1bd27623b057ad03d5.jpeg?sign=e46c900b0d13fd73acdebbea15978794&t=1651741797',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/df77f30b4aeae77e98951d6b6d7a8674.jpeg?sign=65d718ec65479abcdace4c46648e2862&t=1651741808',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/e328e134f3f0dbc4f2e4bf3ada423554.jpeg?sign=5369715117dd33183883738eb7c2cf3f&t=1651741817',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/e59bb492dbffa534fd390f432f59af92.jpeg?sign=08b12982c2c58d4ed81730401a456ee0&t=1651741828',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/e6b504704dfdb1261984c7426fc5aafc.jpeg?sign=9cd953016f943519a81e18a509d8e280&t=1651741838',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/e977fd9e431b30c4e47d83701af63470.jpeg?sign=e84b9b8720618e3d9603bf3cad1ab975&t=1651741848',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/f6cc2c66d43c71b2b849d720629eea05.jpeg?sign=2649f6b8eb9b629c200b302e94c13de1&t=1651741858',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/f94f7bc27474883490868d5b8485c6ca.jpeg?sign=281dbdef58e3f07a1183002fe4a20999&t=1651741866',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/f9f85fad5f3ab70cf4119adc2289f12a.jpeg?sign=08219ced652fb3c9f277bb6c6fb3ac63&t=1651741875',
      'https://7868-xhwy-yry-gwvlb-1302619666.tcb.qcloud.la/dayRecord/fb2b9c0d69fc294c82c25f340e1ac86d.jpeg?sign=eb6001a40212a7f3923184536b120c9b&t=1651741883'
    ],
    curr: new Array(66).fill(0).map((_, index) => index),
  },
  // 随机一张背景图
  randomBg() {
    const len = this.data.curr.length;
    if(len < 10) {
      this.setData({
        curr: new Array(66).fill(0).map((_, index) => index)
      });
    }
    const i = Math.floor(Math.random() * len);
    this.setData({
      curr: this.data.curr.filter((_, index) => index !== i)
    })
    return this.data.bgList[this.data.curr[i]];
  },
  // 绘制图片
  drawImageList(canvas, ctx, imageList) {
    function run(i, callback) {
      const item = imageList[i];
      const { src, x, y, w, h } = item;
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
  // 获取对应的签
  async getQian() {
    return await wx.cloud.callFunction({
      name: "common",
    });
  },
  // 长按处理
  longtapHandler(e) {
    const query = wx.createSelectorQuery();
    query
      .select("#myCanvas")
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0]) {
            return;
        }
  
        const canvas = res[0].node;
        const URI = canvas.toDataURL();
        wx.previewImage({
            urls: [URI]
        })
      })
  },
  startShakeChange() {
    shake().then(() => {
      this.init();
    });
  },
  init() {
    const query = wx.createSelectorQuery();
    query
      .select("#myCanvas")
      .fields({ node: true, size: true })
      .exec((res) => {
        console.log(res);
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
            src: this.randomBg(),
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
          this.drawText(ctx, formatTime(new Date()), width, 30 * dpr, 50 * dpr, `${20 * dpr}px serif`)
          this.drawText(ctx, `星期${this.data.dayMap[new Date().getDay()]}`, width, 30 * dpr, 80 * dpr, `${16 * dpr}px Georgia`)
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
          this.startShakeChange();
        });
      });
  },
  getQianList: function () {
    wx.cloud.callFunction({
      name: "tableOperate",
      data: {
        type: "getAll",
        cName: "qian",
      },
      success: (res) => {
        const list = res.result.data || [];
        this.setData({
          qianList: list
        });
        wx.nextTick(() => {
            this.init();
        });
      },
    });
  },

  showTip() {
    const app = getApp();
    wx.cloud.callFunction({
      name: "tableOperate",
      data: {
        type: "get",
        cName: "firstEnterRecord",
        query: {
          openid: app.globalData.openid
        }
      },
      success: (res) => {
        const list = res.result.data || [];
        if(list.length <= 0) {
          // 给予提示
          wx.showModal({
            title: '友情提示',
            content: '摇一摇可以切换背景，长按支持转图片，继续长按可分享或保存到本地',
            showCancel: false,
            confirmText: '知道了'
          });
          wx.cloud.callFunction({
            name: 'tableOperate',
            data: {
              type: 'add',
              cName: 'firstEnterRecord',
              data: {
                openid: app.globalData.openid
              }
            }
          })
        }
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getQianList();
    this.showTip();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.startShakeChange();
  },

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
