// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
  console.log(event)
  console.log(context)

  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息
  const wxContext = cloud.getWXContext()
  let lesson = "云开发技术训练营";
  let enname = "CloudBase Camp";
  let x = 3, y = 4, z = 5.001, a = -3, b = -4, c = -5;
  let now = new Date();
  return {
    movie: { name: "霸王别姬", img: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.webp", desc: "风华绝代。" },
    movielist:["肖申克的救赎", "霸王别姬", "这个杀手不太冷", "阿甘正传", "美丽人生"],
    charat: lesson.charAt(4),
    concat: enname.concat(lesson),
    uppercase: enname.toUpperCase(),
    abs: Math.abs(b),
    pow: Math.pow(x, y),
    sign: Math.sign(a),
    now: now.toString(),
    fullyear: now.getFullYear(),
    date: now.getDate(),
    day: now.getDay(),
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    time: now.getTime(),
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}

