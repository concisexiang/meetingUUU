//获取应用实例
var app = getApp();
var webconfig = require("../../webconfig.js");
Page({
      data: {
        login_user_id:0
      },
      onLoad: function (options) {
        this.setData({
          login_user_id: options.login_user_id
        });
        
      },
      formSubmit: function(e){

        if (!e.detail.value.name || !e.detail.value.address){
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
            url: webconfig.wx_apply_complay,
            method: "POST",
            data: {
              name: e.detail.value.name,
              address: e.detail.value.address,
              uid: this.data.login_user_id
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              if (res.data.status == 1){
                wx.showModal({
                  title: '成功',
                  content: res.data.msg,
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: "../myself/index",
                        //接口调用成功的回调方法
                        fuccess: function () {},
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