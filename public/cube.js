//front-0, back-1, left-2, right-3, top-4, bottom-5
function Cube(size){
	this.size=size;
	this.angle=0;
	this.speed=25;
	this.padding = 4000;
	this.facingSide=0;
	this.mesh;
	this.beginxyz={
		x:0,y:0,z:0
	};
	this.rotateCount;
	this.rotateDirection = 0;
	this.rotateHappening = false;
	this.cubeObject;
	this.voxel = new Array();
	/*for(var ix = 0;ix < (size+this.padding);ix++){
		if(this.voxel[ix]== undefined)
			this.voxel[ix]=new Array();
		for(var iy = 0;iy < (size+this.padding);iy++){
			if(this.voxel[ix][iy]== undefined)
				this.voxel[ix][iy]=new Array();
			for(var iz = 0;iz < (size+this.padding);iz++){
				this.voxel[ix][iy][iz] = 0;
			}
		}
	}*/
	for(var ix = this.padding;ix < (size+this.padding);ix++){
		if(this.voxel[ix]== undefined)
			this.voxel[ix]=new Array();
		for(var iy = this.padding;iy < (size+this.padding);iy++){
			if(this.voxel[ix][iy]== undefined)
				this.voxel[ix][iy]=new Array();
			for(var iz = this.padding;iz < (size+this.padding);iz++){
				this.voxel[ix][iy][iz] = 1;
			}
		}
	}
	this.voxel[this.padding][this.padding+20-1][this.padding]=0;
	this.voxel[this.padding][this.padding+20-1][this.padding+3]=0;
	this.voxel[this.padding][this.padding+20-1][this.padding+10]=0;
	this.x = -(this.padding*10+((this.size/2)*10));
	this.y = -(this.padding*10+((this.size/2)*10));
	this.z = -(this.padding*10+((this.size/2)*10));
	this.rotate = CubeRotate;
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
function CubeRotate(){
	if(!this.rotateHappening){
		var temp = Math.floor(Math.random()*6);
		if(this.rotateDirection==temp){
			this.rotate();
			return;
		}
		this.rotateDirection = temp;
		this.rotateHappening = true;
		this.rotateCount = 0;
		this.beginxyz.x=this.mesh.rotation.x;
		this.beginxyz.y=this.mesh.rotation.y;
		this.beginxyz.z=this.mesh.rotation.z;
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
				if(this.rotateCount+1<this.speed){
					this.mesh.rotation.x-=((this.beginxyz.x-toPosX!=0)?(this.beginxyz.x-toPosX)/this.speed:toPosX);
					this.mesh.rotation.y-=((this.beginxyz.y-toPosY!=0)?(this.beginxyz.y-toPosY)/this.speed:toPosY);
					this.mesh.rotation.z-=((this.beginxyz.z-toPosZ!=0)?(this.beginxyz.z-toPosZ)/this.speed:toPosZ);
				}else{
					this.mesh.rotation.x=toPosX;
					this.mesh.rotation.y=toPosY;
					this.mesh.rotation.z=toPosZ;
				}
			break;
			case 1: // RIGHT
				var toPosX = 0;
				var toPosY = 0;
				var toPosZ = ((Math.PI/(this.speed*2))*this.speed)*2;
				if(this.rotateCount+1<this.speed){
					this.mesh.rotation.x-=((this.beginxyz.x-toPosX!=0)?(this.beginxyz.x-toPosX)/this.speed:toPosX);
					this.mesh.rotation.y-=((this.beginxyz.y-toPosY!=0)?(this.beginxyz.y-toPosY)/this.speed:toPosY);
					this.mesh.rotation.z-=((this.beginxyz.z-toPosZ!=0)?(this.beginxyz.z-toPosZ)/this.speed:toPosZ);
				}else{
					this.mesh.rotation.x=toPosX;
					this.mesh.rotation.y=toPosY;
					this.mesh.rotation.z=toPosZ;
				}
			break;
			case 2: // top
				var toPosX = 0;
				var toPosY = 0;
				var toPosZ = ((Math.PI/(this.speed*2))*this.speed);
				if(this.rotateCount+1<this.speed){
					this.mesh.rotation.x-=((this.beginxyz.x-toPosX!=0)?(this.beginxyz.x-toPosX)/this.speed:toPosX);
					this.mesh.rotation.y-=((this.beginxyz.y-toPosY!=0)?(this.beginxyz.y-toPosY)/this.speed:toPosY);
					this.mesh.rotation.z-=((this.beginxyz.z-toPosZ!=0)?(this.beginxyz.z-toPosZ)/this.speed:toPosZ);
				}else{
					this.mesh.rotation.x=toPosX;
					this.mesh.rotation.y=toPosY;
					this.mesh.rotation.z=toPosZ;
				}
			break;
			case 3: // BOTTOM
				var toPosX = 0;
				var toPosY = 0;
				var toPosZ = ((Math.PI/(this.speed*2))*this.speed)*3;
				if(this.rotateCount+1<this.speed){
					this.mesh.rotation.x-=((this.beginxyz.x-toPosX!=0)?(this.beginxyz.x-toPosX)/this.speed:toPosX);
					this.mesh.rotation.y-=((this.beginxyz.y-toPosY!=0)?(this.beginxyz.y-toPosY)/this.speed:toPosY);
					this.mesh.rotation.z-=((this.beginxyz.z-toPosZ!=0)?(this.beginxyz.z-toPosZ)/this.speed:toPosZ);
				}else{
					this.mesh.rotation.x=toPosX;
					this.mesh.rotation.y=toPosY;
					this.mesh.rotation.z=toPosZ;
				}
			break;
			case 4: // FRONT
				var toPosX = 0;
				var toPosY = ((Math.PI/(this.speed*2))*this.speed);
				var toPosZ = 0;
				if(this.rotateCount+1<this.speed){
					this.mesh.rotation.x-=((this.beginxyz.x-toPosX!=0)?(this.beginxyz.x-toPosX)/this.speed:toPosX);
					this.mesh.rotation.y-=((this.beginxyz.y-toPosY!=0)?(this.beginxyz.y-toPosY)/this.speed:toPosY);
					this.mesh.rotation.z-=((this.beginxyz.z-toPosZ!=0)?(this.beginxyz.z-toPosZ)/this.speed:toPosZ);
				}else{
					this.mesh.rotation.x=toPosX;
					this.mesh.rotation.y=toPosY;
					this.mesh.rotation.z=toPosZ;
				}
			break;
			case 5: // BACK
				var toPosX = 0;
				var toPosY = ((Math.PI/(this.speed*2))*this.speed)*3;
				var toPosZ = 0;
				if(this.rotateCount+1<this.speed){
					this.mesh.rotation.x-=((this.beginxyz.x-toPosX!=0)?(this.beginxyz.x-toPosX)/this.speed:toPosX);
					this.mesh.rotation.y-=((this.beginxyz.y-toPosY!=0)?(this.beginxyz.y-toPosY)/this.speed:toPosY);
					this.mesh.rotation.z-=((this.beginxyz.z-toPosZ!=0)?(this.beginxyz.z-toPosZ)/this.speed:toPosZ);
				}else{
					this.mesh.rotation.x=toPosX;
					this.mesh.rotation.y=toPosY;
					this.mesh.rotation.z=toPosZ;
				}
			break;
		}
		this.rotateCount++;
	}else{
		this.rotateHappening = false;
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
	var centerCalc = (this.size/2)*10+(this.padding*10);
	var faceIndex = 0;
	var geometry = new THREE.Geometry();
	for(var ix = 0;ix < (this.size+this.padding);ix++){
		if(this.voxel[ix]!= undefined){
			for(var iy = 0;iy < (this.size+this.padding);iy++){
				if(this.voxel[ix][iy]!= undefined){
					for(var iz = 0;iz < (this.size+this.padding);iz++){
						if(this.voxel[ix][iy][iz]!= undefined){
							ac = adjacentCheck(this.voxel,ix,iy,iz);
							if(this.voxel[ix][iy][iz]==1){
								if(ac[0]){ // left - RED
									geometry.vertices.push(
										new THREE.Vector3((ix*10)-10-centerCalc,(iy*10)-centerCalc, (iz*10)-centerCalc ),
										new THREE.Vector3((ix*10)-10-centerCalc,(iy*10)-10-centerCalc, (iz*10)-centerCalc ),
										new THREE.Vector3((ix*10)-10-centerCalc,(iy*10)-10-centerCalc, (iz*10)-10-centerCalc ),
										new THREE.Vector3((ix*10)-10-centerCalc,(iy*10)-centerCalc, (iz*10)-10-centerCalc )
									);
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+1, faceIndex+2, 1, new THREE.Color( 0xFA574B ) ));
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+2, faceIndex+3, 1, new THREE.Color( 0xFA574B ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+2, faceIndex+1, faceIndex, 1, new THREE.Color( 0xFA574B ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+3, faceIndex+2, faceIndex, 1, new THREE.Color( 0xFA574B ) ));
									faceIndex +=4; 
								}
								if(ac[1]){ // Right - YELLOW
									geometry.vertices.push(
										new THREE.Vector3((ix*10)-centerCalc,(iy*10)-centerCalc, (iz*10)-10-centerCalc ),
										new THREE.Vector3((ix*10)-centerCalc,(iy*10)-10-centerCalc, (iz*10)-10-centerCalc ),
										new THREE.Vector3((ix*10)-centerCalc,(iy*10)-10-centerCalc, (iz*10)-centerCalc ),
										new THREE.Vector3((ix*10)-centerCalc,(iy*10)-centerCalc, (iz*10)-centerCalc )
									);
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+1, faceIndex+2, 1, new THREE.Color( 0xF4FA4B ) ));
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+2, faceIndex+3, 1, new THREE.Color( 0xF4FA4B ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+3, faceIndex+2, faceIndex, 1, new THREE.Color( 0xF4FA4B ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+2, faceIndex+1, faceIndex, 1, new THREE.Color( 0xF4FA4B ) ));
									faceIndex +=4; 
								}
								if(ac[3]){ // Top - GREEN
									geometry.vertices.push(
										new THREE.Vector3((ix*10)-centerCalc,(iy*10)-centerCalc, (iz*10)-10-centerCalc ),
										new THREE.Vector3((ix*10)-centerCalc,(iy*10)-centerCalc, (iz*10)-centerCalc ),
										new THREE.Vector3((ix*10)-10-centerCalc,(iy*10)-centerCalc, (iz*10)-centerCalc ),
										new THREE.Vector3((ix*10)-10-centerCalc,(iy*10)-centerCalc, (iz*10)-10-centerCalc )
									);
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+1, faceIndex+2, 1, new THREE.Color( 0x5AFA4B ) ));
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+2, faceIndex+3, 1, new THREE.Color( 0x5AFA4B ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+2, faceIndex+1, faceIndex, 1, new THREE.Color( 0x5AFA4B ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+3, faceIndex+2, faceIndex, 1, new THREE.Color( 0x5AFA4B ) ));
									faceIndex +=4; 
								}
								if(ac[2]){ // Bottom - Light blue
									geometry.vertices.push(
										new THREE.Vector3((ix*10)-centerCalc,(iy*10)-10-centerCalc, (iz*10)-10-centerCalc ),
										new THREE.Vector3((ix*10)-centerCalc,(iy*10)-10-centerCalc, (iz*10)-centerCalc ),
										new THREE.Vector3((ix*10)-10-centerCalc,(iy*10)-10-centerCalc, (iz*10)-centerCalc ),
										new THREE.Vector3((ix*10)-10-centerCalc,(iy*10)-10-centerCalc, (iz*10)-10-centerCalc )
									);
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+1, faceIndex+2, 1, new THREE.Color( 0x4BF7FA ) ));
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+2, faceIndex+3, 1, new THREE.Color( 0x4BF7FA ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+2, faceIndex+1, faceIndex, 1, new THREE.Color( 0x4BF7FA ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+3, faceIndex+2, faceIndex, 1, new THREE.Color( 0x4BF7FA ) ));
									faceIndex +=4; 
								}
								if(ac[4]){ // Front - Purple
									geometry.vertices.push(
										new THREE.Vector3((ix*10)-10-centerCalc,(iy*10)-centerCalc, (iz*10)-10-centerCalc ),
										new THREE.Vector3((ix*10)-10-centerCalc,(iy*10)-10-centerCalc, (iz*10)-10-centerCalc ),
										new THREE.Vector3((ix*10)-centerCalc,(iy*10)-10-centerCalc, (iz*10)-10-centerCalc ),
										new THREE.Vector3((ix*10)-centerCalc,(iy*10)-centerCalc, (iz*10)-10-centerCalc )
									);
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+1, faceIndex+2, 1, new THREE.Color( 0xF14BFA ) ));
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+2, faceIndex+3, 1, new THREE.Color( 0xF14BFA ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+2, faceIndex+1, faceIndex, 1, new THREE.Color( 0xF14BFA ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+3, faceIndex+2, faceIndex, 1, new THREE.Color( 0xF14BFA ) ));
									faceIndex +=4; 
								}
								if(ac[5]){ // Back - Orange
									geometry.vertices.push(
										new THREE.Vector3((ix*10)-10-centerCalc,(iy*10)-centerCalc, (iz*10)-centerCalc ),
										new THREE.Vector3((ix*10)-10-centerCalc,(iy*10)-10-centerCalc, (iz*10)-centerCalc ),
										new THREE.Vector3((ix*10)-centerCalc,(iy*10)-10-centerCalc, (iz*10)-centerCalc ),
										new THREE.Vector3((ix*10)-centerCalc,(iy*10)-centerCalc, (iz*10)-centerCalc )
									);
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+1, faceIndex+2, 1,new THREE.Color( 0xF2C613) ));
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+2, faceIndex+3, 1, new THREE.Color(0xF2C613) ));
									geometry.faces.push(new THREE.Face3( faceIndex+2, faceIndex+1, faceIndex, 1, new THREE.Color(0xF2C613) ));
									geometry.faces.push(new THREE.Face3( faceIndex+3, faceIndex+2, faceIndex, 1, new THREE.Color(0xF2C613) ));
									faceIndex +=4; 
								}
							}
						}	
					}
				}
			}
		}
	}
	var material = new THREE.MeshLambertMaterial( { color:0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors  } );
	this.mesh = new THREE.Mesh( geometry, material );
	this.mesh.position.x=5;
	this.mesh.position.y=5;
	this.mesh.position.z=5;
	scene.add(this.mesh);
	
	
}