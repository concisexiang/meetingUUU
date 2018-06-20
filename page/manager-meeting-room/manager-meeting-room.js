var app;
var webconfig = require("../../webconfig.js");
Page({
  data: {
    login_user_id: 0,
    meetingList:{},
    listLength:0
  },
  onShow: function(){

  },
  onLoad: function (option) {
    var that = this;
    console.log(option.login_user_id);
    that.setData({
      login_user_id: option.login_user_id
    })
    console.log(this.data.login_user_id);
    wx.request({
      url: webconfig.managerMeetingRoom,
      method: "POST",
      data: {
        uid: this.data.login_user_id

      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data.status == 1) {
          that.setData({
            meetingList: res.data.msg,
            listLength: res.data.length
          });

        } else {
          wx.showModal({
            title: '错误',
            content: res.data.msg,
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../myself/index',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    });

  },
  delMeeting: function(e){
    var that = this;
    wx.request({
      url: webconfig.delMeetingRoom,
      method: "POST",
      data: {
        mid: e.currentTarget.dataset.id

      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data.status == 1) {
          wx.showModal({
            title: '成功',
            content: res.data.msg,
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../manager-meeting-room/manager-meeting-room?login_user_id=' + that.data.login_user_id
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })

        } else {
          wx.showModal({
            title: '错误',
            content:'请稍候...',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../myself/index',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    });
  }


})