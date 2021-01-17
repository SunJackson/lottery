// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);

  let lotteryId = event.lotteryId;
  let parentOpenid = event.parentOpenid;
  const { OPENID } = cloud.getWXContext();
  console.log(OPENID)

  const _ = db.command
  try {
    return await db.collection('participate').where({
      openid: parentOpenid,
      lotteryId: lotteryId
    })
    .update({
      data: {
        helpNo: _.inc(1),
        helpList: _.push([OPENID])
      },
    })
  } catch(e) {
    console.error(e)
  }
}