function Cube(size,x,y,z){
	this.size=size;
	this.angle=0;
	this.padding = 100; 
	this.voxel = new Array();
	for(var ix = 0;ix < size;ix++){
		if(!this.voxel[ix])
			this.voxel[ix]=new Array();
		for(var iy = 0;iy < size;iy++){
			if(!this.voxel[ix][iy])
				this.voxel[ix][iy]=new Array();
			for(var iz = 0;iz < size;iz++){
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
	console.log(this.voxel);
}

function CubeRotate(){
	
}

function CubeRender(){
	
}

function CubeUpdate(){

}
