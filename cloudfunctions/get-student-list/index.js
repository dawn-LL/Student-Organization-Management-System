// 云函数入口文件
const cloud = require('wx-server-sdk')
const pinyin = require('pinyin')

cloud.init({
  env:'dawn-0gwq7rxef71fdb3f'
})

// 云函数入口函数
/**
 * 
 * @param {id} event 
 * @param {*} context 
 * 根据组织id返回组织成员字典序列表
 * [{
 *  alpha:'a',
 *  list:[]
 * }, {
 *  alpha:'b',
 *  list:[]
 * }]
 */
exports.main = async (event, context) => {
  const db = cloud.database()
  let org_info = await db.collection('organization').doc(event.organization_id).get()
  console.log("id=", event.organization_id, "org_info:", org_info)
  var array = org_info.data.organization_member//组织成员id列表

  var list = []//学生姓名和首字母列表（用于排序）
  for(let i = 0; i < array.length; i++) {
    let stu_item = await db.collection('student').doc(array[i]).get()
    console.log("[stu_item]", stu_item)
    //排序数组元素
    let list_cell = {
      name:"",
      alpha:"",
      avatar:"",
    }
    list_cell.avatar = stu_item.data.avatar
    list_cell.name = stu_item.data.name
    let alpha = pinyin(stu_item.data.name, {
      style:pinyin.STYLE_FIRST_LETTER
    })
    list_cell.alpha = alpha[0]
    console.log("[list_cell]", list_cell)
    list[i] = list_cell
  }
  list = list.sort((a, b) => {
    return pinyin.compare(a.name, b.name)
  })
  console.log("[sorted list]", list)

  var res = []//返回结果
  var res_length = 0
  var res_cell = {
    alpha:"",
    list:[]
  }
  for(let i = 0; i < list.length; i++) {
    if(i == 0) {
      res_cell.alpha = list[i].alpha
    } else if(list[i].alpha > list[i-1].alpha) {
      res[res_length++] = Object.assign({}, res_cell)
      res_cell.alpha = list[i].alpha
      res_cell.list = []
    }
    res_cell.list.push(list[i])
  }
  res[res_length++] = Object.assign({}, res_cell)
  console.log("[返回结果]", res)
  return res
}