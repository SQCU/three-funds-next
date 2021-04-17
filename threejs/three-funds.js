import * as THREE from './build/three.module.js';
console.log("three-funds-next");

function main()	{
	//canvas block
	const canvas = document.querySelector('#canban');
	const renderer = new THREE.WebGLRenderer({canvas});

	//camera block
	const fov = 75;
	const aspect = 2;	//fuck you fundamentals
	const near = 0.1;
	const far = 5;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 2;
	
	//scene block
	const scene = new THREE.Scene();
	
	//cube block
	const boxW = 1;
	const boxH = 1;
	const boxD = 1;
	const geom = new THREE.BoxGeometry(boxW, boxH, boxD);
	//const mate = new THREE.MeshPhongMaterial({color: 0xC7E8C1});	//phong materials are hit by lights
	//const cube = new THREE.Mesh(geom, mate);
	//scene.add(cube);
	
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
	
	cubes.forEach((cube) => {
	cube.rotation.x = time;
	cube.rotation.y = time;
	});
	
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}
	//render invocation
	requestAnimationFrame(render);
}
main();