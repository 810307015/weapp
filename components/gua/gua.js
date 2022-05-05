// components/gua/gua.js
const GUA_MAP = [
  {
    yao: [ 1, 1, 1 ], // 乾卦，全是阳爻，阳爻用1表示，阴爻用0表示
    index: 1
  },
  {
    yao: [ 0, 1, 1 ], // 兑卦
    index: 2
  },
  {
    yao: [ 1, 0, 1 ], // 离卦
    index: 3
  },
  {
    yao: [ 0, 0, 1 ], // 震卦
    index: 4
  },
  {
    yao: [ 1, 1, 0 ], // 巽卦
    index: 5
  },
  {
    yao: [ 0, 1, 0 ], // 坎卦
    index: 6
  },
  {
    yao: [ 1, 0, 0 ], // 艮卦
    index: 7
  },
  {
    yao: [ 0, 0, 0 ], // 坤卦
    index: 8
  },
]
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    guaList: { // 卦象
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isActive: false,
    activeIndex: -1,
    gua: {},
    huGua: {},
    bianGua: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    exchange() {
      this.triggerEvent('exchange', { index: 0 })
    },
    start: function() {
      this.setData({
        isActive: !this.data.isActive
      }, () => {
        if(this.data.isActive) {
          this.timer = setInterval(() => {
            const index = Math.floor(Math.random()*64 + 1);
            this.setData({
              activeIndex: index
            });
          }, 50);
        } else {
          if(this.timer) {
            clearInterval(this.timer);
            const gua = this.data.guaList[this.data.activeIndex];
            const { top, bottom } = gua;
            const now = new Date();
            const hour = now.getHours();
            const minute = now.getMinutes();
            let chen = Math.floor((hour+1) / 2); // 时辰，23-1为子时
            if(minute > 0) {
              chen += 1;
            }
            const allCount = Number(top) + Number(bottom) + chen;
            const changeYao = allCount % 6; // 除以6取动爻
            const topGua = GUA_MAP[Number(top) - 1]; // 上卦
            const bottomGua = GUA_MAP[Number(bottom) - 1]; // 下卦
            // 取互卦
            const hTopGua =  [ topGua.yao[1], topGua.yao[2], bottomGua.yao[0] ]; // 互卦的上卦
            const hBottomGua =  [ topGua.yao[2], bottomGua.yao[0], bottomGua.yao[1] ]; // 互卦的下卦
            const hTopIndex = GUA_MAP.findIndex(gua => gua.yao.join(',') === hTopGua.join(','));
            const hBottomIndex = GUA_MAP.findIndex(gua => gua.yao.join(',') === hBottomGua.join(','));
            const hTop = GUA_MAP[hTopIndex].index;
            const hBottom = GUA_MAP[hBottomIndex].index;
            const huGua = this.data.guaList.find(gua => Number(gua.top) === Number(hTop) && Number(gua.bottom) === Number(hBottom));
            
            // 取变卦
            let bTopGua = [...topGua.yao],
                bBottomGua = [...bottomGua.yao],
                i = 0;
            if(changeYao > 3){
              i = 6 - changeYao;
              bTopGua[i] = bTopGua[i] === 0 ? 1 : 0;
            } else {
              i = 3 - changeYao;
              bBottomGua[i] = bBottomGua[i] === 0 ? 1 : 0;
            }
            const bTopIndex = GUA_MAP.findIndex(gua => gua.yao.join(',') === bTopGua.join(','));
            const bBottomIndex = GUA_MAP.findIndex(gua => gua.yao.join(',') === bBottomGua.join(','));
            const bTop = GUA_MAP[bTopIndex].index;
            const bBottom = GUA_MAP[bBottomIndex].index;
            const bianGua = this.data.guaList.find(gua => Number(gua.top) === Number(bTop) && Number(gua.bottom) === Number(bBottom));
            
            this.setData({
              gua,
              huGua,
              bianGua
            })
          }
        }
      });
    }
  }
})
