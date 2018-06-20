var app = getApp();
var webconfig = require("../../webconfig.js");
Page({
  data: {
    key: '状态',
    login_user_id:0,
    user_status:0,
    status_msg:'',
    data: '',
    dialog: {
      title: '',
      content: '',
      hidden: true
    }
  },
  onLoad:function(option){
    var that = this;
    that.setData({
      login_user_id: option.login_user_id
    })
    //判断用户类型
    wx.request({
      url: webconfig.getUserStatus,
      method: "POST",
      data: {
        login_user_id: this.data.login_user_id

      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data.status == 1) {
         that.setData({
           user_status: res.data.type,
           status_msg: res.data.msg
         });
         
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
  keyChange: function (e) {
    this.data.key = e.detail.value
  },
  dataChange: function (e) {
    this.data.data = e.detail.value
  },
  getStorage: function () {
    var key = this.data.key
    var data = this.data.data
    if (key.length === 0) {
      this.setData({
        key: key,
        data: data,
        'dialog.hidden': false,
        'dialog.title': '读取数据失败',
        'dialog.content': 'key 不能为空'
      })
    } else {
      storageData = wx.getStorageSync(key)
      this.setData({
        key: key,
        data: data,
        'dialog.hidden': false,
        'dialog.title': '读取数据成功',
        'dialog.content': "data: '" + storageData + "'"
      })
    }
  },
  setStorage: function () {
    var key = this.data.key
    var data = this.data.data
    if (key.length === 0) {
      this.setData({
        key: key,
        data: data,
        'dialog.hidden': false,
        'dialog.title': '保存数据失败',
        'dialog.content': 'key 不能为空'
      })
    } else {
      wx.setStorageSync(key, data)
      this.setData({
        key: key,
        data: data,
        'dialog.hidden': false,
        'dialog.title': '存储数据成功'
      })
    }
  },
  clearStorage: function () {
    wx.clearStorageSync()
    this.setData({
      key: '',
      data: '',
      'dialog.hidden': false,
      'dialog.title': '清除数据成功',
      'dialog.content': ''
    })
  },
  confirm: function () {
    this.setData({
      'dialog.hidden': true,
      'dialog.title': '',
      'dialog.content': ''
    })
  }
})
