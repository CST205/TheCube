var container, stats;
var camera, scene, renderer;
var cube=new Cube(20,0,0,0);
function init() {
	$("#container").css({"width":$(document).width()+"px","height":$(document).height()+"px"});
	container = document.getElementById( 'container' );
	camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 3500 );
		camera.position.z = 2750;

	scene = new THREE.Scene();
		scene.add( new THREE.AmbientLight( 0x444444 ) );

	var light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
		light1.position.set( 1, 1, 1 );
		scene.add( light1 );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( renderer.domElement );

	stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		container.appendChild( stats.domElement );
}
function animate() {
	requestAnimationFrame( animate );
	render();
	stats.update();
}
function render() {
	var bpm = 120;
	cube.render();
	renderer.render( scene, camera );
}
init();
animate();