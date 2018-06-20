var app = getApp();
var webconfig = require("../../webconfig.js");
Page({
  data: {
    oid:0,
    dataInfo:{},
    agreeStatus:1,
    refuseStatus: 2,
    login_user_id: 0
  },
  onLoad: function (option) {
    var that = this;
    wx.getStorage({
      key: 'login_user_id',
      success: function (res) {

        that.setData({
          login_user_id: res.data
        })
      }
    });
    that.setData({
      oid: option.oid
    })

    //判断用户类型
    wx.request({
      url: webconfig.getOrderDetail,
      method: "POST",
      data: {
        oid: that.data.oid
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
    
        if (res.data.status == 1){
   
          that.setData({
            dataInfo: res.data.dataInfo
          })
        }else{
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
  },
  checkStatus: function(e){
  
   var that = this;
    //判断用户类型
    wx.request({
      url: webconfig.checkOrderStatus,
      method: "POST",
      data: {
        oid: that.data.oid,
        checkResult: e.target.dataset.id
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {

        if (res.data.status == 1) {
          wx.showModal({
            title: '消息',
            content: res.data.msg,
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../check-order-list/check-order-list?login_user_id=' + that.data.login_user_id
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
    })
  },


})
