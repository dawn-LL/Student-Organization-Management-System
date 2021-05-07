// pages/organization/organization.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    organization:{
      organization_name:"",
      organization_avatar:"",
      admin_id:"",
      admin_name:"",
      announcement:"",
      organization_member_number:"",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      organization : {
        organization_name:options.organization_name,
        organization_avatar:options.organization_avatar,
        admin_id:options.admin_id,
        admin_name:options.admin_name,
        announcement:options.announcement,
        organization_member_number:options.organization_member_number,
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