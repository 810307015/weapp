// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

const generateRecord = () => {
  const list = new Array(3).fill(0).map(() => Math.floor(Math.random() * 10));
  let index = list[0] * 100 + list[1] * 10 + list[2];
  while (index >= 384) {
    index -= 384;
  }
  return index;
};

const getRecord = async () => {
  const wxContext = cloud.getWXContext();
  const { OPENID } = wxContext;

  const {
    result: { data },
  } = await cloud.callFunction({
    name: "tableOperate",
    data: {
      type: "get",
      cName: "dayQianRecord",
      query: {
        openid: OPENID,
      },
    },
  });
  
  let _index = -1;
  if (data && data[0]) {
    const { index, date } = data[0];
    _index = index;
    const curDay = new Date(date).toLocaleDateString();
    const nowDay = new Date().toLocaleDateString();
    if (curDay !== nowDay) {
      _index = generateRecord();
      await cloud.callFunction({
        name: "tableOperate",
        data: {
          type: "edit",
          id: data[0]._id,
          cName: "dayQianRecord",
          data: {
            openid: OPENID,
            index: _index,
            date: new Date(),
          },
        },
      });
    }
  } else {
    _index = generateRecord();
    await cloud.callFunction({
      name: "tableOperate",
      data: {
        type: "add",
        cName: "dayQianRecord",
        data: {
          openid: OPENID,
          index: _index,
          date: new Date(),
        },
      },
    });
  }
  return _index;
};

// 云函数入口函数
exports.main = async (event, context) => {
  const index = await getRecord();
  return {
    data: {
      index,
    },
  };
};
