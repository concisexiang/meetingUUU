//获取应用实例
var app = getApp();
var webconfig = require("../../webconfig.js");
Page({
  data: {
    login_user_id: 0,
    mid:0
  },
  onLoad: function (option) {


    var that = this;
    wx.getStorage({
      key: 'login_user_id',
      success: function (res) {

        that.setData({
          login_user_id: res.data,
          mid: option.mid
        })
      }
    });
  },
  formSubmit: function (e) {

    //判断是否为空
    if (!e.detail.value.theme || !e.detail.value.number || !e.detail.value.explain_use) {
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
      var that = this;
      //提交用户信息到服务端
      wx.request({
        url: webconfig.postOrderMeeting,
        method: "POST",
        data: {
          theme: e.detail.value.theme,
          people_number: e.detail.value.number,
          explain_use: e.detail.value.explain_use,
          uid: this.data.login_user_id,
          mid: this.data.mid
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
                    url: '../index/index?login_user_id=' + that.data.login_user_id,  //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
                  })
         
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else{
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