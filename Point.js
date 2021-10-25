  class Point {
    
    constructor(_color=255, _size=20, _x=0, _y=0, _vector=null){
      this.vector = _vector || createVector(_x, _y);
      this.color = _color;
      this.size = _size;
    }
    
    draw(){
      stroke(this.getColor());
      strokeWeight(3);
      fill(0);
      
      circle(this.getX(), this.getY(), this.getSize());
    }
    
    add(vector){
      this.vector.update(this.vector.add(vector));
    }
    
    lerp(point, amount){
      let newPoint = new Point();
      
      newPoint.setVector(p5.Vector.lerp(this.getVector(), point.getVector(), amount));
      newPoint.setColor(lerpColor(this.getColor(), point.getColor(), amount));

      return newPoint;
    }
    
    getX(){
      return this.vector.x;
    }
    
    getY(){
      return this.vector.y;
    }

    getVector(){
      return this.vector;
    }

    setVector(_x, _y){
      this.vector.set(_x, _y);
    }
    
    getSize(){
      return this.size;
    }

    setSize(_size){
      this.size = _size;
    }
    
    getColor(){
      return this.color;
    }

    setColor(_color){
      this.color = _color;
    }
    
    static copy(point){
      return new Point(point.getColor(), point.getSize(), point.getX(), point.getY());
    }

  }