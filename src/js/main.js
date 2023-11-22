
//Creation elements
var scene = null,
    camera = null,
    renderer = null,
    controls = null;

const size = 20,
    divisions = 20;


function startScene() {
    // Scene, Camera, Renderer
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xE6E6FA); 
    camera = new THREE.PerspectiveCamera(
        40,                                        //Angulo de visión(Abajo o arriba) 
        window.innerWidth / window.innerHeight,    //Relación de aspecto 16:9
        0.1,                                       //Mas cerca (no renderiza)
        1000);                                    //Mas lejos ()

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('model') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //Orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
      
    //camera.position.set(13, 7, 13);
    camera.position.set(0, 4, 50 );
    const rende = new THREE.WebGLRenderer();
    rende.shadowMap.enabled = true;
    rende.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    //Se crea un punto de luz para generar sombra y luz
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 5, 4);
    light.castShadow = true; // default false
    scene.add(light);

    //Propiedades de las sombras
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default

    const lightt = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(lightt);



const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );
   
    animate();

    // Duck Model(prueba)
    loadGltf('./src/models/gltf/Duck.gltf');

   

}

//Animar la escena
function animate() {
    requestAnimationFrame(animate);
    // controls.update();
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
            gltf.scene; // THREE.Group
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

    var  archivoInput = document.getElementById('archivoInput');
    var archivoruta= archivoInput.Value;
    var extPermitidas = /(.glb|.GLB|.gltf|.GLTF)$/i;
    
    if(!extPermitidas.exec(archivoruta)){
    
        alert('Archivo no válido, por favor, solo ingrese archivo glb o gltf.');
        archivoInput.Value='';
        return false;
    
    } else{
    
        if(archivoInput.files && archivoInput.files[0]){
           
            var visor= new FileReader();
            visor.onload= function (read){
    
                document.getElementById('visordeArchivo').innerHTML = 
               '<embed src="'+read.target.result+'" width= "500" height = "500" >'; 
               loadGltf().read.target.result;
            }
             visor.readAsDataURL(archivoInput.files[0]);
        }
    }
    
    
    }