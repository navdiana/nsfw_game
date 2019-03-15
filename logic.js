// canvas data
window.onload = function(){

    var canvas = document.getElementById("Canvas");
    var ctx = canvas.getContext("2d");

    var MOUSE_X = canvas.width  / 2;
    var MOUSE_Y = canvas.height / 5 * 3.7;

    class Garbage{
        constructor(){
            let random = Math.floor((Math.random() * 635) + 15);
            this.x = random;
            this.y = 10;
            this.radius = 15;
            this.color = "green";
        }
        draw(ctx){
            ctx.beginPath();
            const image = document.getElementById('nsfw-icon');
            ctx.drawImage(image, this.x-50, this.y,55,55);
            ctx.closePath();
        }
        
        updatePos(){
            this.y += Math.floor((Math.random() * 3) + 1);
        }


    }

    class GoodStuff{
        constructor(){
            let random = Math.floor((Math.random() * 635) + 15);
            this.x = random;
            this.y = 10;
        }

        draw(ctx){
            ctx.beginPath();
            const image = document.getElementById('hi-icon');
            ctx.drawImage(image, this.x-50, this.y,55,55);
            ctx.closePath();
        }

        updatePos(){
            this.y += Math.floor((Math.random() * 3) + 1);
        }
    }
    class Cursor{
        constructor(x, y){
            this.x = x;
            this.y = y;
        }

        draw(ctx){
            const image = document.getElementById('tumblr-icon');
            ctx.drawImage(image, this.x, this.y, 50, 50);
            ctx.beginPath();
            ctx.closePath();
        }

        updatePos(){
            this.x = MOUSE_X;
            this.y = MOUSE_Y;
        }
    }

    class Generator{
        constructor(){
            this.maxGoodies = 6;
            this.maxTrash = 3;
            this.currGoodies = 0;
            this.currTrash = 0;
            this.goodies = [];
            this.trashs = [];
        }
        spawnGoodies(){
            if(this.currGoodies<this.maxGoodies){
                var goody = new GoodStuff();
                this.goodies.push(goody);
                this.currGoodies++;
            }
            if(this.currTrash<this.maxTrash){
                var trash = new Garbage();
                this.trashs.push(trash);
                this.currTrash++;
            }
        }
        draw(ctx){
            for(let i = 0; i<this.currGoodies;i++){
                this.goodies[i].draw(ctx);
            }
            for(let i = 0; i<this.currTrash;i++){
                this.trashs[i].draw(ctx);
            }
        }
        update(){
            for(let i = 0; i<this.currTrash;i++){
                this.trashs[i].updatePos();
                if(this.trashs[i].y > 640){
                    this.trashs.splice(i,1);
                    this.currTrash -= 1;
                }
            }
            for(let i = 0; i<this.currGoodies;i++){
                this.goodies[i].updatePos();
                if(this.goodies[i].y > 640){
                    this.goodies.splice(i,1);
                    this.currGoodies -= 1;
                }
            }
        }

    }

    var cursor = new Cursor(500, canvas.width/2);
    var gen = new Generator();
    // adding event listeners that get mouse cooridnates
    ctx.canvas.addEventListener('mousemove', function(event){
        MOUSE_X = event.clientX - ctx.canvas.offsetLeft;
        cursor.updatePos();
    });

    //runs the node simulation
    function run() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        gen.spawnGoodies();
        gen.update();
        cursor.draw(ctx);

        gen.draw(ctx);

    }

    setInterval(run, 1);

}
