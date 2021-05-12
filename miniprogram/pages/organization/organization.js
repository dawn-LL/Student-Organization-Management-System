// pages/organization/organization.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    organization:{
      organization_id:"",
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
    var organizationData = {
      organization_id:options.organization_id,
      organization_name:options.organization_name,
      organization_avatar:options.organization_avatar,
      admin_id:options.admin_id,
      announcement:options.announcement,
      organization_member_number:options.organization_member_number,
    }
    wx.cloud.callFunction({
      name:'get-student-info',
      data:{
        id:options.admin_id
      },
    }).then(res => {
      console.log("[organization][amdin_info]", res)
      organizationData.admin_name = res.result.data.name
      this.setData({
        organization : organizationData
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