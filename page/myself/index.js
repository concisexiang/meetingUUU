//js
var app = getApp();
var webconfig = require("../../webconfig.js");
Page({
  data: {
    isLogin:false,
    userInfo:{},
    login_user_id:0,
    user_status: 0,
    status_msg: '',
    showId:false,    
    companyId:0,    no_login:'https://firstlxy.cn/Public/static/spiderWx/image/my_nologin.png',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onShow: function(){
    var that = this;
    
    wx.getStorage({
      key: 'login_user_id',
      success: function (res) {

        that.setData({
          login_user_id: res.data,
          showId:false
        })
      }
    });

  },
  funcShowCompanyId: function(){
    var that = this;

    this.setCompanyId(that, that.data.login_user_id);
    that.setData({
      showId: true
    })
  },
  setCompanyId: function (that, login_user_id) {

    wx.request({
      url: webconfig.getCompanyId, 
      data: { login_user_id: login_user_id },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: "POST",
      success: function (res) {
        if (res.data.status == 1) {
          that.setData({
            companyId: res.data.msg
          });

        }else if(res.data.status == 2){
          that.setData({
            companyId: res.data.msg
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
    });

  },
  onLoad: function () {
    var that = this;
     wx.getStorage({
      key:'login_user_id',
      success:function(res){
      
        that.setData({
          login_user_id:res.data
        })
      }
    });
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
               
            }
          });
        }
      }
    })

  },
  //订单列表
  toOrderList: function(){
    var that = this;
    wx.navigateTo({
      url: '../order-list/order-list?login_user_id=' + this.data.login_user_id
    })
  },
  //审核人员身份
  toCheckOrder: function(){

    var that = this;
    wx.request({
      url: webconfig.getUserStatus,
      method: "POST",
      data: {
        login_user_id: that.data.login_user_id

      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
 
        if (res.data.status == 1) {
          if (res.data.type == 2){
            wx.navigateTo({
              url: '../check-order-list/check-order-list?login_user_id=' + that.data.login_user_id
            })
          }else{
            wx.showModal({
              title: '警告',
              content: '您不是企业用户',
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
      }
    })
  },
  toJoinTeam: function(){
    wx.navigateTo({
      url: '../join-team/join-team?login_user_id=' + this.data.login_user_id
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo);
    var that = this;
        that.setData({
          userInfo:e.detail.userInfo,
          isLogin:true
        })

  },
  getLoginId: function () {
    var that = this;
    console.log(that.data.login_user_id);
  },
  applyCompany: function(){
    wx.navigateTo({
      url: '../apply/apply?login_user_id=' + this.data.login_user_id
    })
  },
  userStatus: function(){
    wx.navigateTo({
      url: '../status/status?login_user_id=' + this.data.login_user_id
    })
  },
  managerMeeting:function(){
    var that = this;
    wx.request({
      url: webconfig.getUserStatus,
      method: "POST",
      data: {
        login_user_id: that.data.login_user_id

      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {

        if (res.data.status == 1) {
          if (res.data.type == 2) {
            wx.navigateTo({
              url: '../manager-meeting-room/manager-meeting-room?login_user_id=' + that.data.login_user_id
            })
          } else {
            wx.showModal({
              title: '警告',
              content: '您不是企业用户',
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
      }
    })

  },
  addMeeting: function () {
    
    wx.navigateTo({
      url: '../add-meeting-room/add-meeting-room?login_user_id=' + this.data.login_user_id
    })
  },
  toLogin:function(){
    wx.setStorage({
      key: 'login_user_id',
      data: '',
      success: function (res) {

        wx.redirectTo({
          url: '../login/login'
        })
      }
    })
 
  }
})