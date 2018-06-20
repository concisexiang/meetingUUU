//获取应用实例
var app = getApp();
var webconfig = require("../../webconfig.js");
Page({
  data: {
    uid:0,
    oid: 0,
  },
  onLoad: function (option) {
    this.setData({
      uid: option.uid,
      oid: option.oid
    })
    var uid = option.uid;
    var oid = option.oid;
    wx.request({
      url: webconfig.meetingOrderResult,
      method: "POST",
      data: {
        oid: option.oid

      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
     
      }
    })
  },
  toIndex:function(){
    wx.switchTab({
      url: '/page/index/index'
    })
  },
  formSubmit: function (e) {
      var that = this;
      //提交用户信息到服务端
      wx.request({
        url: webconfig.meetingOrderFinish,
        method: "POST",
        data: {
          oid: that.data.oid
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
                    fuccess: function () { },
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else if (res.data.status == 2) {
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

})