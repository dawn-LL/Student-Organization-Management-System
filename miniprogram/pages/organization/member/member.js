// pages/organization/member/member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    organization_id:"",
    member_list:[],
    manage_list:[{
      name:'添加成员',
      avatar:'../../../images/add_member.png',
    },{
      name:'移除成员',
      avatar:'../../../images/remove_member.png',
    }],
    loading:true,
  },

  /**
   * 成员管理
   */
  manageMember:function(e) {
    var title = ""
    if (e.currentTarget.id == 0) {//添加成员
      title = "请输入新成员的学号"
    } else {//移除成员
      title = "请输入移除成员的学号"
    }
    wx.showModal({
      title:title,
      content:"",
      editable:true,
      cancelColor: 'F1F1F1',
      success:res => {
        if (res.confirm) {
          if (res.content.length <= 0) {
            wx.showToast({
              title: '学号不能为空',
              icon: 'error',
            })
          } else {
            wx.showLoading({
              title: '操作中',
            })
            wx.cloud.callFunction({
              name:'get-student-info',
              data:{
                student_id:res.content
              }
            }).then(_res => {
              console.log("[get-student-info]", _res)
              const db = wx.cloud.database()
              var operation
              if (e.currentTarget.id == 0) {
                operation = db.command.push(_res.result.data._id)
              } else {
                operation = db.command.pull(_res.result.data._id)
              }
              db.collection('organization').doc(this.data.organization_id).update({
                data:{
                  "organization_member":operation
                }
              }).then(__res => {
                console.log("[manageMember]", __res)
                this.requestAlphaList({
                  organization_id:this.data.organization_id
                })
                wx.hideLoading({
                  success: (res) => {
                    wx.showToast({
                      title: '操作完成',
                    })
                  },
                })
              })
            })
          }
        }
      }
    })
  },

  /**
   * 请求字典序list
   */
  requestAlphaList:function(e) {
    wx.cloud.callFunction({
      name:'get-student-list',
      data:{
        organization_id:e.organization_id
      },
      success:res => {
        console.log("[组织成员][返回结果]", res)
        this.setData({
          member_list:res.result,
          organization_id:e.organization_id
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestAlphaList({
      organization_id:options.organization_id
    }).then(res => {
      this.setData({
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