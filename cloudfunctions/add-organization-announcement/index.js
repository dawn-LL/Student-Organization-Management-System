// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'dawn-0gwq7rxef71fdb3f'
})

exports.main = async (event, context) => {
  const db = cloud.database()
  db.collection('organization').doc(event.organization_id).update({
    data:{
      announcements:db.command.push({
        each:[event.announcement],
        position:0
      })
    }
  }).then(res => {
    console.log("[添加公告]",res)
  })
}