function Cube(size,x,y,z){
	this.settings={
		onFinish:function(c){},
		onInit:function(c){}
	};
	this.size=size;
	this.angle=0;
	this.cubeSize=70;
	this.speed=15;
	this.startTime=0;
	this.padding = 100;
	this.facingSide=0;
	this.color=[0,0,0];
	this.mesh=false;
	this.beginxyz={
		x:0,y:0,z:0
	};
	this.rotateCount;
	this.rotateDirection = 0;
	this.rotateHappening = false;
	this.cubeObject;
	this.voxel = new Array();
	for(var ix = this.padding;ix < (size+this.padding);ix++){
		if(this.voxel[ix]== undefined)
			this.voxel[ix]=new Array();
		for(var iy = this.padding;iy < (size+this.padding);iy++){
			if(this.voxel[ix][iy]== undefined)
				this.voxel[ix][iy]=new Array();
			for(var iz = this.padding;iz < (size+this.padding);iz++){
				//size+this.padding
				this.voxel[ix][iy][iz] = 1;
			}
		}
	}
	this.x = x;
	this.y = y;
	this.z = z;
	this.rotate = CubeRotate;
	this.edit = CubeEdit;
	this.getFillPlots = CubeGetFillPlots;
	this.getEmptyPlots = CubeGetEmptyPlots;
	this.update = CubeUpdate;
	this.navigate = navigateFromSide;
	this.render = CubeRender;
}
function navigateFromSide(){
	var html = "Facing side: "+(this.facingSide+1)+"<br/> x:"+(this.mesh.rotation.x/(2*Math.PI))+"<br/>";
	html += "y:"+(this.mesh.rotation.y/(2*Math.PI))+"<br/>";
	html += "z:"+(this.mesh.rotation.z/(2*Math.PI));
	$("#cubedata").html(html);
}
function CubeGetEmptyPlots(x,y,z){
    var plots = new Array();
    for(var ix = 0;ix < (this.size+(this.padding*2));ix++){
        if(this.voxel[ix]!= undefined){
            for(var iy = 0;iy < (this.size+(this.padding*2));iy++){
                if(this.voxel[ix][iy]!= undefined){
                    for(var iz = 0;iz < (this.size+(this.padding*2));iz++){
                        if(this.voxel[ix][iy][iz]!= undefined){
                            var entry = checkExists(this.voxel,ix+x,iy+y,iz+z);
                            if(entry){
                                plots.push([ix+x,iy+y,iz+z]);
                            }
                        }
                    }
                }
            }
        }
    }
    return plots;
}
function CubeGetFillPlots(x,y,z){
    var plots = new Array();
    for(var ix = 0;ix < (this.size+(this.padding*2));ix++){
        if(this.voxel[ix]!= undefined){
            for(var iy = 0;iy < (this.size+(this.padding*2));iy++){
                if(this.voxel[ix][iy]!= undefined){
                    for(var iz = 0;iz < (this.size+(this.padding*2));iz++){
                        if(this.voxel[ix][iy][iz]!= undefined){
                            var entry = checkExists(this.voxel,ix+x,iy+y,iz+z);
                            if(entry){
                                plots.push([ix,iy,iz]);
                            }
                        }
                    }
                }
            }
        }
    }
    return plots;
}
function CubeEdit(){
    var plots = new Array();
    var act = Math.floor(Math.random()*2);
    if(act==1){
        switch(this.rotateDirection){
            case 0: // LEFT
                plots = this.getEmptyPlots(-1,0,0);
            break;
            case 1: // RIGHT
                plots = this.getEmptyPlots(1,0,0);
            break;
            case 2: // top
                plots = this.getEmptyPlots(0,1,0);
            break;
            case 3: // BOTTOM
                plots = this.getEmptyPlots(0,-1,0);
            break;
            case 4: // FRONT
                plots = this.getEmptyPlots(0,0,-1);
            break;
            case 5: // BACK
                plots = this.getEmptyPlots(0,0,1);
            break;
        }
    }else if(act==2 || act==0){
        switch(this.rotateDirection){
            case 0: // LEFT
                plots = this.getFillPlots(-1,0,0);
            break;
            case 1: // RIGHT
                plots = this.getFillPlots(1,0,0);
            break;
            case 2: // top
                plots = this.getFillPlots(0,1,0);
            break;
            case 3: // BOTTOM
                plots = this.getFillPlots(0,-1,0);
            break;
            case 4: // FRONT
                plots = this.getFillPlots(0,0,-1);
            break;
            case 5: // BACK
                plots = this.getFillPlots(0,0,1);
            break;
        }
    }
    var i = Math.floor((Math.random()*plots.length));
    var plot = plots[i];
    if(this.voxel[plot[0]]==undefined)
        this.voxel[plot[0]]= new Array();
    if(this.voxel[plot[0]][plot[1]]==undefined)
        this.voxel[plot[0]][plot[1]]= new Array();
    if(act==1){
        this.voxel[plot[0]][plot[1]][plot[2]] = 1;
    }else if(act==2 || act==0){
        this.voxel[plot[0]][plot[1]][plot[2]] = 0;
    }
}
function CubeRotate(startTime){
	if(!this.rotateHappening){
		var temp = Math.floor((Math.random()*6));
		if(this.rotateDirection==temp){
			this.rotate(startTime);
			return;
		}
		this.startTime = startTime;
		this.rotateDirection = temp;
		this.rotateHappening = true;
		this.rotateCount = 0;
		this.beginxyz.x=this.mesh.rotation.x;
		this.beginxyz.y=this.mesh.rotation.y;
		this.beginxyz.z=this.mesh.rotation.z;
	}
	
}
function rotationCalculation(c,x,y,z){
	if(c.rotateCount+1<c.speed){
		c.mesh.rotation.x-=((c.beginxyz.x-x!=0)?(c.beginxyz.x-x)/c.speed:x);
		c.mesh.rotation.y-=((c.beginxyz.y-y!=0)?(c.beginxyz.y-y)/c.speed:y);
		c.mesh.rotation.z-=((c.beginxyz.z-z!=0)?(c.beginxyz.z-z)/c.speed:z);
	}else{
		c.mesh.rotation.x=x;
		c.mesh.rotation.y=y;
		c.mesh.rotation.z=z;
	}
}
function CubeRender(){
	this.facingSide=this.rotateDirection;
	if(this.rotateHappening && this.rotateCount<this.speed){
		switch(this.rotateDirection){
			case 0: // LEFT
				var toPosX = 0;
				var toPosY = 0;
				var toPosZ = 0;
				rotationCalculation(this,toPosX,toPosY,toPosZ);
			break;
			case 1: // RIGHT
				var toPosX = 0;
				var toPosY = 0;
				var toPosZ = ((Math.PI/(this.speed*2))*this.speed)*2;
				rotationCalculation(this,toPosX,toPosY,toPosZ);
			break;
			case 2: // TOP
				var toPosX = 0;
				var toPosY = 0;
				var toPosZ = ((Math.PI/(this.speed*2))*this.speed);
				rotationCalculation(this,toPosX,toPosY,toPosZ);
			break;
			case 3: // BOTTOM
				var toPosX = 0;
				var toPosY = 0;
				var toPosZ = ((Math.PI/(this.speed*2))*this.speed)*3;
				rotationCalculation(this,toPosX,toPosY,toPosZ);
			break;
			case 4: // FRONT
				var toPosX = 0;
				var toPosY = ((Math.PI/(this.speed*2))*this.speed);
				var toPosZ = 0;
				rotationCalculation(this,toPosX,toPosY,toPosZ);
			break;
			case 5: // BACK
				var toPosX = 0;
				var toPosY = ((Math.PI/(this.speed*2))*this.speed)*3;
				var toPosZ = 0;
				rotationCalculation(this,toPosX,toPosY,toPosZ);
			break;
		}
		this.rotateCount++;
	}else if(this.rotateHappening){
		this.edit();
		this.rotateHappening = false;
		switch(this.rotateDirection){
			case 0: // LEFT
				var toPosX = 0;
				var toPosY = 0;
				var toPosZ = 0;
				this.update();
				this.mesh.rotation.x=toPosX;
				this.mesh.rotation.y=toPosY;
				this.mesh.rotation.z=toPosZ;
			break;
			case 1: // RIGHT
				var toPosX = 0;
				var toPosY = 0;
				var toPosZ = ((Math.PI/(this.speed*2))*this.speed)*2;
				this.update();
				this.mesh.rotation.x=toPosX;
				this.mesh.rotation.y=toPosY;
				this.mesh.rotation.z=toPosZ;
			break;
			case 2: // TOP
				var toPosX = 0;
				var toPosY = 0;
				var toPosZ = ((Math.PI/(this.speed*2))*this.speed);
				this.update();
				this.mesh.rotation.x=toPosX;
				this.mesh.rotation.y=toPosY;
				this.mesh.rotation.z=toPosZ;
			break;
			case 3: // BOTTOM
				var toPosX = 0;
				var toPosY = 0;
				var toPosZ = ((Math.PI/(this.speed*2))*this.speed)*3;
				this.update();
				this.mesh.rotation.x=toPosX;
				this.mesh.rotation.y=toPosY;
				this.mesh.rotation.z=toPosZ;
			break;
			case 4: // FRONT
				var toPosX = 0;
				var toPosY = ((Math.PI/(this.speed*2))*this.speed);
				var toPosZ = 0;
				this.update();
				this.mesh.rotation.x=toPosX;
				this.mesh.rotation.y=toPosY;
				this.mesh.rotation.z=toPosZ;
			break;
			case 5: // BACK
				var toPosX = 0;
				var toPosY = ((Math.PI/(this.speed*2))*this.speed)*3;
				var toPosZ = 0;
				this.update();
				this.mesh.rotation.x=toPosX;
				this.mesh.rotation.y=toPosY;
				this.mesh.rotation.z=toPosZ;
			break;
		}
		this.settings.onFinish(this);	
	}
	this.navigate();
	
}
function checkExists(vox,x,y,z){
	if(vox[x]!=undefined)
		if(vox[x][y]!=undefined)
			if(vox[x][y][z]!=undefined)
				return ((vox[x][y][z]!=1)?true:false);
	return true;
}
function adjacentCheck(vox,x,y,z){
	var left = checkExists(vox,x-1,y,z);
	var right = checkExists(vox,x+1,y,z);
	var top = checkExists(vox,x,y-1,z);
	var bottom = checkExists(vox,x,y+1,z);
	var front = checkExists(vox,x,y,z-1);
	var back = checkExists(vox,x,y,z+1);
	return [left,right,top,bottom,front,back];
}
function CubeUpdate(){
	var centerCalc = ((this.size-2)/2)*this.cubeSize+(this.padding*this.cubeSize);
	var faceIndex = 0;
	var geometry = new THREE.Geometry();
	for(var ix = 0;ix < (this.size+(this.padding*2));ix++){
		if(this.voxel[ix]!= undefined){
			for(var iy = 0;iy < (this.size+(this.padding*2));iy++){
				if(this.voxel[ix][iy]!= undefined){
					for(var iz = 0;iz < (this.size+(this.padding*2));iz++){
						if(this.voxel[ix][iy][iz]!= undefined){
							ac = adjacentCheck(this.voxel,ix,iy,iz);
							if(this.voxel[ix][iy][iz]==1){
								if(ac[0]){ // left - RED
									geometry.vertices.push(
										new THREE.Vector3((ix*this.cubeSize)-this.cubeSize-centerCalc,(iy*this.cubeSize)-centerCalc, (iz*this.cubeSize)-centerCalc ),
										new THREE.Vector3((ix*this.cubeSize)-this.cubeSize-centerCalc,(iy*this.cubeSize)-this.cubeSize-centerCalc, (iz*this.cubeSize)-centerCalc ),
										new THREE.Vector3((ix*this.cubeSize)-this.cubeSize-centerCalc,(iy*this.cubeSize)-this.cubeSize-centerCalc, (iz*this.cubeSize)-this.cubeSize-centerCalc ),
										new THREE.Vector3((ix*this.cubeSize)-this.cubeSize-centerCalc,(iy*this.cubeSize)-centerCalc, (iz*this.cubeSize)-this.cubeSize-centerCalc )
									);
									//geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+1, faceIndex+2, 1, new THREE.Color( 0xFA574B ) ));
									//geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+2, faceIndex+3, 1, new THREE.Color( 0xFA574B ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+2, faceIndex+1, faceIndex, 1, new THREE.Color( 0xFA574B ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+3, faceIndex+2, faceIndex, 1, new THREE.Color( 0xFA574B ) ));
									faceIndex +=4; 
								}
								if(ac[1]){ // Right - YELLOW
									geometry.vertices.push(
										new THREE.Vector3((ix*this.cubeSize)-centerCalc,(iy*this.cubeSize)-centerCalc, (iz*this.cubeSize)-this.cubeSize-centerCalc ),
										new THREE.Vector3((ix*this.cubeSize)-centerCalc,(iy*this.cubeSize)-this.cubeSize-centerCalc, (iz*this.cubeSize)-this.cubeSize-centerCalc ),
										new THREE.Vector3((ix*this.cubeSize)-centerCalc,(iy*this.cubeSize)-this.cubeSize-centerCalc, (iz*this.cubeSize)-centerCalc ),
										new THREE.Vector3((ix*this.cubeSize)-centerCalc,(iy*this.cubeSize)-centerCalc, (iz*this.cubeSize)-centerCalc )
									);
									//geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+1, faceIndex+2, 1, new THREE.Color( 0xF4FA4B ) ));
									//geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+2, faceIndex+3, 1, new THREE.Color( 0xF4FA4B ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+3, faceIndex+2, faceIndex, 1, new THREE.Color( 0xF4FA4B ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+2, faceIndex+1, faceIndex, 1, new THREE.Color( 0xF4FA4B ) ));
									faceIndex +=4; 
								}
								if(ac[3]){ // Top - GREEN
									geometry.vertices.push(
										new THREE.Vector3((ix*this.cubeSize)-centerCalc,(iy*this.cubeSize)-centerCalc, (iz*this.cubeSize)-this.cubeSize-centerCalc ),
										new THREE.Vector3((ix*this.cubeSize)-centerCalc,(iy*this.cubeSize)-centerCalc, (iz*this.cubeSize)-centerCalc ),
										new THREE.Vector3((ix*this.cubeSize)-this.cubeSize-centerCalc,(iy*this.cubeSize)-centerCalc, (iz*this.cubeSize)-centerCalc ),
										new THREE.Vector3((ix*this.cubeSize)-this.cubeSize-centerCalc,(iy*this.cubeSize)-centerCalc, (iz*this.cubeSize)-this.cubeSize-centerCalc )
									);
									//geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+1, faceIndex+2, 1, new THREE.Color( 0x5AFA4B ) ));
									//geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+2, faceIndex+3, 1, new THREE.Color( 0x5AFA4B ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+2, faceIndex+1, faceIndex, 1, new THREE.Color( 0x5AFA4B ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+3, faceIndex+2, faceIndex, 1, new THREE.Color( 0x5AFA4B ) ));
									faceIndex +=4; 
								}
								if(ac[2]){ // Bottom - Light blue
									geometry.vertices.push(
										new THREE.Vector3((ix*this.cubeSize)-centerCalc,(iy*this.cubeSize)-this.cubeSize-centerCalc, (iz*this.cubeSize)-this.cubeSize-centerCalc ),
										new THREE.Vector3((ix*this.cubeSize)-centerCalc,(iy*this.cubeSize)-this.cubeSize-centerCalc, (iz*this.cubeSize)-centerCalc ),
										new THREE.Vector3((ix*this.cubeSize)-this.cubeSize-centerCalc,(iy*this.cubeSize)-this.cubeSize-centerCalc, (iz*this.cubeSize)-centerCalc ),
										new THREE.Vector3((ix*this.cubeSize)-this.cubeSize-centerCalc,(iy*this.cubeSize)-this.cubeSize-centerCalc, (iz*this.cubeSize)-this.cubeSize-centerCalc )
									);
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+1, faceIndex+2, 1, new THREE.Color( 0x4BF7FA ) ));
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+2, faceIndex+3, 1, new THREE.Color( 0x4BF7FA ) ));
									//geometry.faces.push(new THREE.Face3( faceIndex+2, faceIndex+1, faceIndex, 1, new THREE.Color( 0x4BF7FA ) ));
									//geometry.faces.push(new THREE.Face3( faceIndex+3, faceIndex+2, faceIndex, 1, new THREE.Color( 0x4BF7FA ) ));
									faceIndex +=4; 
								}
								if(ac[4]){ // Front - Purple
									geometry.vertices.push(
										new THREE.Vector3((ix*this.cubeSize)-this.cubeSize-centerCalc,(iy*this.cubeSize)-centerCalc, (iz*this.cubeSize)-this.cubeSize-centerCalc ),
										new THREE.Vector3((ix*this.cubeSize)-this.cubeSize-centerCalc,(iy*this.cubeSize)-this.cubeSize-centerCalc, (iz*this.cubeSize)-this.cubeSize-centerCalc ),
										new THREE.Vector3((ix*this.cubeSize)-centerCalc,(iy*this.cubeSize)-this.cubeSize-centerCalc, (iz*this.cubeSize)-this.cubeSize-centerCalc ),
										new THREE.Vector3((ix*this.cubeSize)-centerCalc,(iy*this.cubeSize)-centerCalc, (iz*this.cubeSize)-this.cubeSize-centerCalc )
									);
									//geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+1, faceIndex+2, 1, new THREE.Color( 0xF14BFA ) ));
									//geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+2, faceIndex+3, 1, new THREE.Color( 0xF14BFA ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+2, faceIndex+1, faceIndex, 1, new THREE.Color( 0xF14BFA ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+3, faceIndex+2, faceIndex, 1, new THREE.Color( 0xF14BFA ) ));
									faceIndex +=4; 
								}
								if(ac[5]){ // Back - Orange
									geometry.vertices.push(
										new THREE.Vector3((ix*this.cubeSize)-this.cubeSize-centerCalc,(iy*this.cubeSize)-centerCalc, (iz*this.cubeSize)-centerCalc ),
										new THREE.Vector3((ix*this.cubeSize)-this.cubeSize-centerCalc,(iy*this.cubeSize)-this.cubeSize-centerCalc, (iz*this.cubeSize)-centerCalc ),
										new THREE.Vector3((ix*this.cubeSize)-centerCalc,(iy*this.cubeSize)-this.cubeSize-centerCalc, (iz*this.cubeSize)-centerCalc ),
										new THREE.Vector3((ix*this.cubeSize)-centerCalc,(iy*this.cubeSize)-centerCalc, (iz*this.cubeSize)-centerCalc )
									);
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+1, faceIndex+2, 1,new THREE.Color( 0xF2C613) ));
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+2, faceIndex+3, 1, new THREE.Color(0xF2C613) ));
									//geometry.faces.push(new THREE.Face3( faceIndex+2, faceIndex+1, faceIndex, 1, new THREE.Color(0xF2C613) ));
									//geometry.faces.push(new THREE.Face3( faceIndex+3, faceIndex+2, faceIndex, 1, new THREE.Color(0xF2C613) ));
									faceIndex +=4; 
								}
							}
						}	
					}
				}
			}
		}
	}
	/* SMOOTHING METHOD FOUND ON THREEJS examples*/
	var modifier = new THREE.SubdivisionModifier( 1 );
	smooth = geometry.clone();
	smooth.mergeVertices();
	smooth.computeFaceNormals();
	smooth.computeVertexNormals();
	modifier.modify( smooth );
	var faceABCD = "abcd";
	this.color[0]=Math.round(Math.random()* (100 - 40) + 40);
	this.color[1]=Math.round(Math.random()* (100 - 40) + 40);
	this.color[2]=Math.round(Math.random()* (100 - 40) + 40);
	var color, f, p, n, vertexIndex;
	color = new THREE.Color("rgb("+this.color[0]+"%,"+this.color[1]+"%,"+this.color[2]+"%)" );
	for ( i = 0; i < smooth.faces.length; i ++ ) {

		f  = smooth.faces[ i ];
		n = ( f instanceof THREE.Face3 ) ? 3 : 4;
		for( var j = 0; j < n; j++ ) {
			vertexIndex = f[ faceABCD.charAt( j ) ];
			p = smooth.vertices[ vertexIndex ];
			
			f.vertexColors[ j ] = color;
		}
	}
	/* END SMOOTHING METHOD */
	var init = true;
	if(this.mesh!=false){
		scene.remove(this.mesh);
		init = false;
	}
	var material = [
		new THREE.MeshLambertMaterial( { color:0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors  } ),
		new THREE.MeshBasicMaterial( { color: 0x555555, wireframe: true, opacity: 0.02, transparent: true } )
	];
	this.mesh = new THREE.SceneUtils.createMultiMaterialObject( smooth, material );
	this.mesh.position.x=this.x;
	this.mesh.position.y=this.y;
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;
	this.mesh.position.z=this.z;
	scene.add(this.mesh);
	if(init)
		this.settings.onInit(this);
	
}