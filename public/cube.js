function Cube(size,x,y,z){
	this.size=size;
	this.angle=0;
	this.padding = 100;
	this.mesh;
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
	for(var ix = this.padding-1;ix < (size+this.padding);ix++){
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
	this.voxel[this.padding-1][this.padding+20-1][this.padding]=0;
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
								if(ac[0]){ // left
									geometry.vertices.push(
										new THREE.Vector3((ix*10)-10,(iy*10), (iz*10) ),
										new THREE.Vector3((ix*10)-10,(iy*10)-10, (iz*10) ),
										new THREE.Vector3((ix*10)-10,(iy*10)-10, (iz*10)-10 ),
										new THREE.Vector3((ix*10)-10,(iy*10), (iz*10)-10 )
									);
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+1, faceIndex+2, 1, new THREE.Color( 0xffff0f ) ));
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+2, faceIndex+3, 1, new THREE.Color( 0xffff0f ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+2, faceIndex+1, faceIndex, 1, new THREE.Color( 0xffff0f ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+3, faceIndex+2, faceIndex, 1, new THREE.Color( 0xffff0f ) ));
									faceIndex +=4; 
								}
								if(ac[1]){ // Right
									geometry.vertices.push(
										new THREE.Vector3((ix*10),(iy*10), (iz*10)-10 ),
										new THREE.Vector3((ix*10),(iy*10)-10, (iz*10)-10 ),
										new THREE.Vector3((ix*10),(iy*10)-10, (iz*10) ),
										new THREE.Vector3((ix*10),(iy*10), (iz*10) )
									);
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+1, faceIndex+2, 1, new THREE.Color( 0xff6fff ) ));
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+2, faceIndex+3, 1, new THREE.Color( 0xff6fff ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+3, faceIndex+2, faceIndex, 1, new THREE.Color( 0xff6fff ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+2, faceIndex+1, faceIndex, 1, new THREE.Color( 0xff6fff ) ));
									faceIndex +=4; 
								}
								if(ac[3]){ // Top
									geometry.vertices.push(
										new THREE.Vector3((ix*10),(iy*10), (iz*10)-10 ),
										new THREE.Vector3((ix*10),(iy*10), (iz*10) ),
										new THREE.Vector3((ix*10)-10,(iy*10), (iz*10) ),
										new THREE.Vector3((ix*10)-10,(iy*10), (iz*10)-10 )
									);
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+1, faceIndex+2, 1, new THREE.Color( 0x0fff0f ) ));
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+2, faceIndex+3, 1, new THREE.Color( 0x0fff0f ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+2, faceIndex+1, faceIndex, 1, new THREE.Color( 0x0fff0f ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+3, faceIndex+2, faceIndex, 1, new THREE.Color( 0x0fff0f ) ));
									faceIndex +=4; 
								}
								if(ac[2]){ // Bottom
									geometry.vertices.push(
										new THREE.Vector3((ix*10),(iy*10)-10, (iz*10)-10 ),
										new THREE.Vector3((ix*10),(iy*10)-10, (iz*10) ),
										new THREE.Vector3((ix*10)-10,(iy*10)-10, (iz*10) ),
										new THREE.Vector3((ix*10)-10,(iy*10)-10, (iz*10)-10 )
									);
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+1, faceIndex+2, 1, new THREE.Color( 0x00ffff ) ));
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+2, faceIndex+3, 1, new THREE.Color( 0x00ffff ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+2, faceIndex+1, faceIndex, 1, new THREE.Color( 0x00ffff ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+3, faceIndex+2, faceIndex, 1, new THREE.Color( 0x00ffff ) ));
									faceIndex +=4; 
								}
								if(ac[4]){ // Front
									geometry.vertices.push(
										new THREE.Vector3((ix*10)-10,(iy*10), (iz*10)-10 ),
										new THREE.Vector3((ix*10)-10,(iy*10)-10, (iz*10)-10 ),
										new THREE.Vector3((ix*10),(iy*10)-10, (iz*10)-10 ),
										new THREE.Vector3((ix*10),(iy*10), (iz*10)-10 )
									);
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+1, faceIndex+2, 1, new THREE.Color( 0xff00ff ) ));
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+2, faceIndex+3, 1, new THREE.Color( 0xff00ff ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+2, faceIndex+1, faceIndex, 1, new THREE.Color( 0xff00ff ) ));
									geometry.faces.push(new THREE.Face3( faceIndex+3, faceIndex+2, faceIndex, 1, new THREE.Color( 0xff00ff ) ));
									faceIndex +=4; 
								}
								if(ac[5]){ // Back
									geometry.vertices.push(
										new THREE.Vector3((ix*10)-10,(iy*10), (iz*10) ),
										new THREE.Vector3((ix*10)-10,(iy*10)-10, (iz*10) ),
										new THREE.Vector3((ix*10),(iy*10)-10, (iz*10) ),
										new THREE.Vector3((ix*10),(iy*10), (iz*10) )
									);
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+1, faceIndex+2, 1, 0xffff00 ));
									geometry.faces.push(new THREE.Face3( faceIndex, faceIndex+2, faceIndex+3, 1, 0xffff00 ));
									geometry.faces.push(new THREE.Face3( faceIndex+2, faceIndex+1, faceIndex, 1, 0xffff00 ));
									geometry.faces.push(new THREE.Face3( faceIndex+3, faceIndex+2, faceIndex, 1, 0xffff00 ));
									faceIndex +=4; 
								}
							}
						}	
					}
				}
			}
		}
	}
	var material = new THREE.MeshLambertMaterial( { color:0xffffff, shading: THREE.FlatShading,vertexColors: THREE.VertexColors  } );
	this.mesh = new THREE.Mesh( geometry, material );
	this.mesh.position.x=this.x;
	this.mesh.position.y=this.y;
	this.mesh.position.z=this.z;
	scene.add(this.mesh);
	this.mesh.rotateOnAxis(new THREE.Vector3(((this.padding*10)+(this.size*10)/2),((this.padding*10)+(this.size*10)/2),((this.padding*10)+(this.size*10)/2)),1);

}
