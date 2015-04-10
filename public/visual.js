var container, stats;
var camera, scene, renderer;
var cube=new Cube(20,0,0,0);
function init() {
	$("#container").css({"width":$(document).width()+"px","height":$(document).height()+"px"});
	container = document.getElementById( 'container' );
	/*camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 3500 );
		camera.position.z = 1000;
		camera.position.x = 1000;
		camera.position.y = 500;
	*/
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 3500 );
		camera.position.z = -60;
		camera.position.x = -100;
		camera.position.y = -100;
		controls = new THREE.OrbitControls( camera );
		controls.addEventListener( 'change', render );

	scene = new THREE.Scene();
		scene.add( new THREE.AmbientLight( 0xeeeeee ) );

	
	renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor( 0xffffff );
		container.appendChild( renderer.domElement );
	
	stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		container.appendChild( stats.domElement );
	cube.update();
}
function animate() {
	requestAnimationFrame( animate );
	render();
	controls.update();
	//console.log(camera.position);
	stats.update();
}
function render() {
	var bpm = 120;
	cube.render();
	renderer.render( scene, camera );
}
init();
animate();