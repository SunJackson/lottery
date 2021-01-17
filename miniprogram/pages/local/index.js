// miniprogram/pages/location/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.form === 'menu'){
      console.log("页内分享")
    }
    return {
      title: app.userInfo.nickName === undefined ? '拼人品的啥时候到了，点进来有惊喜哦！' : app.userInfo.nickName + '@你来领奖了',
      path: '/pages/index/index?parentOpenid=' + app.globalData.openid,
      imageUrl: '../../images/lottery/gift-share.png'
    }
  },
  onShareTimeline: function(res) {
    return {
      title: app.userInfo.nickName === undefined ? '拼人品的啥时候到了，点进来有惊喜哦！' : app.userInfo.nickName + '@你来领奖了',
      query: 'parentOpenid=' + app.globalData.openid,
      imageUrl: '../../images/lottery/gift-share.png'
    }
  }
})