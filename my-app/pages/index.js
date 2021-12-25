import Head from 'next/head'
import Image from 'next/image'
import * as THREE from 'three'
import styles from '../styles/Home.module.css'
import React, {useEffect, useRef, useState} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'

function Box(props) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      for (let i = 0; i < props.instances; i++) {
        ref.current.setMatrixAt(i, new THREE.Matrix4());
      }
      ;
      ref.current.instanceMatrix.needsUpdate = true;
    }
  }, [ref, props.instances]);
  return (
      <instancedMesh
          {...props}
          args={[null, null, props.instances]}
          ref={ref}
          onPointerOver={(event) => console.log(`Hello ${props.instances}`)}
          onPointerOut={(event) => console.log(`world ${props.instances}`)}>
        <boxGeometry args={[1, 1, 1]}/>
        <meshStandardMaterial color={'orange'}/>
      </instancedMesh>
  )
}

export default function Home() {
  const [show, setShow] = useState(true);
  const [instances, setInstances] = useState(100);
  return (
      <div className={styles.container}>
        <button onClick={(e) => setShow(!show)}> Toggle show</button>
        <button onClick={(e) => setInstances(
            instances - 1)}> Decrement: {instances} - 1
        </button>
        <Canvas>
          <ambientLight/>
          <pointLight position={[10, 10, 10]}/>
          {show ?
              <Box instances={instances} position={[-1.2, 0, 0]}/>
              : <></>}
        </Canvas>
      </div>
  )
}
