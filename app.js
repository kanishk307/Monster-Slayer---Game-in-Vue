new Vue({
   el: '#app',
    data: {
    playerHealth: 100,  
    monsterHealth: 100,
    gameIsRunning: false,
    count: 2,
    healCount:1,
    turns: []
//    lowLifeColor: "red"
},
    methods: {
        startGame : function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.count =2;
            this.healCount=1;
            $('#low-healthbar').css({
                   'background-color': 'green'
               });
            $('#low-healthbar1').css({
                   'background-color': 'green'
               });
            document.querySelector("#heal").style.display='unset';
            document.querySelector("#special-attack").style.display='unset';
            this.turns.length=0;
            this.count =2;
            this.healCount=1;
        },
        
        attack: function(){
            
            var damage= this.calculateDamage(3,10);
            console.log("monster - "+damage);
           this.monsterHealth -= damage;
//            this.checkWin();
            this.turns.unshift({
               isPlayer: true,
                text: "Monster(-" + damage + ")."
            });
            
            //For monster, now since it is a fucking monster, 
            //we will give him an edge and let him do more fucking damage
            // to humans cause anyway they are stupid.
            
              var damage= this.calculateDamage(5,12);
              console.log("player -"+damage);
              this.playerHealth -= damage;
              this.turns.unshift({
               isPlayer: false,
                text: "Player(-" + damage + ")."
            });
            this.changeColor(this.playerHealth,this.monsterHealth);
            
              this.checkWin();
               
        },
        specialAttack: function() {
        
        {
            this.count--;
            console.log(this.count);
            var damage= this.calculateDamage(10,20);
            console.log("monster - "+damage);
           this.monsterHealth -= damage;
            this.turns.unshift({
               isPlayer: true,
                text: "Monster(-" + damage + ")."
            });
            
            
            var damage= this.calculateDamage(5,12);
              console.log("player -"+damage);
              this.playerHealth -= damage;
             this.turns.unshift({
               isPlayer: false,
                text: "Player(-" + damage + ")."
            });
            
          this.changeColor(this.playerHealth,this.monsterHealth);
            
              this.checkWin();
            
            if(this.count===0){
                document.querySelector("#special-attack").style.display='none';
            }
        }
            
          
            
        },
        
        heal: function(){
            var healCount=2;
            this.healCount--;
//             var damage= this.calculateDamage(5,12);
//              console.log("player -"+damage);
//              this.playerHealth -= damage;
            if(this.playerHealth <=90) {
                this.playerHealth += 10;
                this.turns.unshift({
               isPlayer: true,
                text: "Player(+10)."
            });
//                 $(document).ready(function(){
// 
//              $('#activity-log').css({
//                   'background-color': 'green'
//               });
//          })
            }
            
            else if(this.playerHealth>90) {
                this.turns.unshift({
               isPlayer: true,
                text: "Player(+" + (100-(this.playerHealth)) + ")."
            });
//                $(document).ready(function(){
// 
//              $('#activity-log').css({
//                   'background-color': 'green'
//               });
//          })
                 this.playerHealth =100;
            }
            
             this.changeColor(this.playerHealth,this.monsterHealth);
            this.checkWin();            
            if(this.healCount===0){
                document.querySelector("#heal").style.display='none';
            }
                
        },
        
        giveUp: function(){
            this.gameIsRunning=false;
             this.turns.length=0;
        },
        
        calculateDamage: function(min,max) {
             return (Math.max(Math.floor((Math.random()*max)+1),min));
        },
        
        checkWin: function(){
            
            if(this.monsterHealth<=0){
                this.monsterHealth=0;
               if(confirm("Congratulations. You won. Click OK button to start a new game")){
                   this.startGame();
               }
                else {
                     this.gameIsRunning= false;
                }
               
                return true;  //Coz I don't want to go ahead
            }
                
             if(this.playerHealth<=0){
                this.playerHealth=0;
                if(confirm("Hard Luck, mate. You can always try again. Click OK for a new game.")){
                    this.startGame();
                }
                 else {
                      this.gameIsRunning= false;
                 }
//                this.gameIsRunning= false;
                //return;  coz no code after this
                return true;
                }
            return false;
            },
        
        changeColor: function(playerHealth, monsterHealth) {
        if(playerHealth<20){
          $(document).ready(function(){
 
               $('#low-healthbar1').css({
                   'background-color': 'red'
               });

          })
            
        }
            if(playerHealth>=20){
          $(document).ready(function(){
 
               $('#low-healthbar1').css({
                   'background-color': 'green'
               });

          })
            
        }
            
        if(monsterHealth <20){
          $(document).ready(function(){
 
              $('#low-healthbar').css({
                   'background-color': 'red'
               });
          })
            
        }
            
         if(monsterHealth>=20){
          $(document).ready(function(){
 
              $('#low-healthbar').css({
                   'background-color': 'green'
               });
          })
            
        }    
            }
            
        }
});