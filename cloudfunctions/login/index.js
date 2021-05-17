// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: 'dawn-0gwq7rxef71fdb3f'
})

/**
 * event 参数包含小程序端调用传入的 data
 */

exports.main = async (event, context) => {

  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看
  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息

  const db = cloud.database()
  
  let res =  await db.collection("student").where({
    student_id:event.account
  }).get()
  console.log("rse:", res)

  console.log("event:", event)
  
  if (event.password == res.data[0].password) {
    return {
      msg:"success",
      name:res.data[0].name,
      id:res.data[0]._id,
      avatar:res.data[0].avatar,
    }
  } else {
    return {msg:"密码错误"}
  }
}

