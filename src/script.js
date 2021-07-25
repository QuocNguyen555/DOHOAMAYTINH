import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { TextureLoader } from 'three'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

import * as dat from 'dat.gui'
import Stats from 'stats.js'



/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const textureLoader = new THREE.TextureLoader()

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
var folderModel = gui.addFolder('Model')
folderModel.open()
var folderWall = gui.addFolder('Wall')
folderWall.open()
var folderLight = gui.addFolder('Light')
folderLight.open()
var folderEnvironment = gui.addFolder('Environment')
folderEnvironment.open()
var folderPostprocessing = gui.addFolder('Postprocessing')
folderPostprocessing.open()




const debugObject = {}

const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            // child.material.envMap = environmentMap
            child.material.envMapIntensity = debugObject.envMapIntensity
            // child.material.metalness = 1
            // child.material.roughness = 0
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

/**
 * Environment Map
 */
const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])
environmentMap.encoding = THREE.sRGBEncoding

const environmentMap1 = cubeTextureLoader.load([
    '/textures/environmentMaps/1/px.jpg',
    '/textures/environmentMaps/1/nx.jpg',
    '/textures/environmentMaps/1/py.jpg',
    '/textures/environmentMaps/1/ny.jpg',
    '/textures/environmentMaps/1/pz.jpg',
    '/textures/environmentMaps/1/nz.jpg'
])
environmentMap1.encoding = THREE.sRGBEncoding

const environmentMap2 = cubeTextureLoader.load([
    '/textures/environmentMaps/2/px.jpg',
    '/textures/environmentMaps/2/nx.jpg',
    '/textures/environmentMaps/2/py.jpg',
    '/textures/environmentMaps/2/ny.jpg',
    '/textures/environmentMaps/2/pz.jpg',
    '/textures/environmentMaps/2/nz.jpg'
])
environmentMap2.encoding = THREE.sRGBEncoding

const environmentMap3 = cubeTextureLoader.load([
    '/textures/environmentMaps/3/px.jpg',
    '/textures/environmentMaps/3/nx.jpg',
    '/textures/environmentMaps/3/py.jpg',
    '/textures/environmentMaps/3/ny.jpg',
    '/textures/environmentMaps/3/pz.jpg',
    '/textures/environmentMaps/3/nz.jpg'
])
environmentMap3.encoding = THREE.sRGBEncoding

const environmentMap4 = cubeTextureLoader.load([
    '/textures/environmentMaps/4/px.png',
    '/textures/environmentMaps/4/nx.png',
    '/textures/environmentMaps/4/py.png',
    '/textures/environmentMaps/4/ny.png',
    '/textures/environmentMaps/4/pz.png',
    '/textures/environmentMaps/4/nz.png'
])
environmentMap4.encoding = THREE.sRGBEncoding

const environmentMap5 = cubeTextureLoader.load([
    '/textures/environmentMaps/5/px.png',
    '/textures/environmentMaps/5/nx.png',
    '/textures/environmentMaps/5/py.png',
    '/textures/environmentMaps/5/ny.png',
    '/textures/environmentMaps/5/pz.png',
    '/textures/environmentMaps/5/nz.png'
])
environmentMap5.encoding = THREE.sRGBEncoding

const environmentMap6 = cubeTextureLoader.load([
    '/textures/environmentMaps/6/px.png',
    '/textures/environmentMaps/6/nx.png',
    '/textures/environmentMaps/6/py.png',
    '/textures/environmentMaps/6/ny.png',
    '/textures/environmentMaps/6/pz.png',
    '/textures/environmentMaps/6/nz.png'
])
environmentMap6.encoding = THREE.sRGBEncoding

scene.background = environmentMap
scene.environment = environmentMap


let params = {
    rotate: false,
    envMap: 'Street',
    color: 0xffffff
    }

folderEnvironment.add( params, 'envMap', [ 'Street', 'Field', 'Alley', 'Broadwalk', 'Orbit', 'Space', 'Ballroom', 'None' ] ).name('Environment Map')

    
debugObject.envMapIntensity = 5
folderEnvironment.add(debugObject, 'envMapIntensity').min(0).max(10).step(0.001).onChange(updateAllMaterials)


