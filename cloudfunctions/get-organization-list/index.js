// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'dawn-0gwq7rxef71fdb3f'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let res = await db.collection('organization').where({
    organization_member:event.userInfo.id
  }).get()
  console.log("返回结果:", res)
  return res;
}