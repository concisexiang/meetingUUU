var webconfig = require("../../webconfig.js");
Page({
  data: {
    login_user_id:0,
    dataList:{},
    isList:false
  },
  onLoad: function (option) {
    var that = this;
    that.setData({
      login_user_id: option.login_user_id
    })
    wx.request({
      url: webconfig.getCompanyOrderList,
      method: "POST",
      data: {
        uid: that.data.login_user_id

      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
      
        if (res.data.status == 1) {
          that.setData({
            dataList: res.data.dataList,
            isList: true
          })
        } else if(res.data.status == 2){
          that.setData({
            dataList: res.data.dataList,
            isList: false
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
  toCheckDetail: function(e){
    wx.navigateTo({
      url: '../check-detail/check-detail?oid=' + e.currentTarget.id
    })

  }
})