// miniprogram/pages/my/record.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationIndex: 0,
    navigationType: 'awarded-lottery',
    navigations: [{
        name: '惊喜记录',
        type: 'awarded-lottery'
      },
      {
        name: '待公布',
        type: 'waiting-lottery'
      },
      {
        name: '所有参与',
        type: 'total-lottery'
      }
    ]
  },

  onNavigationChange(e) {

    let navigationIndex = e.detail.navigationIndex;
    this.setData({
      navigationIndex: navigationIndex,
      navigationType: this.data.navigations[navigationIndex].type
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let externalNavigationIndex = Number(options.navigationIndex);
    if (!isNaN(externalNavigationIndex)) {
      this.setData({
        navigationIndex: externalNavigationIndex,
        navigationType: this.data.navigations[externalNavigationIndex].type
      });
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  onQueryRecords() {

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
  onPullDownRefresh: function () {

    this.selectComponent("#record-" + this.data.navigationType).onPullDownRefresh();

  },

  onReachBottom: function () {

    this.selectComponent("#record-" + this.data.navigationType).onReachBottom();

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