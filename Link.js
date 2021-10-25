class Link {

  constructor(_point1, _point2, _color){
    this.point1 = _point1;
    this.point2 = _point2;
    this.color = _color;
  }

  draw(){
    stroke(this.color);
    strokeWeight(3);

    line(this.point1.getX(), this.point1.getY(), this.point2.getX(), this.point2.getY());
  }
}
