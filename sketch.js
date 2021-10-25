let pointSize = 20;
let lerpAmount;
let rootPoints;
let rootPoints2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  rootPoints = {
    P1: new Point(color('rgba(255, 255, 255, 180)'), pointSize, width * 0.25, height * 0.50),
    P2: new Point(color('rgba(255, 255, 255, 180)'), pointSize, width * 0.35, height * 0.1),
    P3: new Point(color('rgba(255, 255, 255, 180)'), pointSize, width * 0.65, height * 0.1),
    P4: new Point(color('rgba(255, 255, 255, 180)'), pointSize, width * 0.75, height * 0.50)
  };
  
  rootPoints2 = {
    P1: new Point(color('rgba(255, 255, 255, 180)'), pointSize, width * 0.25, height * 0.75),
    P2: new Point(color('rgba(255, 255, 255, 180)'), pointSize, width * 0.15, height * 0.50),
    P3: new Point(color('rgba(255, 255, 255, 180)'), pointSize, width * 0.45, height * 0.50),
    P4: new Point(color('rgba(255, 255, 255, 180)'), pointSize, width * 0.75, height * 0.75)
  };
}

function draw() {
  background(0);

  checkGrab(rootPoints2);
  let [ midPoints, subPoints, curvePoint] = bezierCurve(rootPoints2);

  rootPoints.P1 = curvePoint;

  checkGrab(rootPoints);
  bezierCurve(rootPoints);
}

function calc(points){
    let midColor = color('rgba(0, 197, 255, 255)');
    let subColor = color('rgba(198, 0, 255, 180)');
    let curveColor = color('rgba(255, 255, 255, 255)');

    lerpAmount = (sin(((frameCount % 240 ) / 240) * 2 * Math.PI) + 1) / (1 + 1);
    
    let midPoints = {
      M1: points.P1.lerp(points.P2, lerpAmount),
      M2: points.P2.lerp(points.P3, lerpAmount),
      M3: points.P3.lerp(points.P4, lerpAmount)
    };

    for (let point of Object.values(midPoints)){;
      point.setColor(midColor);
    }
    
    let subPoints = {
      S1: midPoints.M1.lerp(midPoints.M2, lerpAmount),
      S2: midPoints.M2.lerp(midPoints.M3, lerpAmount),
    };

    for (let point of Object.values(subPoints)){;
      point.setColor(subColor);
    }
    
    let curvePoint = subPoints.S1.lerp(subPoints.S2, lerpAmount);
    
    curvePoint.setColor(curveColor);

    return [midPoints, subPoints, curvePoint];
  }
  

function checkGrab(points){
  if (mouseIsPressed){
  
    let mousePos = createVector(mouseX, mouseY);
    
    for (let point of Object.values(points)){
      
      let pointDist = 20; 
      let mouseDist = p5.Vector.dist(mousePos, point.getVector());
  
      if (pointDist > mouseDist){
        point.setVector(mouseX, mouseY);
      }
    }
  }
}

function bezierCurve(points){
  let [midPoints, subPoints, curvePoint] = calc(points);

  let rootLine1 = new Link(points.P1, points.P2, color('rgba(255, 255, 255, 180)'));
  let rootLine2 = new Link(points.P2, points.P3, color('rgba(255, 255, 255, 180)'));
  let rootLine3 = new Link(points.P3, points.P4, color('rgba(255, 255, 255, 180)'));

  let midLine1 = new Link(midPoints.M1, midPoints.M2, color('rgba(0, 197, 255, 255)'));
  let midLine2 = new Link(midPoints.M2, midPoints.M3, color('rgba(0, 197, 255, 255)'));
  
  let curveline = new Link(subPoints.S1, subPoints.S2, color('rgba(198, 0, 255, 180)'));
  
  strokeWeight(3);
  
  noFill();
  
  bezier(points.P1.getX(), points.P1.getY(), points.P2.getX(), points.P2.getY(), points.P3.getX(), points.P3.getY(), points.P4.getX(), points.P4.getY());
  
  fill(0);

  rootLine1.draw();
  rootLine2.draw();
  rootLine3.draw();
  
  for (let point of Object.values(points)){
    point.draw();
  }

  midLine1.draw();
  midLine2.draw();

  for (let point of Object.values(midPoints)){;
    point.draw();
  }
  curveline.draw();
  
  for (let point of Object.values(subPoints)){;
    point.draw();
  }

  curvePoint.draw();


  return [midPoints, subPoints, curvePoint];
}