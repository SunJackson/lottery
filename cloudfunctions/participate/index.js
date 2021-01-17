

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {

  console.log(event);

  let lotteryId = event.lotteryId;

  const {
    OPENID
  } = cloud.getWXContext();

  let res = await db.collection('user').where({
    openid: OPENID
  }).get();

  try {
    const _ = db.command
    db.collection('lottery').doc(lotteryId).update({
      // data 字段表示需新增的 JSON 数据
      data: {
        num : _.inc(1),
      }
    })
    .then(res => {
      console.log(res)
    })
    .catch(err=>{
      console.log(err);
    });
    return await db.collection('participate').add({
      data: {
        openid: OPENID,
        lotteryId: lotteryId,
        userInfo: res.data[0]['userInfo'],
        participatedTime: new Date(),
        helpNo: 0,
        helpList: new Array(),
        winner: false
      }
    });

  } catch(e) {
    console.error(e)
  }
}