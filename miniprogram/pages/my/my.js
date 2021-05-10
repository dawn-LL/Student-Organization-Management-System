// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      name:"",
      gender:"",
      avatar:"",
      student_id:"",
      college:"",
      major:"",
      grade:"",
      class:"",
      introduction:"",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'get-student-info',
      data:{
        id:getApp().globalData.userInfo.id
      },
      success:res=>{
        console.log("[我的][get-student-info]", res)
        this.setData({
          userInfo:{
            name:res.result.data.name,
            gender:"0",
            avatar:res.result.data.avatar,
            student_id:res.result.data.student_id,
            college:"0",
            major:"0",
            grade:"0",
            class:"0",
            introduction:(res.result.data.introduction?res.result.data.introduction:"无"),
          }
        })
      }
    })
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