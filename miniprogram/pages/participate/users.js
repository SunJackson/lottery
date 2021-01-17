// miniprogram/pages/participate/users.js

import {
  queryParticipatedUsers
} from '../../api/lottery.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lotteryId: '',
    currentPage: 1,
    pageSize: 10,
    totalPage: 1,
    total: undefined,
    noData: false,
    noMoreData: false,
    querying: true,
    avatars: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.showNavigationBarLoading();
    this.data.lotteryId = options.lotteryId;
    queryParticipatedUsers(this.data.currentPage, this.data.pageSize, this.data.lotteryId).then(res => {
      wx.hideNavigationBarLoading();
      console.log("[onLoad]", res);
      if (res.result.errMsg === 'query-participated-users-page:none') {
        this.setData({
          querying: false,
          noData: true,
          noMoreData: true,
          total: res.result.data.total,
          currentPage: res.result.data.currentPage,
          totalPage: res.result.data.totalPage,
          avatars: []
        });
        return;
      }
      this.setData({
        querying: false,
        noData: false,
        total: res.result.data.total,
        currentPage: res.result.data.currentPage,
        totalPage: res.result.data.totalPage,
        noMoreData: res.result.data.totalPage <= res.result.data.currentPage,
        avatars: res.result.data.avatars
      });

    });

  },

  onTapQueryMoreUsers() {

    if (this.data.noMoreData) return;
    if (this.data.querying) return;
    if (this.data.currentPage >= this.data.totalPage) {
      return;
    }
    this.setData({
      querying: true
    });
    this.data.currentPage++;
    wx.showNavigationBarLoading();
    queryParticipatedUsers(this.data.currentPage, this.data.pageSize, this.data.lotteryId).then(res => {
      wx.hideNavigationBarLoading();
      console.log("[onTapQueryMoreUsers]", res);
      if (res.result.errMsg === 'query-participated-users-page:none') {

        this.setData({
          querying: false,
          noData: true,
          noMoreData: true,
          total: res.result.data.total,
          currentPage: res.result.data.currentPage,
          totalPage: res.result.data.totalPage,
          avatars: []
        });
        return;
      }

      if (res.result.errMsg === 'query-participated-users-page:empty') {
        this.setData({
          querying: false,
          total: res.result.data.total,
          currentPage: res.result.data.currentPage,
          totalPage: res.result.data.totalPage,
          noMoreData: true
        });
        return;
      }
      this.setData({
        querying: false,
        noData: false,
        total: res.result.data.total,
        currentPage: res.result.data.currentPage,
        totalPage: res.result.data.totalPage,
        noMoreData: res.result.data.totalPage <= res.result.data.currentPage,
        avatars: this.data.avatars.concat(res.result.data.avatars)
      });

    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

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