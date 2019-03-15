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

            this.width = this.radius;
            this.height = this.radius;
            this.cx = this.x - this.radius/2;
            this.cy = this.y - this.radius/2;

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
            this.cx = this.x - this.radius/2;
            this.cy = this.y - this.radius/2;
        }


    }

    class GoodStuff{
        constructor(){
            let random = Math.floor((Math.random() * 635) + 15);
            this.x = random;
            this.y = 10;

            this.radius = 15;
            this.width = this.radius;
            this.height = this.radius;
            this.cx = this.x - this.radius/2;
            this.cy = this.y - this.radius/2;

            this.color = "red";
        }

        draw(ctx){
            ctx.beginPath();
            const image = document.getElementById('hi-icon');
            ctx.drawImage(image, this.x-50, this.y,55,55);
            ctx.closePath();
        }

        updatePos(){
            this.y += Math.floor((Math.random() * 3) + 1);
            this.cx = this.x - this.radius/2;
            this.cy = this.y - this.radius/2;
        }
    }
    class Cursor{
        constructor(x){
            this.x = x;
            this.y = MOUSE_Y

            this.radius = 25;
            this.width = this.radius;
            this.height = this.radius;
            this.cx = this.x - this.radius/2;
            this.cy = this.y - this.radius/2;
            this.color = "#F0F0F0";
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
            this.cx = this.x - this.radius/2;
            this.cy = this.y - this.radius/2;
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

        collision(cursor){
            for(let i=0; i<this.currGoodies; i++){
                let goody = this.goodies[i];

                if (cursor.cx <= goody.cx + goody.width &&
                    cursor.cx + cursor.width >= goody.cx &&
                    cursor.cy <= goody.cy + goody.height &&
                    cursor.cy + cursor.height >= goody.cy) {

                    this.goodies.splice(i,1);
                    this.currGoodies--;
                    console.log('hit goody');
                }
            }


            for(let i=0; i<this.currTrash; i++){
                let trash = this.trashs[i];

                if (cursor.cx <= trash.cx + trash.width &&
                    cursor.cx + cursor.width >= trash.cx &&
                    cursor.cy <= trash.cy + trash.height &&
                    cursor.cy + cursor.height >= trash.cy) {

                    this.trashs.splice(i,1);
                    this.currTrash--;
                    console.log('hit trash');
                }
            }
        }
    }

    // Game objects
    var cursor = new Cursor(110);
    var gen = new Generator();

    // adding event listeners that get mouse cooridnates
    ctx.canvas.addEventListener('mousemove', function(event){
        MOUSE_X = event.clientX - 350;
        cursor.updatePos();
    });


    //runs the node simulation
    function run() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        gen.spawnGoodies();
        gen.update();
        gen.collision(cursor)

        gen.draw(ctx);
        cursor.draw(ctx);
    }

    setInterval(run, 1);

}
