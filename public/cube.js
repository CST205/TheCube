function Cube(size,x,y,z){
	this.size=size;
	this.angle=0;
	this.padding = 100;
	this.cubeObject;
	this.voxel = new Array();
	for(var ix = this.padding-1;ix < (size+this.padding);ix++){
		if(!this.voxel[ix])
			this.voxel[ix]=new Array();
		for(var iy = this.padding;iy < (size+this.padding);iy++){
			if(!this.voxel[ix][iy])
				this.voxel[ix][iy]=new Array();
			for(var iz = this.padding;iz < (size+this.padding);iz++){
				this.voxel[ix][iy][iz] = 1;
			}
		}
	}
	this.x = x;
	this.y = y;
	this.z = z;
	this.rotate = CubeRotate;
	this.update = CubeUpdate;
	this.render = CubeRender;
}

function CubeRotate(){
	
}

function CubeRender(){
	
}
function checkExists(vox,x,y,z){
	if(vox[x])
		if(vox[x][y])
			if(vox[x][y][z])
				return ((vox[x][y][z]!=1)?false:true);
	return false;
}
function adjacentCheck(vox,x,y,z){
	var left = checkExists(x-1,y,z);
	var right = checkExists(x+1,y,z);
	var top = checkExists(x,y-1,z);
	var bottom = checkExists(x,y+1,z);
	var front = checkExists(x,y,z-1);
	var back = checkExists(x,y,z+1);
	return [left,right,top,bottom,front,back];
}
function CubeUpdate(){
	this.cubeObject = new THREE.Geometry();
	for(var ix = 0;ix < (size+this.padding);ix++){
		if(this.voxel[ix]){
			for(var iy = 0;iy < (size+this.padding);iy++){
				if(this.voxel[ix][iy]){
					for(var iz = 0;iz < (size+this.padding);iz++){
						if(this.voxel[ix][iy][iz]){
							var geometry = new THREE.Geometry();
							ac = adjacentCheck(this.voxel,ix,iy,iz);
							if(ac[0]){ // left
								geometry.vertices.push(
									new THREE.Vector3((ix*10)-10,(iy*10), (iz*10) ),
									new THREE.Vector3((ix*10)-10,(iy*10)-10, (iz*10) ),
									new THREE.Vector3((ix*10)-10,(iy*10)-10, (iz*10)-10 ),
									new THREE.Vector3((ix*10)-10,(iy*10), (iz*10)-10 )
								);
							}
							this.cubeObject.merge(geometry);
							geometry = new THREE.Geometry();
							if(ac[1]){ // Right
								geometry.vertices.push(
									new THREE.Vector3((ix*10),(iy*10), (iz*10)-10 ),
									new THREE.Vector3((ix*10),(iy*10)-10, (iz*10)-10 ),
									new THREE.Vector3((ix*10),(iy*10)-10, (iz*10) ),
									new THREE.Vector3((ix*10),(iy*10), (iz*10) )
								);
							}
							this.cubeObject.merge(geometry);
							geometry = new THREE.Geometry();
							if(ac[2]){ // Top
								geometry.vertices.push(
									new THREE.Vector3((ix*10),(iy*10), (iz*10)-10 ),
									new THREE.Vector3((ix*10),(iy*10), (iz*10) ),
									new THREE.Vector3((ix*10)-10,(iy*10), (iz*10) ),
									new THREE.Vector3((ix*10)-10,(iy*10), (iz*10)-10 )
								);
							}
							this.cubeObject.merge(geometry);
							geometry = new THREE.Geometry();
							if(ac[3]){ // Bottom
								geometry.vertices.push(
									new THREE.Vector3((ix*10),(iy*10)-10, (iz*10)-10 ),
									new THREE.Vector3((ix*10),(iy*10)-10, (iz*10) ),
									new THREE.Vector3((ix*10)-10,(iy*10)-10, (iz*10) ),
									new THREE.Vector3((ix*10)-10,(iy*10)-10, (iz*10)-10 )
								);
							}
							this.cubeObject.merge(geometry);
							geometry = new THREE.Geometry();
							if(ac[4]){ // Front
								geometry.vertices.push(
									new THREE.Vector3((ix*10)-10,(iy*10), (iz*10)-10 ),
									new THREE.Vector3((ix*10)-10,(iy*10)-10, (iz*10)-10 ),
									new THREE.Vector3((ix*10),(iy*10)-10, (iz*10)-10 ),
									new THREE.Vector3((ix*10),(iy*10), (iz*10)-10 )
								);
							}
							this.cubeObject.merge(geometry);
							geometry = new THREE.Geometry();
							if(ac[5]){ // Back
								geometry.vertices.push(
									new THREE.Vector3((ix*10)-10,(iy*10), (iz*10) ),
									new THREE.Vector3((ix*10)-10,(iy*10)-10, (iz*10) ),
									new THREE.Vector3((ix*10),(iy*10)-10, (iz*10)-10 ),
									new THREE.Vector3((ix*10),(iy*10), (iz*10) )
								);
							}
						}	
					}
				}
			}
		}
	}
	scene.add(this.cubeObject);
}
