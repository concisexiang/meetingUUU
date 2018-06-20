//获取应用实例
var app = getApp();
var webconfig = require("../../webconfig.js");
Page({
      data: {
      
      },
      onLoad: function () {
      
      },
    formSubmit:function(e){
        if(!e.detail.value.username || !e.detail.value.password){
            wx.showModal({
                title: '警告',
                content: '请正确填写参数',
                success: function(res) {
                    if (res.confirm) {
                    console.log('用户点击确定')
                    } else if (res.cancel) {
                    console.log('用户点击取消')
                    }
                }
            })
        }else{
          wx.request({
            url: webconfig.wx_login,
            method: "POST",
            data: {
              username: e.detail.value.username,
              password: e.detail.value.password
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              
              var uid = res.data.uid;
          
              if (res.data.status == 1) {
                wx.showModal({
                  title: '成功',
                  content: '恭喜您登陆成功',
                  success: function (res) {
                
                    if (res.confirm) {
                      wx.setStorage({
                        key: 'login_user_id',
                        data: uid,
                        success: function(res){
                        
                          wx.switchTab({
                            url: '../index/index?login_user_id='+uid,   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
                          })
                        }
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
        var formData = e.detail.value;

    }

})