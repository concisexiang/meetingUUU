var domain = 'https://firstlxy.cn/';

var wx_register = domain+"index.php?s=/Api/User/wx_register";
var wx_login = domain+"index.php?s=/Api/User/wx_login";
var wx_apply_complay = domain+'index.php?s=/Api/User/wx_apply_company';
var getUserStatus = domain + 'index.php?s=/Api/User/getUserStatus';
var managerMeetingRoom = domain + 'index.php?s=/Api/Meeting/managerMeetingRoom';
var delMeetingRoom = domain + 'index.php?s=/Api/Meeting/delMeetingRoom';
var getMeetingRoom = domain + 'index.php?s=/Api/Meeting/getMeetingRoom';
var addMeetingRoom = domain + 'index.php?s=/Api/Meeting/addMeetingRoom';
var postOrderMeeting = domain + 'index.php?s=/Api/Order/postOrder';
var getCompanyOrderList = domain + 'index.php?s=/Api/Order/getCompanyOrderList';
var getOrderDetail = domain + 'index.php?s=/Api/Order/getOrderDetail';
var checkOrderStatus = domain + 'index.php?s=/Api/Order/checkOrderStatus';
var getUserOrderList = domain + 'index.php?s=/Api/Order/getUserOrderList'
var joinTeam = domain + 'index.php?s=/Api/User/joinTeam';
var isInCompany = domain + 'index.php?s=/Api/User/isInCompany';
var meetingOrderResult = domain + 'index.php?s=/Api/Order/meetingOrderResult';
var meetingOrderFinish = domain + 'index.php?s=/Api/Order/meetingOrderFinish';
var getCompanyId = domain + 'index.php?s=/Api/User/getCompanyId';
var payFinish = domain + 'index.php?s=/Api/Order/payFinish';
var ringRequestFinishPay = domain + 'index.php?s=/Api/Order/ringRequest';

module.exports = {
  wx_register: wx_register,
  wx_login: wx_login,
  wx_apply_complay: wx_apply_complay,
  getUserStatus: getUserStatus,
  managerMeetingRoom: managerMeetingRoom,
  delMeetingRoom: delMeetingRoom,
  getMeetingRoom: getMeetingRoom,
  addMeetingRoom: addMeetingRoom,
  postOrderMeeting: postOrderMeeting,
  getCompanyOrderList: getCompanyOrderList,
  getOrderDetail: getOrderDetail,
  checkOrderStatus: checkOrderStatus,
  getUserOrderList: getUserOrderList,
  joinTeam: joinTeam,
  isInCompany: isInCompany,
  meetingOrderResult: meetingOrderResult,
  meetingOrderFinish: meetingOrderFinish,
  getCompanyId: getCompanyId,
  payFinish: payFinish,
  ringRequestFinishPay: ringRequestFinishPay
}