function Shape (id, coords)
{
	var largeValue = 9999999999;
	this.id = id;
	
	this.min = { x : largeValue, y : largeValue };
	this.max = { x : largeValue * -1, y : largeValue * -1 };
	
	if (coords.constructor == String)
	{
		coords = coords.split (',');
		this.points = [];
		for (var i = 2; i < coords.length; i += 2)
		{
			var p = {x:parseInt(coords[i]), y:parseInt(coords[i+1])};
			this.points.push(p);
		}
	}
	else if (coords.constructor == Array)
	{
		this.points = coords;
	}
	
	for (var i = 0; i < this.points.length; i++ )
	{
		var p = this.points[i];
		if (p.x < this.min.x) this.min.x = p.x;
		if (p.y < this.min.y) this.min.y = p.y;
		if (p.x > this.max.x) this.max.x = p.x;
		if (p.y > this.max.y) this.max.y = p.y;
	}
		
	this.centroid = function() {
	   var pts = this.points;
	   var nPts = pts.length;
	   var x=0; var y=0;
	   var f;
	   var j=nPts-1;
	   var p1; var p2;

	   for (var i=0;i<nPts;j=i++) {
		  p1=pts[i]; p2=pts[j];
		  f=p1.x*p2.y-p2.x*p1.y;
		  x+=(p1.x+p2.x)*f;
		  y+=(p1.y+p2.y)*f;
	   }

	   f=this.area()*6;
	   return {x: x/f,y:y/f};
	};
	
	this.area = function() {
	   var area=0;
	   var pts = this.points;
	   var nPts = pts.length;
	   var j=nPts-1;
	   var p1; var p2;

	   for (var i=0;i<nPts;j=i++) {
		  p1=pts[i]; p2=pts[j];
		  area+=p1.x*p2.y;
		  area-=p1.y*p2.x;
	   }
	   area/=2;
	   return area;
	};
	
	this.containsPoint = function (point) {
		// Exclude points outside of bounds as there is no way they are in the poly

		if (!rectContainsPoint (this.min, this.max, point) )
			return false;
			
		

		// Raycast point in polygon method
		var inPoly = false;
		var i;
		var j = this.points.length-1;

		for(var i=0; i < this.points.length; i++) { 
			var vertex1 = this.points[i];
			var vertex2 = this.points[j];

			if ( ( vertex1.x < point.x && vertex2.x >= point.x ) || (vertex2.x < point.x && vertex1.x >= point.x) )	 {
				if (vertex1.y + (point.x - vertex1.x) / (vertex2.x - vertex1.x) * (vertex2.y - vertex1.y) < point.y) {
					inPoly = !inPoly;
				}
			}

			j = i;
		}

		return inPoly;
	}
	
	this.center = this.centroid();
	
	return this;
}

function rectContainsPoint (p1, p2, point)
{
	return p1.x <= point.x && p1.y <= point.y && p2.x >= point.x && p2.y >= point.y;
}

function isPointInPoly(poly, pt){
	for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
		((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
		&& (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
		&& (c = !c);
	return c;
}
