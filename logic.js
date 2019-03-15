// canvas data
window.onload = function(){

    var canvas = document.getElementById("Canvas");
    var ctx = canvas.getContext("2d");

    var MOUSE_X = canvas.width  / 2;
    var MOUSE_Y = canvas.height / 5 * 4;

    class Garbage{
        constructor(){
            let random = Math.floor((Math.random() * 635) + 5);
            this.x = random;
            this.y = 10;
            this.radius = 10;

            this.width = this.radius;
            this.height = this.radius;
            this.cx = this.x - this.radius/2;
            this.cy = this.y - this.radius/2;

            this.color = "green";
        }
        draw(ctx){
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }

        updatePos(){
            this.y += 3;
        }
    }

    class GoodStuff{
        constructor(){
            let random = Math.floor((Math.random() * 635) + 5);
            this.x = canvas.width/2;
            this.y = 10;

            this.radius = 10;
            this.width = this.radius;
            this.height = this.radius;
            this.cx = this.x - this.radius/2;
            this.cy = this.y - this.radius/2;

            this.color = "red";
        }
        draw(ctx){
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }

        updatePos(){
            this.y += 3;
        }
    }
    class Cursor{
        constructor(x, y){
            this.x = x;
            this.y = y;

            this.radius = 10;
            this.width = this.radius;
            this.height = this.radius;
            this.cx = this.x - this.radius/2;
            this.cy = this.y - this.radius/2;
            this.color = "#F0F0F0";
        }

        draw(ctx){
            // draw ball representing the lightsource
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
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
            this.debug = 0
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
                if(this.debug < 200){
                    console.log(this.debug);
                    console.log(cursor.cx < goody.cx + goody.width);
                    console.log(cursor.cx + cursor.width > goody.cx);
                    console.log(cursor.cy < goody.cy + goody.height);
                    console.log(cursor.cy + cursor.height > goody.cy);
                    console.log('*****************************************');
                    this.debug++;
                }

                if (cursor.cx < goody.cx + goody.width &&
                    cursor.cx + cursor.width > goody.cx &&
                    cursor.cy < goody.cy + goody.height &&
                    cursor.cy + cursor.height > goody.cy) {

                    console.log('hit');
                }
            }
        }

    }


    // Game objects
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
        gen.collision(cursor)

        gen.draw(ctx);
        cursor.draw(ctx);
    }

    setInterval(run, 10);

}
