import * as THREE from 'three'
import React, { useRef, Suspense, useMemo } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { Reflector, CameraShake, OrbitControls, useTexture } from '@react-three/drei'
import { KernelSize } from 'postprocessing'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

const Triangle=(props) => {
  const {
    paths: [path]
  } = useLoader(SVGLoader, '/triangle.svg')
  const geom = useMemo(() => SVGLoader.pointsToStroke(path.subPaths[0].getPoints(), path.userData.style), [])
  return (
    <mesh geometry={geom} {...props}>
      <meshBasicMaterial color="white" toneMapped={false} />
    </mesh>
  )
}

const Rig = ({ children }) => {
  const ref = useRef()
  const vec = new THREE.Vector3()
  const { camera, mouse } = useThree()
  const cameraConfig = {
    yawFrequency: 0.8,
    pitchFrequency: 0.8,
    rollFrequency: 0.8
  }
  <CameraShake {...cameraConfig}/>

  useFrame((_) => {
    camera.position.lerp(vec.set(0, 0, 7), 0.1)
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (mouse.x * Math.PI) / 5, 0.1)
  })
  return <group ref={ref}>{children}</group>
}

const Ground = (props) => {
  console.log(props);
  // const floor = useLoader(TextureLoader, '/textures/floor_roughness.jpeg');
  // const normal = useLoader(TextureLoader, '/textures/floor_nomal.jpeg');
  const [floor, normal] = useTexture(['/textures/floor_roughness.jpeg', '/textures/floor_nomal.jpeg'])
  return (
    <Reflector
        resolution={1024}
        args={[20, 20]}
        mirror={1}
        blur={[400, 400]}
        mixBlur={1}
        mixStrength={0.2}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.8, 0]}
      />
  )
}
const ThreeRender = () => {
  return(
    <Canvas concurrent pixelRatio={[1, 2]} camera={{ position: [0, 0, 100] }}>
      <color attach="background" args={['black']} />
      <fog attach="fog" args={['black', 10, 20]} />
      <ambientLight />
      <OrbitControls />
      <Suspense fallback={null}>
        <Rig>
          <Triangle scale={[0.01, 0.01, 0.01]} position={[0.8, -2, 0]} rotation={[0, 0, Math.PI / 3]} />
        </Rig>
        <Reflector
          resolution={1024}
          args={[20, 20]}
          mirror={1}
          blur={[400, 400]}
          mixBlur={1}
          mixStrength={0.2}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.8, 0]}
        />
        <EffectComposer>
          <Bloom kernelSize={KernelSize.HUGE} luminanceSmoothing={0.4} intensity={0.3} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}

export default ThreeRender
