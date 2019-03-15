// canvas data
window.onload = function(){

    var canvas = document.getElementById("Canvas");
    var ctx = canvas.getContext("2d");

    var MOUSE_X = canvas.width  / 2;
    var MOUSE_Y = canvas.height / 4 * 3;

    class Cursor{

        constructor(x, y, radius){
            this.x = x;
            this.y = y;
            this.radius = radius;
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

    var cursor = new Cursor(500, canvas.width/2, 3);

    // adding event listeners that get mouse cooridnates
    ctx.canvas.addEventListener('mousemove', function(event){
        MOUSE_X = event.clientX - ctx.canvas.offsetLeft;
        cursor.updatePos();
    });

    //runs the node simulation
    function run() {
        //CLEAR PREVIOUS FRAME
        ctx.clearRect(0,0,canvas.width, canvas.height);

        //UPDATE
        //RENDER
        cursor.draw(ctx);
    }

    setInterval(run, 15);

}
