
    // based on http://www.tricedesigns.com/2012/01/04/sketching-with-html5-canvas-and-brush-images/
function fur() {
    var img = new Image();
    img.src = 'http://www.tricedesigns.com/wp-content/uploads/2012/01/brush2.png';
    img.width = 10;

    function distanceBetween(point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
    function angleBetween(point1, point2) {
        return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var el = document.getElementById('myCanvas');
    var ctx = el.getContext('2d');
    ctx.lineJoin = ctx.lineCap = 'round';

    var isDrawing, lastPoint;

    el.onmousedown = function (e) {
        isDrawing = true;
        lastPoint = { x: e.clientX, y: e.clientY };
    };

    el.onmousemove = function (e) {
        if (!isDrawing) return;

        var currentPoint = { x: e.clientX, y: e.clientY };
        var dist = distanceBetween(lastPoint, currentPoint);
        var angle = angleBetween(lastPoint, currentPoint);

        for (var i = 0; i < dist; i++) {
            x = lastPoint.x + (Math.sin(angle) * i);
            y = lastPoint.y + (Math.cos(angle) * i);
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(0.5, 0.5);
            ctx.rotate(Math.PI * 180 / getRandomInt(0, 180));
            ctx.drawImage(img, 0, 0);
            ctx.restore();
        }

        lastPoint = currentPoint;
    };

    el.onmouseup = function () {
        isDrawing = false;
    };
}

/*  function for spray starts here */
function spray() {
    var el = document.getElementById('myCanvas');
    var ctx = el.getContext('2d');
    var isDrawing;
    var density = 50;

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    el.onmousedown = function (e) {
        isDrawing = true;
        ctx.lineWidth = 10;
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.moveTo(e.clientX, e.clientY);
    };
    el.onmousemove = function (e) {
        if (isDrawing) {
            for (var i = density; i--;) {
                var radius = 20;
                var offsetX = getRandomInt(-radius, radius);
                var offsetY = getRandomInt(-radius, radius);
                ctx.fillRect(e.clientX + offsetX, e.clientY + offsetY, 1, 1);
            }
        }
    };
    el.onmouseup = function () {
        isDrawing = false;
    };
}

/*  function for spray ends here */
/*  Bezier() */

function Bezier() {

    function midPointBtw(p1, p2) {
        return {
            x: p1.x + (p2.x - p1.x) / 2,
            y: p1.y + (p2.y - p1.y) / 2
        };
    }

    var el = document.getElementById('myCanvas');
    var ctx = el.getContext('2d');

    ctx.lineWidth = 10;
    ctx.lineJoin = ctx.lineCap = 'round';

    var isDrawing, points = [];

    el.onmousedown = function (e) {
        isDrawing = true;
        points.push({ x: e.clientX, y: e.clientY });
    };

    el.onmousemove = function (e) {
        if (!isDrawing) return;

        points.push({ x: e.clientX, y: e.clientY });

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        var p1 = points[0];
        var p2 = points[1];

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        console.log(points);

        for (var i = 1, len = points.length; i < len; i++) {
            // we pick the point between pi+1 & pi+2 as the
            // end point and p1 as our control point
            var midPoint = midPointBtw(p1, p2);
            ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
            p1 = points[i];
            p2 = points[i + 1];
        }
        // Draw last line as a straight line while
        // we wait for the next point to be able to calculate
        // the bezier control point
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
    };

    el.onmouseup = function () {
        isDrawing = false;
        points.length = 0;
    };

}

/* */
function Brush() {

    var img = new Image();
    img.src = 'http://www.tricedesigns.com/wp-content/uploads/2012/01/brush2.png';
    function distanceBetween(point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
    function angleBetween(point1, point2) {
        return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }

    var el = document.getElementById('myCanvas');
    var ctx = el.getContext('2d');
    ctx.lineJoin = ctx.lineCap = 'round';

    var isDrawing, lastPoint;

    el.onmousedown = function (e) {
        isDrawing = true;
        lastPoint = { x: e.clientX, y: e.clientY };
    };

    el.onmousemove = function (e) {
        if (!isDrawing) return;

        var currentPoint = { x: e.clientX, y: e.clientY };
        var dist = distanceBetween(lastPoint, currentPoint);
        var angle = angleBetween(lastPoint, currentPoint);

        for (var i = 0; i < dist; i++) {
            x = lastPoint.x + (Math.sin(angle) * i) - 25;
            y = lastPoint.y + (Math.cos(angle) * i) - 25;
            ctx.drawImage(img, x, y);
        }

        lastPoint = currentPoint;
    };

    el.onmouseup = function () {
        isDrawing = false;
    };


}

/**/

function Gradient() {

    var el = document.getElementById('myCanvas');
    var ctx = el.getContext('2d');
    var isDrawing;

    el.onmousedown = function (e) {
        isDrawing = true;
        ctx.moveTo(e.clientX, e.clientY);
    };
    el.onmousemove = function (e) {
        if (isDrawing) {
            var radgrad = ctx.createRadialGradient(
                e.clientX, e.clientY, 10, e.clientX, e.clientY, 20);

            radgrad.addColorStop(0, '#000');
            radgrad.addColorStop(0.5, 'rgba(0,0,0,0.5)');
            radgrad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = radgrad;

            ctx.fillRect(e.clientX - 20, e.clientY - 20, 40, 40);
        }
    };
    el.onmouseup = function () {
        isDrawing = false;
    };

}

function NeighbourPoint() {
    var el = document.getElementById('myCanvas');
    var ctx = el.getContext('2d');

    ctx.lineWidth = 1;
    ctx.lineJoin = ctx.lineCap = 'round';

    var isDrawing, points = [];

    el.onmousedown = function (e) {
        points = [];
        isDrawing = true;
        points.push({ x: e.clientX, y: e.clientY });
    };

    el.onmousemove = function (e) {
        if (!isDrawing) return;

        //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        points.push({ x: e.clientX, y: e.clientY });

        ctx.beginPath();
        ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.stroke();

        for (var i = 0, len = points.length; i < len; i++) {
            dx = points[i].x - points[points.length - 1].x;
            dy = points[i].y - points[points.length - 1].y;
            d = dx * dx + dy * dy;

            if (d < 2000 && Math.random() > d / 2000) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(0,0,0,0.3)';
                ctx.moveTo(points[points.length - 1].x + (dx * 0.5), points[points.length - 1].y + (dy * 0.5));
                ctx.lineTo(points[points.length - 1].x - (dx * 0.5), points[points.length - 1].y - (dy * 0.5));
                ctx.stroke();
            }
        }
    };

    el.onmouseup = function () {
        isDrawing = false;
        points.length = 0;
    };

}

function PointBasedShadow() {
    var el = document.getElementById('myCanvas');
    var ctx = el.getContext('2d');

    ctx.lineWidth = 10;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgb(0, 0, 0)';

    var isDrawing, points = [];

    el.onmousedown = function (e) {
        isDrawing = true;
        points.push({ x: e.clientX, y: e.clientY });
    };

    el.onmousemove = function (e) {
        if (!isDrawing) return;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        points.push({ x: e.clientX, y: e.clientY });

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
    };

    el.onmouseup = function () {
        isDrawing = false;
        points.length = 0;
    };

}

function Pencil() {
    var el = document.getElementById('myCanvas');
    var ctx = el.getContext('2d');
    var isDrawing;

    el.onmousedown = function (e) {
        isDrawing = true;
        ctx.moveTo(e.clientX, e.clientY);
    };
    el.onmousemove = function (e) {
        if (isDrawing) {
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
        }
    };
    el.onmouseup = function () {
        isDrawing = false;
    };

}

function Pixeled() {
    function drawPixels(x, y) {
        for (var i = -10; i < 10; i += 4) {
            for (var j = -10; j < 10; j += 4) {
                if (Math.random() > 0.5) {
                    ctx.fillStyle = ['black', 'grey', 'white'][getRandomInt(0, 6)];
                    ctx.fillRect(x + i, y + j, 4, 4);
                }
            }
        }
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var el = document.getElementById('myCanvas');
    var ctx = el.getContext('2d');

    ctx.lineJoin = ctx.lineCap = 'round';
    var isDrawing, lastPoint;

    el.onmousedown = function (e) {
        isDrawing = true;
        lastPoint = { x: e.clientX, y: e.clientY };
    };
    el.onmousemove = function (e) {
        if (!isDrawing) return;

        drawPixels(e.clientX, e.clientY);

        lastPoint = { x: e.clientX, y: e.clientY };
    };
    el.onmouseup = function () {
        isDrawing = false;
    };

}

function PointBasedApproach() {
    var el = document.getElementById('myCanvas');
    var ctx = el.getContext('2d');

    ctx.lineWidth = 10;
    ctx.lineJoin = ctx.lineCap = 'round';

    var isDrawing, points = [];

    el.onmousedown = function (e) {
        isDrawing = true;
        points.push({ x: e.clientX, y: e.clientY });
    };

    el.onmousemove = function (e) {
        if (!isDrawing) return;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        points.push({ x: e.clientX, y: e.clientY });

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
    };

    el.onmouseup = function () {
        isDrawing = false;
        points.length = 0;
    };

}

function RandomDots() {
    var el = document.getElementById('myCanvas');
    var ctx = el.getContext('2d');
    var clientX, clientY, timeout;
    var density = 40;

    function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    el.onmousedown = function (e) {
        ctx.lineJoin = ctx.lineCap = 'round';
        clientX = e.clientX;
        clientY = e.clientY;

        timeout = setTimeout(function draw() {
            for (var i = density; i--;) {
                var angle = getRandomFloat(0, Math.PI * 2);
                var radius = getRandomFloat(0, 30);
                ctx.globalAlpha = Math.random();
                ctx.fillRect(
                    clientX + radius * Math.cos(angle),
                    clientY + radius * Math.sin(angle),
                    getRandomFloat(1, 2), getRandomFloat(1, 2));
            }
            if (!timeout) return;
            timeout = setTimeout(draw, 50);
        }, 50);
    };
    el.onmousemove = function (e) {
        clientX = e.clientX;
        clientY = e.clientY;
    };
    el.onmouseup = function () {
        clearTimeout(timeout);
    };

}

function ShadowBlur() {
    var el = document.getElementById('myCanvas');
    var ctx = el.getContext('2d');
    ctx.shadowBlur = 20;
    ctx.shadowColor = "black";
    var isDrawing;

    el.onmousedown = function (e) {
        isDrawing = true;
        ctx.moveTo(e.clientX, e.clientY);
    };
    el.onmousemove = function (e) {
        if (isDrawing) {
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
        }
    };
    el.onmouseup = function () {
        isDrawing = false;
    };

}

function Sliced() {
    var el = document.getElementById('myCanvas');
    var ctx = el.getContext('2d');

    ctx.lineWidth = 3;
    ctx.lineJoin = ctx.lineCap = 'round';

    var isDrawing, lastPoint;

    el.onmousedown = function (e) {
        isDrawing = true;
        lastPoint = { x: e.clientX, y: e.clientY };
    };

    el.onmousemove = function (e) {
        if (!isDrawing) return;

        ctx.beginPath();

        ctx.globalAlpha = 1;
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        ctx.moveTo(lastPoint.x - 4, lastPoint.y - 4);
        ctx.lineTo(e.clientX - 4, e.clientY - 4);
        ctx.stroke();

        ctx.moveTo(lastPoint.x - 2, lastPoint.y - 2);
        ctx.lineTo(e.clientX - 2, e.clientY - 2);
        ctx.stroke();

        ctx.moveTo(lastPoint.x + 2, lastPoint.y + 2);
        ctx.lineTo(e.clientX + 2, e.clientY + 2);
        ctx.stroke();

        ctx.moveTo(lastPoint.x + 4, lastPoint.y + 4);
        ctx.lineTo(e.clientX + 4, e.clientY + 4);
        ctx.stroke();

        lastPoint = { x: e.clientX, y: e.clientY };
    };

    el.onmouseup = function () {
        isDrawing = false;
    };

}

function SlicedOpacity() {
    var el = document.getElementById('myCanvas');
    var ctx = el.getContext('2d');

    ctx.lineWidth = 3;
    ctx.lineJoin = ctx.lineCap = 'round';

    var isDrawing, lastPoint;

    el.onmousedown = function (e) {
        isDrawing = true;
        lastPoint = { x: e.clientX, y: e.clientY };
    };

    el.onmousemove = function (e) {
        if (!isDrawing) return;

        ctx.beginPath();

        ctx.globalAlpha = 1;
        ctx.moveTo(lastPoint.x - 4, lastPoint.y - 4);
        ctx.lineTo(e.clientX - 4, e.clientY - 4);
        ctx.stroke();

        ctx.globalAlpha = 0.6;
        ctx.moveTo(lastPoint.x - 2, lastPoint.y - 2);
        ctx.lineTo(e.clientX - 2, e.clientY - 2);
        ctx.stroke();

        ctx.globalAlpha = 0.4;
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        ctx.globalAlpha = 0.3;
        ctx.moveTo(lastPoint.x + 2, lastPoint.y + 2);
        ctx.lineTo(e.clientX + 2, e.clientY + 2);
        ctx.stroke();

        ctx.globalAlpha = 0.2;
        ctx.moveTo(lastPoint.x + 4, lastPoint.y + 4);
        ctx.lineTo(e.clientX + 4, e.clientY + 4);
        ctx.stroke();

        lastPoint = { x: e.clientX, y: e.clientY };
    };

    el.onmouseup = function () {
        isDrawing = false;
    };

}

function smooth() {
    var el = document.getElementById('myCanvas');
    var ctx = el.getContext('2d');
    ctx.lineWidth = 20;
    ctx.lineJoin = ctx.lineCap = 'round';
    var isDrawing;

    el.onmousedown = function (e) {
        isDrawing = true;
        ctx.moveTo(e.clientX, e.clientY);
    };
    el.onmousemove = function (e) {
        if (isDrawing) {
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
        }
    };
    el.onmouseup = function () {
        isDrawing = false;
    };

}

function thickBrush() {
    var el = document.getElementById('myCanvas');
    var ctx = el.getContext('2d');

    ctx.lineWidth = 10;
    ctx.lineJoin = ctx.lineCap = 'butt';

    var isDrawing, lastPoint;

    el.onmousedown = function (e) {
        isDrawing = true;
        lastPoint = { x: e.clientX, y: e.clientY };
    };

    el.onmousemove = function (e) {
        if (!isDrawing) return;

        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        ctx.moveTo(lastPoint.x - 5, lastPoint.y - 5);
        ctx.lineTo(e.clientX - 5, e.clientY - 5);
        ctx.stroke();

        lastPoint = { x: e.clientX, y: e.clientY };
    };

    el.onmouseup = function () {
        isDrawing = false;
    };

}