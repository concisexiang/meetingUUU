
//获取应用实例
var app = getApp();
var webconfig = require("../../webconfig.js");
Page({
  data: {
    isList:false,
    dataList:{},
    showId:false,
    login_user_id:0,
    tb:"",
    user_status:0,
    status_msg:'',
    banner3_title: "",
    banner3_img:"",
    banner3_desc_bg:"",
   
    imgUrls: [
'https://firstlxy.cn/public/static/mettings/image/slider_img1.jpg',
'https://firstlxy.cn/public/static/mettings/image/slider_img4.jpg', 
'https://firstlxy.cn/public/static/mettings/image/slider_img3.jpg',

      
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    
    menu:{
      imgUrls:[

        'http://gw.alicdn.com/tps/TB1RN0HMFXXXXXNXpXXXXXXXXXX-183-129.png?imgtag=avatar',
  
        'http://gw.alicdn.com/tps/i1/TB1c1FMIpXXXXawXpXXN4ls0XXX-183-129.png?imgtag=avatar'
      ],
      descs:[
          '排名查询',
          '排名词导出'
      ]
    }

  },
  //事件处理函数
  showloading:function(){
  },
  bindViewTap: function() {
  },
  onShow:function(){

   wx.setNavigationBarTitle({
     title: '首页'
   })
   var that = this;
   wx.getStorage({
     key: 'login_user_id',
     success: function (res) {
     
       that.setData({
         showId:false,
         login_user_id: res.data,
       })
     }
   })

   //主页获取列表数据
   wx.request({
     url: webconfig.getMeetingRoom,
     method: "POST",

     header: { 'content-type': 'application/x-www-form-urlencoded' },
     success: function (res) {
       if (res.data.status == 1) {
         that.setData({
           dataList: res.data.dataList,
           isList: true
         });

       } else {
         that.setData({
           isList: false
         })
       }
     }
   });

  },
  setUserId: function (that,login_user_id){

    wx.request({
      url: webconfig.getUserStatus, //仅为示例，并非真实的接口地址
      data: { login_user_id: login_user_id },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: "POST",
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
    });

  },
  funcShowId:function(){
    var that = this;
    this.setUserId(that,that.data.login_user_id);
    that.setData({
      showId:true
    })
  },
  // 下拉刷新  
  onPullDownRefresh: function () {
    this.onLoad();
  },  
  onLoad: function () {

   
  },
  toPostOrder:function(e){
    if(e.currentTarget.dataset.status == 0){
      wx.navigateTo({
        url: '../post-order/post-order?mid=' + e.currentTarget.id
      })
    }else{
      wx.showModal({
        title: '错误',
        content: '该会议室暂时不能预定',
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