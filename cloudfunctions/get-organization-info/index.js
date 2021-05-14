// 云函数入口文件
const cloud = require('wx-server-sdk')



cloud.init({
  env:'dawn-0gwq7rxef71fdb3f'
})

/**
 * 
 * @param { id 组织doc_id option 返回信息} event 
 * option{
 * todo:按参数返回信息
 * }
 * @param {*} context 
 */
exports.main = async (event, context) => {
  const db = cloud.database()
  let res = await db.collection('organization').doc(event.id).get()
  console.log("[get-organization-info] id=", event.id, "res=", res)
  return res
}