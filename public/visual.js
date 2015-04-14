var container, stats;
var camera, scene, renderer;
var cube=new Cube(5,5,5,5);
function buildAxis( src, dst, colorHex, dashed ) {
        var geom = new THREE.Geometry(),
            mat; 

        if(dashed) {
                mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
        } else {
                mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
        }

        geom.vertices.push( src.clone() );
        geom.vertices.push( dst.clone() );
        geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

        var axis = new THREE.Line( geom, mat, THREE.LinePieces );

        return axis;

}
function buildaxes(length) {
        var axes = new THREE.Object3D();
        axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
        axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
        axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
        axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
        axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
        axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z
        return axes;
}
function init() {
	$("#container").css({"width":$(document).width()+"px","height":$(document).height()+"px"});
	container = document.getElementById( 'container' );
	/*camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 3500 );
		camera.position.z = 1000;
		camera.position.x = 1000;
		camera.position.y = 500;
	*/
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 100500 );
		camera.position.z = 100;
		camera.position.x = -500;
		camera.position.y = 100;
		controls = new THREE.OrbitControls( camera );
		controls.addEventListener( 'change', render );

	scene = new THREE.Scene();
		scene.add( new THREE.AmbientLight( 0xeeeeee ) );

	
	renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor( 0x000000 );
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;
		renderer.shadowMapBias = 0.0039;
		renderer.shadowMapDarkness = 0.8;
		renderer.shadowMapWidth = 1024;
		renderer.shadowMapHeight = 1024;
		container.appendChild( renderer.domElement );
		var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
		directionalLight.position.set( 20, 20, 20 );
		directionalLight.rotation.set(Math.PI,Math.PI,Math.PI)
		directionalLight.castShadow = true;
		scene.add( directionalLight );

	stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		container.appendChild( stats.domElement );
	cube.update();
	//axes = buildaxes(1000);
	//scene.add(axes);
}
function animate() {
	requestAnimationFrame( animate );
	render();
	controls.update();
	//console.log(camera.position);
	//console.log(camera.rotation);
	stats.update();
}
function render() {
	var bpm = 120;
	cube.render();
	renderer.render( scene, camera );
}
