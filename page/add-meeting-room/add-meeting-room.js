//获取应用实例
var app = getApp();
var webconfig = require("../../webconfig.js");
Page({
  data: {
    login_user_id: 0
  },
  onLoad: function (options) {
    this.setData({
      login_user_id: options.login_user_id
    });

  },
  formSubmit: function (e) {

    if (!e.detail.value.price || !e.detail.value.recommended_number || !e.detail.value.address) {
      wx.showModal({
        title: '错误',
        content: '请填写正确参数，再进行提交',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.request({
        url: webconfig.addMeetingRoom,
        method: "POST",
        data: {
          price: e.detail.value.price,
          recommended_number: e.detail.value.recommended_number,
          address: e.detail.value.address,
          uid: this.data.login_user_id
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          if (res.data.status == 1) {
            wx.showModal({
              title: '成功',
              content: res.data.msg,
              success: function (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: "../index/index",
                    //接口调用成功的回调方法
                 
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            wx.showModal({
              title: '错误',
              content: res.data.msg,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      });
    }
  }

})