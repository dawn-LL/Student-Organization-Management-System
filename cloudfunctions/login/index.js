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

