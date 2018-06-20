//获取应用实例
var app = getApp();
var webconfig = require("../../webconfig.js");
Page({
  data: {
    uid:0,
    oid:0
  },
  onLoad: function (option) {
    this.setData({
      uid: option.uid,
      oid: option.oid
    })
  
  },
  formSubmit: function (e) {
    var that = this;
    //判断是否为空

    if (!e.detail.value.password) {
      wx.showModal({
        title: '错误',
        content: '请填写正确密码',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {

      //提交用户信息到服务端
      wx.request({
        url: webconfig.payFinish,
        method: "POST",
        data: {
          oid: that.data.oid
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {

          if (res.data.status == 1) {

            wx.navigateTo({
              url: '../qrcode/qrcode?uid=' + that.data.uid + '&oid=' + that.data.oid
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
      })

    }

  }

})