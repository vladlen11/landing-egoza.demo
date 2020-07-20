console.log('music');

canvas = document.querySelector('canvas');
ctx = canvas.getContext ('2d');

ctx.beginPath();
ctx.fillStyle = '#FFF';

var   POINTS = 30,
    MIDDLE_X = canvas.width/2,
    MIDDLE_Y = canvas.width/2,
    LENGTH = 90,
    WAVE_SPEED = 6,
    CLEAR_ALPHA = 0.09,
    HUE_FACTOR = 0.25,
    AMPLITUDE_MODIFIER = 6,
    FILL_STYLE = '#222',
    POINT_INTERPOLATION = 1,
    STROKE_WIDTH = 1;

var corners = [];

function getBezier (x1,y1,x2,y2,amplitude) {
    // CONTROL POINT 1
    var cp1x = x2-x1;
    var cp1y = y2-y1;

    var cp1 = {
        x: -cp1y*amplitude + cp1x/2 + x1,
        y: cp1x*amplitude + cp1y/2 + y1
    };

    var cp2 = {
        x: cp1y*amplitude - cp1x/2 + x2,
        y: -cp1x*amplitude - cp1y/2 + y2
    };
    return {
        cp1: cp1,
        cp2: cp2
    };
}

function update(element) {
    if(isNaN(+element.value))
        window[element.id] = element.value;
    else
        window[element.id] = +element.value;
}

function setPattern(n) {
    switch(n) {
        case 0:
            POINTS = 30;
            WAVE_SPEED = 6;
            CLEAR_ALPHA = 0.09;
            HUE_FACTOR = 0.25;
            AMPLITUDE_MODIFIER = 6;
            FILL_STYLE = '#222';
            POINT_INTERPOLATION = 1;
            break;
        case 1:
            POINTS = 37;
            WAVE_SPEED = 2;
            CLEAR_ALPHA = 0;
            HUE_FACTOR = 0.9;
            AMPLITUDE_MODIFIER = 60;
            FILL_STYLE = '#222';
            POINT_INTERPOLATION = 3;
            break;
        case 2:
            POINTS = 16;
            POINT_INTERPOLATION = 7;
            WAVE_SPEED = 4;
            AMPLITUDE_MODIFIER = 1;
            CLEAR_ALPHA = 0.1;
            HUE_FACTOR = 1;
            FILL_STYLE = '#222';
            break;
        case 3:
            POINTS = 101;
            POINT_INTERPOLATION = 50;
            WAVE_SPEED = 3;
            AMPLITUDE_MODIFIER = 1;
            CLEAR_ALPHA = 1;
            HUE_FACTOR = 1;
            FILL_STYLE = '#222';
            break;
        case 4:
            POINTS = 1000;
            POINT_INTERPOLATION = 1;
            WAVE_SPEED = 3;
            AMPLITUDE_MODIFIER = 700;
            CLEAR_ALPHA = 0;
            HUE_FACTOR = 4;
            FILL_STYLE = '#222';
            break;
        case 5:
            POINTS = 1000;
            POINT_INTERPOLATION = 1;
            WAVE_SPEED = 2;
            AMPLITUDE_MODIFIER = 0;
            CLEAR_ALPHA = 1;
            HUE_FACTOR = 1;
            FILL_STYLE = '#222';
            break;
    }
    clearCanvas();
    genPoints();
    return false;
}

function clearCanvas () {
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

// GENERATE POINTS

function genPoints () {
    corners = [];
    for (var i=0 ; i<POINTS ; i++) {
        corners.push({
            x:LENGTH*Math.cos(Math.PI/180 * 360/POINTS * i)-
            LENGTH*Math.sin(Math.PI/180 * 360/POINTS * i)+
            MIDDLE_X,
            y:LENGTH*Math.cos(Math.PI/180 * 360/POINTS * i)+
            LENGTH*Math.sin(Math.PI/180 * 360/POINTS * i)+
            MIDDLE_Y,
            a:Math.random()*360});
    }
}
genPoints ();
setInterval(function(){

    // DRAW PATHS

    ctx.beginPath();
    ctx.moveTo(corners[0].x,corners[0].y);

    for (var i=0 ; i<POINTS ; i++) {
        // ctx.lineTo(corners[i].x, corners[i].y);
        var b = getBezier(corners[i].x,
            corners[i].y,
            corners[(i+POINT_INTERPOLATION)%POINTS].x,
            corners[(i+POINT_INTERPOLATION)%POINTS].y,
            Math.sin(corners[i].a/360*Math.PI*2)*AMPLITUDE_MODIFIER*(Math.random()*0.1+0.3));
        ctx.bezierCurveTo(b.cp1.x, b.cp1.y, b.cp2.x, b.cp2.y, corners[(i+POINT_INTERPOLATION)%POINTS].x, corners[(i+POINT_INTERPOLATION)%POINTS].y);
        corners[i].a = corners[i].a+WAVE_SPEED;
    }

    ctx.globalAlpha = CLEAR_ALPHA;
    ctx.lineWidth = STROKE_WIDTH;
    ctx.fillStyle = FILL_STYLE;
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'hsl('+(corners[0].a*HUE_FACTOR)+',60%, 60%)';
    ctx.stroke();
},20);