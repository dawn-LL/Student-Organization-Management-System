// pages/home/home.js

// 数据库
const db = wx.cloud.database()
const createRecycleContext = require('miniprogram-recycle-view')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    organizations:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前用户所在的组织列表
    wx.cloud.callFunction({
      name:'get-organization-list',
      data:{
        userInfo:getApp().globalData.userInfo
      },
      success:res => {
        console.log("[get-organization-list] [返回结果]", res)
        this.setData({
          organizations:res.result.data
        })
      },
      failed:res => {
        console.log("[get-organization-list] [errMsg] ", res)
      }
    })
    
    // 管理 recycle-view 的数据
    var ctx = createRecycleContext({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: this,
      itemSize: { // 这个参数也可以直接传下面定义的this.itemSizeFunc函数
        width: 414,
        height: 66
      }
    })
    ctx.append(this.data.organizations)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad();
    setTimeout(() => {
      wx.hideNavigationBarLoading() //隐藏标题栏显示加载状态
      wx.stopPullDownRefresh() //结束刷新
    }, 2000); //设置执行时间
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})