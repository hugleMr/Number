
cc.Class({
    extends: cc.Component,

    properties: {
        lbl_item :cc.Label,
        item_button: cc.Node,
    },

    start () {

    },

    init(text){
        console.log(text);
        this.number = text;
        this.lbl_item.string = String(text);
    },

    initCallBack(callback){
        this.callback = callback;
    },

    button(){
        console.log("xxx: ",this.number);
        this.callback(this.number);
    }
});
