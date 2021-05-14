const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: null,
    userId:'',
    logged: true,
    takeSession: false,
    requestResult: '',
    chatRoomEnvId: 'dawn-0gwq7rxef71fdb3f', //环境id
    chatRoomCollection: 'chatroom',         //聊天集合名称
    chatRoomGroupId: '',                    //组织id
    chatRoomGroupName: '',                  //组织名称
  },

  onLoad: function(e) {
    // 获取用户信息
    this.setData({
      chatRoomGroupId: e.organization_id,
      chatRoomGroupName: e.organization_name,
      avatarUrl: app.globalData.userInfo.avatar,
      userInfo: app.globalData.userInfo,
      userId: app.globalData.userInfo.id,
    })
    console.log("[chatroom info]", this.data)

    wx.getSystemInfo({
      success: res => {
        console.log('[system info]', res)
        if (res.safeArea) {
          const { top, bottom } = res.safeArea
          this.setData({
            containerStyle: `padding-top: ${(/ios/i.test(res.system) ? 10 : 20) + top}px; padding-bottom: ${20 + res.windowHeight - bottom}px`,
          })
        }
      },
    })
  },

  getStudentDocID: async function() {
    if (app.globalData.userInfo.id) {
      return app.globalData.userInfo.id
    }
    const { result } = await wx.cloud.callFunction({
      name: 'login',
    })
    return result.id
  },

  onShareAppMessage() {
    return {
      title: '聊天室',
      path: '/pages/room/room',
    }
  },
})
