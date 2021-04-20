import * as THREE from './build/three.module.js';
console.log("three-funds-next");
//todo 4/20: write a color picker, write an object manager.

function main()	{
	//canvas block
	const canvas = document.querySelector('#canban');
	const renderer = new THREE.WebGLRenderer({canvas});

	//camera block
	const fov = 75;
	const aspect = 2;	//fuck you fundamentals
	const near = 0.1;
	const far = 1000;	//v v far away
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 24;	// from ~5
	
	//scene block
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0xAAAABB);
	
	//cube block
	const boxW = 1;
	const boxH = 1;
	const boxD = 1;
	const geom = new THREE.BoxGeometry(boxW, boxH, boxD);

	
	function cuber(geometry, color, x){
		const material = new THREE.MeshPhongMaterial({color});
		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);
		
		cube.position.x = x;
		return cube;//here's your cube good sir
	}
	
	const cubes =[
	cuber(geom, 0xC7E8C1, -2),
	cuber(geom, 0xE8C7C1, 0),
	cuber(geom, 0xC1C7E8, 2)
	];
	
	//let's add some circle sections!
	const cradius = .5;
	const csegments = 9;
	const cthetastart = Math.PI*4/9;
	const cthetalength = Math.PI*2/9;
	const cgeometry = new THREE.CircleGeometry(
    cradius, csegments, cthetastart, cthetalength);
	
	function circler(geometry, color, x, y){	//deprecated by mattescrambler addsolidgomm addobject
		const material = new THREE.MeshPhongMaterial({side: THREE.DoubleSide, color});	//oops we need side:DoubleSide lol
		const circ = new THREE.Mesh(geometry, material);
		scene.add(circ);
		
		circ.position.x = x;
		circ.position.y = y;
		return circ;//here's your ARC good sir
	}
	const circs = [
	circler (cgeometry, 0xE8E8C1, -2, 1.2),
	circler (cgeometry, 0xC1E8E8, 0, 1.2),
	circler (cgeometry, 0xE8C1E8, 2, 1.2),
	];
	
	const objectsman = [];	//this is where all of our geometry from addsolidgom gets dumped
	const dispersion = 15;
	
	function addobject (x, y, obj) {
		obj.position.x = x*dispersion;
		obj.position.y = y*dispersion;
		
		scene.add(obj);
		objectsman.push(obj);
	}
	
	function mattescrambler() {	//gens a phongmaterial, sets its 'side' (?), makes a HSL color, applies the color, returns the material
		const material = new THREE.MeshPhongMaterial({
			side: THREE.DoubleSide,	//lowers performance for solid objects, only use /w exposed inner faces
		});
		
		const hue = Math.random();
		const saturation = .88;
		const luminance = .6;
		material.color.setHSL(hue, saturation, luminance);
		
		return material;
	}
	
	function addsolidgomm(x, y, geometry)	{	//supply your own geometry to this argument!
		const mesh = new THREE.Mesh(geometry, mattescrambler());
		addobject(x, y, mesh);
	}
	
	{	//generic calling structure for our new functions!
		const width = 2;	//in this example lets use our boxer code
		const height = 2; 
		const depth = 2; 
		for (let iterator = 0; iterator < 12; iterator++)	{
			//x = [-1,1]/iterator?
			//y = sin(x) lOLE!@
			let x = 2*(iterator/12)-1;
			let y = Math.sin(Math.PI*x);
			addsolidgomm(x, y, new THREE.BoxGeometry(width, height, depth));
		}
	}
	
	{	//chunker!
		const radius = 1;
		const segments = 9;
		const thetastart = Math.PI*4/9;
		const thetalength = Math.PI*2/9;
		const count = objectsman.length
		for (let iterator = 0; iterator < count; iterator++){
			let x = 2*(iterator/12)-1;
			let y = Math.sin(Math.PI*x)+.2;
			
			addsolidgomm(x, y, new THREE.CircleGeometry(radius, segments, thetastart, thetalength));
		}
		
	}
	
	const licolor = 0xFFFFFF;
	const liintensity = 1;
	const light = new THREE.DirectionalLight(licolor, liintensity);
	light.position.set(-1,2,5);	//lights default to a target of 0,0,0; moving its position preserves its target
	scene.add(light);
	
function render(time) {
	time *= 0.001;
	
	//checks if canvas size has changed; if so, update and pass true
	function resizerchecker(renderer) { //returns true if the canvas was resizered
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needresize = canvas.width !== width || canvas.height !== height;
	if (needresize) {
	renderer.setSize(width, height, false);	//sets internal resolution
	}
	return needresize;
	}	
	if(resizerchecker(renderer)){
	//allows for canvas resizey
	const canvas = renderer.domElement;
	camera.aspect = canvas.clientWidth / canvas.clientHeight;
	camera.updateProjectionMatrix();
	}
	
	//deprecated, please remove
	cubes.forEach((cube) => {
	cube.rotation.x = time;
	cube.rotation.y = time;
	});
	//deprecated, please remove
	circs.forEach((circ) => {
	circ.rotation.y = time*7/4;
	});
	
	objectsman.forEach((obj) => {
		obj.rotation.x = time;
		obj.rotation.y = time;
	});
	
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}
	//render invocation
	requestAnimationFrame(render);
}
main();