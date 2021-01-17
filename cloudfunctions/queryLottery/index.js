// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  const wxContext = cloud.getWXContext()

  let openid = wxContext.OPENID;

  let pageIndex = event.page - 1;
  let pageSize = event.size;
  let skipIndex = pageIndex * pageSize;

  let totalPage;
  let lotteriesRes;
  let countResult;

  countResult = await db.collection('lottery').where({
    status: 1
  }).count();
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 10)

  let res1 = await db.collection('lottery')
  .aggregate()
  .match({
    status: 1
  })
  .skip(skipIndex)
  .limit(pageSize)
  .end()


  let res2 = await db.collection('participate')
  .aggregate()
  .match({
    openid: openid
  })
  .limit(1000)
  .end()

  console.log('res1',res1);
  console.log('res2',res2);
  
  let items1 = res1.list;
  let items2 = res2.list;
  let arr = [];
  items2.forEach(element => {
    arr.push(element.lotteryId);
  });

  console.log('items1',items1)
  items1.forEach(element => {
    element.has = false;
    if(arr.indexOf(element._id) != -1){
      element.has = true;
    }
    
  });

  console.log('items1',items1)



  return {
    total,
    totalPage: batchTimes,
    data: items1,
    openid: openid
  }
}