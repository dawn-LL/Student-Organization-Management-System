// pages/organization/announcement/create_announcement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    organization_id:"",
    announcement:"",
  },

  /**
   * 输入公告
   */
  announcementInput:function(e) {
    this.data.announcement = e.detail.value
  },

  /**
   * 发布公告
   */
  publishAnnouncement:function() {
    var timestamp = new Date().getTime();
    var author = getApp().globalData.userInfo.name
    var announcement = {
      author:author,
      content:this.data.announcement,
      create_time:timestamp
    }
    wx.cloud.callFunction({
      name:'add-organization-announcement',
      data:{
        organization_id:this.data.organization_id,
        announcement:announcement
      },
      success:res => {
        console.log("[添加公告]",res)
        let pages = getCurrentPages()
        //公告列表页面（只更新公告列表）
        let announcementPage = pages[pages.length - 2];
        let originalAnnouncementData = announcementPage.data.announcements
        originalAnnouncementData.insert(0, announcement)
        announcementPage.setData({
          announcements:originalAnnouncementData
        })
        //组织页（只更新公告）
        let organizationPage = pages[pages.length - 3]
        let originalOrganizationData = organizationPage.data.organization
        originalOrganizationData.announcement = announcement.content
        organizationPage.setData({
          organization:originalOrganizationData
        })
        wx.navigateBack()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.organization_id = options.organization_id
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