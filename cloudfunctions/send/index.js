const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

function getFormatDate(ms) {
  let date = new Date();
date.setTime(date.getTime() + ms);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = '0' + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate;
  }
  let currentdate = year + '-' + month + '-' + strDate;
  return currentdate;
};

exports.main = async (event, context) => {
  try {
    const { OPENID } = cloud.getWXContext()
    const sendParams = {
      touser: OPENID,
      page: '/pages/index/index',
      data: {
        thing4: {
          value: event.thing4?event.thing4:'抽奖活动开始提醒'
        },
        date3: {
          value: event.date3?event.date3:getFormatDate(0)
        },
        thing2: {
          value: event.thing2?event.thing2:'请进入小程序查询详情'
        },
        name1: {
          value: event.name1?event.name1:'查看详情'
        },
        thing7: {
          value: event.thing7?event.thing7:'请进入小程序查看注意事项'
        }
      },
      templateId: '-7Hp39YvU2zNnULRZl8LTgF88HfAhtCT3wrukJ-zJW8'
    }

    const result = await cloud.openapi.subscribeMessage.send(sendParams)
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}