let model
/**
 * Models
 */
 gltfLoader.load(
 //   '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    // '/models/concept.gltf',
    '/models/this.glb',
    (gltf) =>
    {
        model = gltf.scene
        gltf.scene.scale.set(10, 10, 10)
        gltf.scene.position.set(0, 0, 0)
        gltf.scene.rotation.x = Math.PI * 2.5
        //gltf.scene.rotation.y = Math.PI * 1.5
       // gltf.scene.rotation.z = Math.PI * 0.2
      //  gltf.scene.rotation.y = Math.PI * 0.2

      gltf.scene.children[0].material.metalness = 1
      gltf.scene.children[0].material.roughness = 0
        scene.add(gltf.scene)


// console.log(gltf.scene.children[0].material)
        folderModel.add(gltf.scene.children[0].material, 'metalness').min(0).max(1).step(0.0001).name('metalness')
        folderModel.add(gltf.scene.children[0].material, 'roughness').min(0).max(1).step(0.0001).name('roughness')
        folderModel
            .addColor(params, 'color')
            .onChange(() =>
            {
                gltf.scene.children[0].material.color.set(params.color)
            })
            .name('color')

        folderModel.add(gltf.scene.position, 'x').min(- 20).max(20).step(0.001).name('positionX')
        folderModel.add(gltf.scene.position, 'y').min(- 20).max(20).step(0.001).name('positionY')
        folderModel.add(gltf.scene.position, 'z').min(- 20).max(20).step(0.001).name('positionZ')
        folderModel.add(gltf.scene.rotation, 'x').min(- Math.PI).max(Math.PI).step(0.001).name('rotationX')
        folderModel.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotationY')
        folderModel.add(gltf.scene.rotation, 'z').min(- Math.PI).max(Math.PI).step(0.001).name('rotationZ')

        updateAllMaterials()
    }
)

const wall = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(30, 30),
    new THREE.MeshStandardMaterial({
        color: params.color,
        metalness: 0,
        roughness: 1
        //envMap: environmentMap4
    })
)
wall.rotation.y = Math.PI
wall.position.z = 5
wall.receiveShadow = true
scene.add(wall)

folderWall.add(wall.material, 'metalness').min(0).max(1).step(0.0001).name('wallMetalness')
folderWall.add(wall.material, 'roughness').min(0).max(1).step(0.0001).name('wallRoughness')
folderWall
    .addColor(params, 'color')
    .onChange(() =>
    {
        wall.material.color.set(params.color)
    })
    .name('wallColor')


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
folderLight.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('ambientIntensity')
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.position.set(0.25, 1.5, - 2.25)
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 30
directionalLight.shadow.mapSize.set(2048, 2048)
directionalLight.shadow.normalBias = 0.05
directionalLight.shadow.radius = 7
scene.add(directionalLight)

// const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(directionalLightCameraHelper)

folderLight.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('directionalIntensity')

folderLight.add(directionalLight.shadow, 'radius').min(0).max(30).step(0.001).name('shadowBlur')
folderLight.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001).name('lightX')
folderLight.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001).name('lightY')
folderLight.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001).name('lightZ')



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Update composer
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    effectComposer.setSize(sizes.width, sizes.height)

})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, - 6)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

folderPostprocessing
    .add(renderer, 'toneMapping', {
    No: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping
    })
    .onFinishChange(() =>
    {
        renderer.toneMapping = Number(renderer.toneMapping)
        updateAllMaterials()
    })







    folderPostprocessing.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)


/**
 * Post processing
 */

// Render target

let RenderTargetClass = null
if(renderer.getPixelRatio() === 1 && renderer.capabilities.isWebGL2)
{
    RenderTargetClass = THREE.WebGLMultisampleRenderTarget
}
else
{
    RenderTargetClass = THREE.WebGLRenderTarget
}

const renderTarget = new THREE.WebGLRenderTarget(
    800,
    600,
    {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        encoding: THREE.sRGBEncoding
    }
)

// Composer
const effectComposer = new EffectComposer(renderer, renderTarget)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
effectComposer.setSize(sizes.width, sizes.height)

/**
 * Passes
 */

// Render Pass
const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

// DotScreen Pass
const dotScreenPass = new DotScreenPass()
dotScreenPass.enabled = false
effectComposer.addPass(dotScreenPass)
folderPostprocessing.add(dotScreenPass, 'enabled').name('Dot Filter')

// Glitch Pass
const glitchPass = new GlitchPass()
glitchPass.enabled = false
effectComposer.addPass(glitchPass)
folderPostprocessing.add(glitchPass, 'enabled').name('Glitch')

// Unreal Bloom Pass
const unrealBloomPass = new UnrealBloomPass()
unrealBloomPass.enabled = true
unrealBloomPass.strength = 0.1
unrealBloomPass.radius = 1
unrealBloomPass.threshold = 0.6
effectComposer.addPass(unrealBloomPass)
folderPostprocessing.add(unrealBloomPass, 'enabled').name('Bloom')
folderPostprocessing.add(unrealBloomPass, 'strength').min(0).max(2).step(0.001).name('Bloom strength')
folderPostprocessing.add(unrealBloomPass, 'radius').min(0).max(2).step(0.001).name('Bloom radius')
folderPostprocessing.add(unrealBloomPass, 'threshold').min(0).max(1).step(0.001).name('Bloom threshold')

