var webconfig = require("../../webconfig.js");
Page({
  data: {
    login_user_id: 0,
    dataList: {},
    isList: false
  },
  onLoad: function (option) {
    var that = this;
    that.setData({
      login_user_id: option.login_user_id
    })
    wx.request({
      url: webconfig.getUserOrderList,
      method: "POST",
      data: {
        uid: that.data.login_user_id

      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data.status == 1) {
          console.log(res.data.dataList);
          that.setData({
            dataList: res.data.dataList,
            isList: true
          })
        } else {
         that.setData({
           isList:false
         })
        }
      }
    })
  },
  //查看是否属于该企业
  fun_isInCompany:function(that,e){
  
    //判断是否是该企业用户
    wx.request({
      url: webconfig.isInCompany,
      method: "POST",
      data: {
        uid: that.data.login_user_id,
        oid: e.currentTarget.dataset.id
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
  
        if (res.data.status == 1) {
   
          wx.navigateTo({
            url: '../use-page/use-page?uid=' + that.data.login_user_id + '&oid=' + e.currentTarget.dataset.id
          })
        } else {
     
          wx.navigateTo({
            url: '../pay-page/pay-page?uid=' + that.data.login_user_id + '&oid=' + e.currentTarget.dataset.id
          })

        }
      }
    })

  },
  toUsePage: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../use-page/use-page?uid=' + that.data.login_user_id + '&oid=' + e.currentTarget.dataset.id
    })

  },
  //未付款状态
  payfun:function(e){
  
    var that = this;
    var isInCompanyResult = this.fun_isInCompany(that, e);
  
  },
  //已付款状态
  toQrCode:function(e){
    var that = this;

    wx.navigateTo({
      url: '../qrcode/qrcode?uid=' + that.data.login_user_id + '&oid=' + e.currentTarget.dataset.id
    })
  }
})