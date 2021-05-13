// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'dawn-0gwq7rxef71fdb3f'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let res = {
    data:{}
  }
  if (event.id != undefined) {
    res = await db.collection('student').doc(event.id).get()
  } else if (event.student_id != undefined) {
    let tmp = await db.collection('student').where({
      student_id:event.student_id
    }).get()
    res.data = tmp.data[0]
  }

  console.log("[get-student-info-event]", event)
  console.log("[get-student-info-res]", res)
  return res
}