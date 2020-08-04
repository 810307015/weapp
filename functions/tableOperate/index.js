// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() // 打开数据库
const MAX_LIMIT = 100; // 微信小程序每次查询最大只能为100条

// 新增方法
const insertToCollection = async (cName = '', data = {}) => {
  try {
    const res = await db.collection(cName).add({
      data
    });
    return res;
  } catch (e) {
    return {
      err: e
    }
  }
}

// 查询所有
const getAllInCollection = async (cName = '') => {
  try {
    // 先取出集合记录总数
    const countResult = await db.collection(cName).count()
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / 100)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection(cName).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promise)
    }
    // 等待所有
    let result = (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
    });
    return result;
  } catch (e) {
    return {
      err: e
    }
  }
}

// 根据查询条件查询
const getInCollection = async(cName = '', query = {}) => {
  try {
    const res = await db.collection(cName).where(query).get();
    return res;
  } catch(err) {
    return {
      err
    }
  }
}

// 更新某条数据
const updateInCollection = async (cName = '', data = {}, id = '') => {
  try {
    const res = await db.collection(cName).doc(id).update({
      data: data
    });
    return res;
  } catch(err) {
    return {
      err
    }
  }
}

// 删除某条记录
const deleteInCollection = async (cName = '', id = '') => {
  try {
    const res = await db.collection(cName).doc(id).remove();
    return res;
  } catch(err) {
    return {
      err
    };
  }
}

// 云函数入口函数
/**
 * 
 * @param {*} data，需要新增或编辑的数据 
 * @param {*} type，操作类型, add, edit, getAll, get, delete
 * @param {*} cName，集合名称
 * @param {*} query，查询条件
 * @param {*} id，记录的id 
 */
exports.main = async (event, context) => {
  const { data = {}, type = '', cName = '', query = {}, id = '' } = event;
  let res = {};
  switch(type) {
    case 'add':
      res = await insertToCollection(cName, data);
      break;
    case 'getAll':
      res = await getAllInCollection(cName, data);
      break; 
    case 'get':
      res = await getInCollection(cName, query);
      break;
    case 'edit':
      res = await updateInCollection(cName, data, id);
      break;
    case 'delete':
      res = await deleteInCollection(cName, id);
      break;       
  }
  return res;
}