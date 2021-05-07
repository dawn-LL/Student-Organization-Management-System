// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'dawn-0gwq7rxef71fdb3f'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let res = await db.collection('student').doc(event.id).get()
  console.log("[get-student-info] id=", event.id, "res=", res)
  return res
}