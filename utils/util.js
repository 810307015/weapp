const formatTime = (date, isNeedTime = false) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if(isNeedTime) {
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }

  return [year, month, day].map(formatNumber).join('/');
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 
 * @param {身高} height 
 * @param {是否是女性} isFemale 
 */
const getStandardWeight = (height, isFemale) => {
  let weight = (height - 80) * 0.7;
  if(isFemale) {
    weight = (height - 70) * 0.6;
  }
  return weight.toFixed(2);
}

/**
 * 
 * @param {身高} height 
 * @param {体重} weight 
 */
const getBMI = (height, weight) => {
  return (weight / (height * height)).toFixed(2);
}

const BMI_REFER = [
  {
    label: '偏瘦',
    range: '<= 18.4'
  },
  {
    label: '正常',
    range: '18.5 ~ 23.9'
  },
  {
    label: '过重',
    range: '24.0 ~ 27.9'
  },
  {
    label: '肥胖',
    range: '>= 28.0'
  }
];

const shake = () => {
  return new Promise((resolve, reject) => {
    wx.startGyroscope({
      success: (res) => {
        let temp = { x: "0", y: "0", z: "0" };
        let count = 0,
          time = 0;
        wx.onGyroscopeChange((e) => {
          if (temp === null) {
            temp = e;
          }
          if (Math.abs(temp.x - e.x) > 1.5) {
            time += 1;
          }
          if (Math.abs(temp.y - e.y) > 1.5) {
            time += 1;
          }
          if (Math.abs(temp.z - e.z) > 1.5) {
            time += 1;
          }
          count += 1;
          temp = e;
          if (count >= 3 && time >= 9) {
            wx.vibrateShort();
            wx.offGyroscopeChange();
            wx.stopGyroscope();
            resolve();
          }
        });
      },
    });
  })
}

module.exports = {
  formatTime,
  getStandardWeight,
  getBMI,
  shake,
  BMI_REFER
}
