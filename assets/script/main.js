

cc.Class({
    extends: cc.Component,

    properties: {
        lbl_time: cc.Label,
        lbl_number: cc.Label,
        board1: cc.Node,
        board2: cc.Node,
        itemPrefab1: cc.Prefab,
        itemPrefab2: cc.Prefab,
        lbl_point1: cc.Label,
        lbl_point2: cc.Label,
        start_board: cc.Node,
        start_button: cc.Node,
        lbl_current1: cc.Label,
        lbl_current2: cc.Label,
        start_time : 300,
        time : 0,
        point1: 0,
        point2: 0,
        number: 0,
    },

    

    start () {
        cc.debug.setDisplayStats(false);
        this.start_button.active = true;
        this.isCount = true;
        this.init();
        
    },


    init(){

        var mang = [];
        for (var i=0; i<100; i++){
            mang[i]=true;
        }


        for (var i=0; i<100; i++){
            var x = i%10;
            var y = parseInt(i/10);

            var item1 = cc.instantiate(this.itemPrefab1);
            item1.height = this.board1.height/10;
            item1.width = this.board1.width/10;
            item1.x = x*item1.height - 4.5*item1.height;
            item1.y = y*item1.width - 4.5*item1.width;

            var item2 = cc.instantiate(this.itemPrefab2);
            item2.height = this.board2.height/10;
            item2.width = this.board2.width/10;
            item2.x = x*item2.height - 4.5*item2.height;
            item2.y = y*item2.width - 4.5*item2.width; 

            const script_item1 = item1.getComponent("item1");
            const script_item2 = item2.getComponent("item2");
            
            while(true){
                var stt = Math.floor(Math.random()*100);
                if (mang[stt]==true){
                    script_item1.init(stt);
                    script_item2.init(stt);
                    mang[stt]=false;
                    break;
                }
            }

            var self=this;
            script_item1.initCallBack(function(index){
                if (index == self.point1 + self.point2){
                    script_item1.node.getChildByName("button").color = new cc.Color(0,0,0);
                    script_item2.node.getChildByName("button").color = new cc.Color(0,0,0);
                    self.addgame1();
                }
            });
            
            script_item2.initCallBack(function(index){
                if (index == self.point1 + self.point2){
                    script_item1.node.getChildByName("button").color = new cc.Color(0,0,0);
                    script_item2.node.getChildByName("button").color = new cc.Color(0,0,0);
                    self.addgame2();
                }
            }); 
            
            this.board1.addChild(item1);
            this.board2.addChild(item2);
        }
        
    
        
    },

    addgame1(){
        this.point1 +=1;
        this.lbl_point1.string = String(this.point1);
        this.number +=1;
        this.lbl_number.string = String(this.number);
        if (this.number == 100){
            this.resetgame();
        }
    },

    addgame2(){
        this.point2 +=1;
        this.lbl_point2.string = String(this.point2);
        this.number +=1;
        this.lbl_number.string = String(this.number);
        if (this.number == 100){
            this.resetgame();
        }
    },

    update(dt){
       
        if (!this.isCount){
            this.time += dt;
            if (this.time >= 1){
                this.start_time -=1;
                this.time = 0;
            }
            if (this.start_time < 0){
                this.resetgame();
            }
        }
        this.lbl_time.string = String(this.start_time);
    },

    startbutton(){
        this.start_button.active = false;
        this.start_board.active = false;
        this.isCount = false;
 
    },
    
    resetgame(){
        this.start_time = 300;
        this.board1.removeAllChildren();
        this.board2.removeAllChildren();
        this.start_button.active = true;
        this.start_board.active = true;
        this.isCount = true;       
        this.lbl_point1.string = "0";
        this.lbl_point2.string = "0";
        this.lbl_number.string = "0"
        this.init();
        this.lbl_current1.string = String(this.point1);
        this.lbl_current2.string = String(this.point2);
        this.point1 = 0;
        this.point2 = 0;
        this.number = 0;
     
    },


});
