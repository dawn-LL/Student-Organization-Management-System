// pages/create_organization/create_organization.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    organization:{
      organization_name:"",
      organization_avatar:"",
      admin:"",
      organization_member:[]
    },
    defaultImages:[
      "../../images/uploader.png",
      "../../images/default_01.png",
      "../../images/default_02.png",
      "../../images/default_03.png"
    ],
    selectedImageIndex: -1,//选中图片index
    disabled:true,
  },

  /**
   * 更新button状态
   */
  updateDisabled:function() {
    if (this.data.organization.organization_name != '' && this.data.selectedImageIndex > -1) {
      this.setData({
        disabled:false
      })
    } else {
      this.setData({
        disabled:true
      })
    }
  },

  /**
   * 组织名称输入
   */
  organizationNameInput:function(e) {
    this.data.organization.organization_name = e.detail.value
    this.updateDisabled()
    console.log(this.data)
  },

  /**
   * 上传头像
   */
  uploadImage:function(e) {
    wx.chooseImage({
      count: 1,
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
        var originalDefaultImages = this.data.defaultImages
        originalDefaultImages[0] = tempFilePaths
        debugger
        this.setData({
          selectedImageIndex:0,
          defaultImages:originalDefaultImages
        })
        this.updateDisabled()
      }
    })
  },

  /**
   * 选择默认头像
   */
  chooseDefaultImage:function(e) {
    this.setData({
      selectedImageIndex:e.currentTarget.id
    })
    this.updateDisabled()
  },

  /**
   * 创建组织
   * 如果是自定义图片上传至云端
   * 默认图片则无需上传，直接使用本地路径
   */
  createOrganization:function(e) {
    if (this.data.selectedImageIndex == 0){//如果是自定义图片
      var parser = this.data.defaultImages[0]
      console.log("[本地图片路径]", parser)
      var array = parser.split('/')
      var pathname = array[array.length - 1]
      console.log("[头像 pathname]", pathname)
      wx.cloud.uploadFile({
        cloudPath:pathname,
        filePath:this.data.defaultImages[0],
      }).then(res => {
        console.log("[文件上传返回]", res)
        this.data.organization.organization_avatar = res.fileID
        this.data.organization.admin = getApp().globalData.userInfo.id
        this.data.organization.organization_member = [getApp().globalData.userInfo.id]
        this.updateOrganizationDatabase(this.data.organization)
      })
    } else {
      this.data.organization.organization_avatar = this.data.defaultImages[this.data.selectedImageIndex]
      this.data.organization.admin = getApp().globalData.userInfo.id
      this.data.organization.organization_member = [getApp().globalData.userInfo.id]
      this.updateOrganizationDatabase(this.data.organization)
    }
  },

  /**
   * 在数据库中添加记录
   */
  updateOrganizationDatabase:function(e) {
    const db = wx.cloud.database()
    db.collection('organization').add({
      data:e
    }).then(res => {
      console.log("[添加组织]", res)
      wx.navigateBack({
        delta: 0,
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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