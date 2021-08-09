import * as THREE from 'three'
import {  Suspense, useMemo, useRef } from 'react' // Permet de charger les images
import { Canvas, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Reflector, Loader, useTexture } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

const Triangle = (props) => {
  const {
    paths: [path]
  } = useLoader(SVGLoader, '/triangle.svg')
  const geom = useMemo(() => SVGLoader.pointsToStroke(path.subPaths[0].getPoints(), path.userData.style), [])
  return (
    <mesh geometry={geom} doubleSided {...props}>
      <meshBasicMaterial color="white" toneMapped={false} />
    </mesh>
  )
}
const Rig = ({ children }) => {
  const ref = useRef()
  const vec = new THREE.Vector3()
  const { camera, mouse } = useThree()
  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, 0, 3.5), 0.05)
    ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1)
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 20, 0.1)
  })
  return <group ref={ref}>{children}</group>
}
const Ground = (props) => {
  const [floor, normal] = useTexture(['/textures/floor_roughness.jpeg', '/textures/floor_normal.jpeg'])
  return (
    <Reflector
      resolution={1024}
      args={[20, 20]}
      {...props}
      debug={0}
      distortion={0.075}
      distortionMap={floor}
    >
      {(Material, props) => <Material color="#c0c0c0" metalness={0} roughnessMap={floor} roughness={0.65} normalMap={normal} normalScale={[0.6, 0.6]} {...props} />}
    </Reflector>
  )
}

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0}/>
      <directionalLight castShadow intensity={0.15} position={[0,2,-1]}/>
      <Rig >
        <Triangle scale={[0.01, 0.01, 0.01]} position={[0.8, -2, 0]} rotation={[0, 0, Math.PI / 3]} />
        <Ground
          mirror={1}
          blur={[400, 120]}
          mixBlur={10}
          mixStrength={5}
          rotation={[-Math.PI*0.5, 0, Math.PI*0.5]}
          position={[0, -0.8, 0]}
        />
      </Rig >
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  )
}

const ThreeRender=()=> {
  return(
    <Canvas shadows>
      <color attach="background" args={['black']} />
      <fog attach="fog" args={['black', 10, 20]} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}

export default ThreeRender
