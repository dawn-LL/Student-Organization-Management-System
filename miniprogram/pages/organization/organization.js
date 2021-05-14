// pages/organization/organization.js
const globalData = getApp().globalData
const db = wx.cloud.database()
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
    },
    loading:true
  },

  /**
   * 退出组织
   */
  exitOrganization:function(e) {
    if (this.data.organization.admin_id == globalData.userInfo.id) {
      wx.showModal({
        title:'确定解散组织吗',
        content:'由于你是管理员，退出即解散组织，不可撤销',
        confirmColor:'#F76260',
        cancelColor: '#AAAAAA',
        success: res => {
          if (res.confirm == true) {
            //解散，删除记录
            db.collection('organization').doc(this.data.organization.organization_id).remove({
              success: res => {
                console.log("[解散组织]", res)
                wx.navigateBack({
                  delta: 0,
                  success: res => {
                    wx.showToast({
                      title: '解散成功',
                    })
                  }
                })
              }
            })
          }
        }
      })
    } else {
      wx.showModal({
        title:'确定退出组织吗',
        content:'操作不可撤销',
        confirmColor:'#F76260',
        cancelColor: '#AAAAAA',
        success: res => {
          if (res.confirm == true) {
            //退出，删除成员
            db.collection('organization').doc(this.data.organization.organization_id).update({
              data:{
                'organization_member':db.command.pull(globalData.userInfo.id)
              }
            }).then(res => {
              console.log("[退出组织]", res)
                wx.navigateBack({
                  delta: 0,
                  success: _res => {
                    wx.showToast({
                      title: '退出成功',
                    })
                  }
                })
            })
          }
        }
      })
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
        organization : organizationData,
        loading:false
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