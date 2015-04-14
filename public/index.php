<html>
	<head>
		<title>The Sound Cube</title>
		<style>
			*{
				padding:0px;
				margin:0px;
			}
		</style>
	</head>
	<body>
		<div id="container"></div>
		<div style="position:absolute;left:100%;margin-left:-200px;top:0px;width:200px;height:120px;background:#ff0;">
			<a href="javascript: cube.rotate();">test</a><br/><br/>
			<span id="cubedata"></span>
		</div>
		<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js"></script>
		<script src="http://threejs.org/examples/js/controls/OrbitControls.js"></script>
		<script src="/cube.js"></script>

		<script src="/stats.js"></script>
		<script src="http://threejs.org/examples/js/modifiers/SubdivisionModifier.js"></script>
		<script src="/visual.js"></script>
		<script>
			var bpm = 125;
			var bps = bpm/60;
			cube.settings.onFinish=function(c){
				console.log(c.startTime);
				var timeToRotation =  Math.round((new Date()).getTime()) - c.startTime;
				var leftToWait = 1000/bps-timeToRotation;
				if(leftToWait<0){
					console.log("rotation time too long!");
				}
				setTimeout(function(){
					var startTime = Math.round((new Date()).getTime());
					console.log(startTime);
					c.rotate(startTime);
				},leftToWait);
			}
			cube.settings.onInit=function(c){
				var startTime =Math.round((new Date()).getTime());
				console.log("start: "+startTime);
				//cube.rotate(startTime);
			};
			init();
			animate();
		</script>
	</body>
</html>
