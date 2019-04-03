Page({
    data: {
        counts:0,
        name:'',
        countDownNum:15,
        btnDisabled:false,
        isNeedName:true,
    },
    onLoad: function(options) {},
    onShow: function() {},
    onReady: function() {},
    onHide: function() { },
    onUnload: function() { },
    onPullDownRefresh: function() { },
    onReachBottom: function() { },
    onShareAppMessage: function () { },
    onPageScroll: function() { },

    counter:function () {
        this.setData({
            counts:this.data.counts+1,
        })
    },

    countDown: function () {
        let that = this;
        let countDownNum = that.data.countDownNum;
        that.setData({
            timer: setInterval(()=>{
                countDownNum--;
                that.setData({
                    countDownNum: countDownNum
                })
                if (countDownNum === 0) {
                    clearInterval(that.data.timer);
                    this.setData({
                        btnDisabled:true
                    })
                    wx.showModal({
                        title: '15秒时间到',
                        content: '你总共给' + this.data.name + '磕了' + this.data.counts + '头。。。' + '去生成海报？',
                        success:(res) => {
                            if (res.confirm) {
                                wx.redirectTo({
                                    url: '/pages/poster/index?name=' + this.data.name + '&counts=' + this.data.counts
                                })
                            } else if (res.cancel) {}
                        }
                    })
                }
            },1000)
        })
    },

    toKeTou: function (e) {
        this.setData({
            isNeedName: false,
            name:e.detail.inputValue
        })
        this.countDown()
    }
})
