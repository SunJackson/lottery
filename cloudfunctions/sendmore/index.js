const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {

  let res = await db.collection('lottery')
  .aggregate()
  .match({
    status: -1,
    lottery: 1,
    send: 0
  })
  .limit(1000)
  .end()

  console.log(res);

  let items = res.list;
  items.forEach(async (element) => {
    console.log(element);
    let lottery = element['_id'];
    let title = element['rewards'][0]['name'];

    let res2 = await db.collection('participate')
    .aggregate()
    .match({
      lotteryId: lottery
    })
    .limit(1000)
    .end()

    let lists = res2.list;
    const sendPromises = lists.map(async part =>  {
      console.log(part);
      try{
          let sendParams = {
            touser: part['openid'],
            page: '/pages/participate/index?lotteryId='+lottery,
            data: {
              thing1: {
                value: title
              },
              thing4: {
                value: '中奖后请及时联系客服进行兑奖哦'
              },
              
            },
            template_id: 'mQ20r2nwV8sc-R5GRv05ykoQCfgAlnIFsqkgs1na_YY',
            };
          console.log(sendParams);
          const result = await cloud.openapi.subscribeMessage.send(sendParams)
          console.log(result)
          return result      
    }catch(e){
      //TODO handle the exception
      console.log('发送失败');
      console.log(e);
    }
     
    })
    db.collection('lottery').doc(lottery).update({
      // data 字段表示需新增的 JSON 数据
      data: {
        send: 1
      }
    })
    return Promise.all(sendPromises)
  });

  


}