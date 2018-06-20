//获取应用实例
var app = getApp();
var webconfig = require("../../webconfig.js");
Page({
      data: {
      
      },
      onLoad: function () {
      
      },
      formSubmit: function(e){
        //判断是否为空
        if (e.detail.value.password != e.detail.value.repassword){
          wx.showModal({
            title: '错误',
            content: '请保证两次输入的密码一致',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        if (!e.detail.value.input || !e.detail.value.password || !e.detail.value.email){
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
        }else{
          //提交用户信息到服务端
          wx.request({
            url: webconfig.wx_register,
            method: "POST",
            data: {
              username: e.detail.value.input,
              password: e.detail.value.password,
              email: e.detail.value.email
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              if (res.data.status == 1){
                wx.showModal({
                  title: '成功',
                  content: '恭喜您注册成功',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: "../login/login",
                        //接口调用成功的回调方法
                        fuccess: function () {},
                      })
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
              } else if (res.data.status == 2){
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