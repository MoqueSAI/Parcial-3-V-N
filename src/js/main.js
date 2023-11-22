
//Creation elements
var scene = null,
    camera = null,
    renderer = null,
    controls = null,
    nameGltfGet= null;

const size = 20,
    divisions = 20;


function startScene() {
    // Scene, Camera, Renderer
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x7B5989); 
    camera = new THREE.PerspectiveCamera(
        75,                                        //Angulo de visión(Abajo o arriba) 
        window.innerWidth / window.innerHeight,    //Relación de aspecto 16:9
        0.1,                                       //Mas cerca (no renderiza)
        1000);                                    //Mas lejos ()

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('model') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //Orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
      
    //camera.position.set(13, 7, 13);
    camera.position.set(20, 10, 20); // Ajusta la posición de la cámara
    camera.lookAt(new THREE.Vector3(20, 10, 20)); // Ajusta el punto al que la cámara está mirando
    const rende = new THREE.WebGLRenderer();
    rende.shadowMap.enabled = true;
    rende.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(5, 10, 5); // Ajusta la posición de la luz direccional
    scene.add(directionalLight);

    const lightt = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(lightt);

    //Se crea un punto de luz para generar sombra y luz
    const light = new THREE.PointLight(0xffffff, 1, 100);
     light.position.set(10, 20, 10); // Ajusta la posición de la luz puntual
     light.castShadow = true; // Habilita la generación de sombras
     scene.add(light);


    //Propiedades de las sombras

    renderer.shadowMap.enabled = true;
    

    light.shadow.camera.near = 0.1; // Ajusta la distancia cercana de la cámara de sombras
    light.shadow.camera.far = 100; // Ajusta la distancia lejana de la cámara de sombras

    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;

   


const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );
   
    animate();
}

//Animar la escena
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);

  
}

// Función para minimizar o maximizar ventana
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


//Cargar el archivo Gltf
function loadGltf(nameGltfGet) { 
   

    // Instantiate a loader
    const loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        nameGltfGet,
        // called when the resource is loaded
        function (gltf) {

            scene.add(gltf.scene);

            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene.position.set(0,1,0); // THREE.Group
            gltf.scene.scale.set(10,10,10);
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object

            gltf.scene.position.set(0, 0.5, 2);

        },
        // called while loading is progressing
        function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened');

        }
    );
}

function validarExt(){

    var archivoInput = document.getElementById('archivoInput');
    var archivoRuta = archivoInput.value;
    var extA= /(.gltf|.GLTF|.glb|.GLB|)$/i;

    if(!extA.exec(archivoRuta)){
        alert('Archivo inválido, por favor, introduzca un archivo glb')
        archivoInput.value='';
        return false;
    }else{
    if (archivoInput.files && archivoInput.files[0]) {
        var visor = new FileReader();
        visor.onload = function (arc) {
            document.getElementById('visorArc').innerHTML = '<embed src="' + arc.target.result + '"width= "0" height= "0">';
            nameGltfGet= arc.target.result;

            loadGltf(nameGltfGet);
            
        };
        visor.readAsDataURL(archivoInput.files[0]);
        URL.createObjectURL(archivoInput.files[0]);
       
    }
    }    
}
