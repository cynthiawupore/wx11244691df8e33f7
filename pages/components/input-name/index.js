Component({
    options: {
        multipleSlots: true
    },

    properties: {
        parentData:Object,
    },

    data: {
        inputValue:null
    },

    methods: {
        toKeTou:function(){
            this.triggerEvent('toKeTouChild',{inputValue:this.data.inputValue})
        },

        bindKeyInput:function (e) {
            this.setData({
                inputValue: e.detail.value
            })
        }
    }
})
