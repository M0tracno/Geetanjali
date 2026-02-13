import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';

const GlassHeart = (props) => {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.cos(t / 4) / 8 + 0.1;
            meshRef.current.rotation.y = Math.sin(t / 3) / 4;
            meshRef.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
            meshRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group {...props} dispose={null} scale={0.15}>
                <mesh ref={meshRef} position={[0, 0, 0]}>
                    {/* Heart shape created from a sphere with distortion or a custom geometry if imported */}
                    {/* For simplicity without external assets, we use a distorted sphere that looks organic */}
                    <sphereGeometry args={[10, 64, 64]} />
                    <MeshDistortMaterial
                        color="#ff6b6b"
                        envMapIntensity={1}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        metalness={0.1}
                        roughness={0.2} // Glass-like
                        distort={0.4} // Makes it beat/move organically
                        speed={2}
                    />
                </mesh>

                {/* Inner glow or core */}
                <pointLight position={[0, 0, 0]} intensity={2} color="pink" distance={15} />
            </group>
        </Float>
    );
};

export default GlassHeart;
