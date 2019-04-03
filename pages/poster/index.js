Page({
    data: {
        name:'',
        counts:0,
        screenHeight: wx.getSystemInfoSync().screenHeight - 160,
        scaleRate: (wx.getSystemInfoSync().screenHeight - 160)/680,
        scaleW: Math.ceil(((wx.getSystemInfoSync().screenHeight - 160)/700) * 375),
        scaleH: Math.ceil(((wx.getSystemInfoSync().screenHeight - 160)/700) * 700),
        canvasBG:'../../assets/bg-poster.png',
        QR:''
    },
    onLoad: function(options) {
        this.setData({
            name:options.name,
            counts:options.counts,
        })
    },
    onShow: function() {
        const ctx = wx.createCanvasContext('poster')
        const ctx_display = wx.createCanvasContext('poster-display')
        ctx_display.scale(this.data.scaleRate,this.data.scaleRate)
        this.drawCanvas(ctx)
        this.drawCanvas(ctx_display)
    },
    onReady: function() {},
    onHide: function() { },
    onUnload: function() { },
    onPullDownRefresh: function() { },
    onReachBottom: function() { },
    onShareAppMessage: function () { },
    onPageScroll: function() { },

    drawCanvas: function(ctx) {
        // 背景图片
        ctx.drawImage(this.data.canvasBG, 0, 0, 375, 700)
        ctx.setFontSize(15)
        ctx.setFillStyle('#333')
        ctx.fillText('我15秒给' + this.data.name + '磕了' + this.data.counts + '个头', 30, 453)

        ctx.draw()
        ctx.save()
    },

    save:function () {
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 375,
            height: 700,
            destWidth: 375 * 750 / wx.getSystemInfoSync().windowWidth,
            destHeight: 700 * 750 / wx.getSystemInfoSync().windowWidth,
            canvasId: 'poster',
            success: function (res) {
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success(res) {
                        wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 2000
                        })
                    },
                    fail(){
                        wx.showToast({
                            title: '保存失败',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })
            },
            fail:function (res) {
                wx.showToast({
                    title: '系统繁忙，请重试',
                    icon: 'success',
                    duration: 2000
                })
            }
        })
    },
})
