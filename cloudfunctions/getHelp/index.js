// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const {
    OPENID
  } = cloud.getWXContext();

  console.log(event);

  let lotteryId = event.lotteryId;

  try {
    return await db.collection('participate')
    .where({
      lotteryId: lotteryId,
      openid: OPENID,
    })
    .field(
      {
        helpNo: true
      }
    )
    .limit(1)
    .get()

  } catch(e) {
    console.error(e)
  }
}