// RGBShift Pass
const rgbShiftPass = new ShaderPass(RGBShiftShader)
rgbShiftPass.enabled = false
effectComposer.addPass(rgbShiftPass)
folderPostprocessing.add(rgbShiftPass, 'enabled').name('RGB Shift')

// Tint Pass
const TintShader = {
    uniforms:
    {
        tDiffuse: { value: null },
        uTint: { value: null }
    },
    vertexShader: `
        varying vec2 vUv;
    
        void main()
        {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            vUv = uv;
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec3 uTint;

        varying vec2 vUv;
        
        void main()
        {
            vec4 color = texture2D(tDiffuse, vUv);
            color.rgb += uTint;

            gl_FragColor = color;
        }
    
    `
}
const tintPass = new ShaderPass(TintShader)
tintPass.material.uniforms.uTint.value = new THREE.Vector3()
effectComposer.addPass(tintPass)

folderPostprocessing.add(tintPass.material.uniforms.uTint.value, 'x').min(- 1).max(1).step(0.001).name('red')
folderPostprocessing.add(tintPass.material.uniforms.uTint.value, 'y').min(- 1).max(1).step(0.001).name('green')
folderPostprocessing.add(tintPass.material.uniforms.uTint.value, 'z').min(- 1).max(1).step(0.001).name('blue')


// Displacment Pass
const DisplacementShader = {
    uniforms:
    {
        tDiffuse: { value: null },
        uTime: { value: null }
    },
    vertexShader: `
        varying vec2 vUv;
    
        void main()
        {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            vUv = uv;
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;

        varying vec2 vUv;
        
        void main()
        {
            vec2 newUv = vec2(
                vUv.x,
                vUv.y + sin(vUv.x * 10.0 + uTime) * 0.1
            );
            vec4 color = texture2D(tDiffuse, newUv);

            gl_FragColor = color;
        }
    
    `
}
const displacementPass = new ShaderPass(DisplacementShader)
displacementPass.enabled = false
displacementPass.material.uniforms.uTime.value = 0
effectComposer.addPass(displacementPass)
folderPostprocessing.add(displacementPass, 'enabled').name('Displacement')

// Glasses Pass
const GlassesShader = {
    uniforms:
    {
        tDiffuse: { value: null },
        uNormalMap: { value: null }
    },
    vertexShader: `
        varying vec2 vUv;
    
        void main()
        {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            vUv = uv;
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;
        uniform sampler2D uNormalMap;

        varying vec2 vUv;
        
        void main()
        {
            vec3 normalColor = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
            vec2 newUv = vUv + normalColor.xy * 0.1;
            vec4 color = texture2D(tDiffuse, newUv);

            // vec3 lightDirection = normalize(vec3(- 1.0, 1.0, 0.0));
            // float lightness = clamp(dot(normalColor, lightDirection), 0.0, 1.0);
            // color += lightness * 2.0;

            gl_FragColor = color;
        }
    
    `
}
const glassesPass = new ShaderPass(GlassesShader)
glassesPass.material.uniforms.uNormalMap.value = textureLoader.load('/textures/interfaceNormalMap.png')
glassesPass.enabled = false
effectComposer.addPass(glassesPass)
folderPostprocessing.add(glassesPass, 'enabled').name('Helmet')



// SMAA Pass
if(renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2)
{
const smaaPass = new SMAAPass()
smaaPass.enabled = true
effectComposer.addPass(smaaPass)
}



folderModel.add(params, 'rotate').name('Rotate')

/**
 * Animate
 */
 const clock = new THREE.Clock()

const tick = () =>
{

    stats.begin()
    
    const elapsedTime = clock.getElapsedTime()

    if ( params.rotate && model !== undefined ) {

      model.rotation.y -= elapsedTime * 0.01;

    }

    // Update passes
     displacementPass.material.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    // renderer.render(scene, camera)
    effectComposer.render()

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    switch ( params.envMap ) {
        case 'Street':
            scene.background = null;
            scene.environment = environmentMap;
            break;
        case 'Field':
            scene.background = null;
            scene.environment = environmentMap1;
            break;
        case 'Alley':
            scene.background = null;
            scene.environment = environmentMap2;
            break;
        case 'Broadwalk':
            scene.background = null;
            scene.environment = environmentMap3;
            break;
        case 'Orbit':
            scene.background = null;
            scene.environment = environmentMap4;
            break;
        case 'Space':
            scene.background = null;
            scene.environment = environmentMap5;
            break;
        case 'Ballroom':
            scene.background = null;
            scene.environment = environmentMap6;
            break;
        case 'None':
            scene.background = null;
            scene.environment = null;
            break;
}

    stats.end()
}

tick()