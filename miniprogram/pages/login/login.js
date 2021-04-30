// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:'',
    password:'',
  },

  // 获取输入账号 
  accountInput: function (e) { 
  this.setData({ 
   account:e.detail.value 
  })
  },

  // 获取输入密码
  passwordInput: function (e) {
    this.setData({
      password:e.detail.value
    })
  },

  // 登陆请求
  loginRequest: function () {
    if (this.data.account.length == 0 || this.data.password.length == 0) { 
      wx.showToast({ 
      title: '学号和密码不能为空', 
      icon: 'error', 
      duration: 2000 
      })
    } else {
      //do request
      wx.showToast({ 
        title: '登录成功', 
        icon: 'success', 
        duration: 2000 
      })
    }
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