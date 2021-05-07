// pages/organization/announcement/announcement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    organization_id:"",
    announcements:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    await wx.cloud.callFunction({
      name:'get-organization-info',
      data:{
        id:options.organization_id
      }
    }).then(res=>{
      console.log("[公告][返回结果]", res)
      this.setData({
        organization_id:options.organization_id,
        announcements:res.result.data.announcement
      })
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