"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function GridPoints() {
    const ref = useRef<THREE.Points>(null!);

    // Create a grid of points
    const [positions, setPositions] = useMemo(() => {
        const count = 2000;
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Create a horizontal grid with some noise
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 5 - 2; // Flat-ish plane
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return [pos, count];
    }, []);

    const mouse = useRef(new THREE.Vector2(0, 0));

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.y = t * 0.05;

        // Update mouse position
        mouse.current.x = (state.mouse.x * state.viewport.width) / 2;
        mouse.current.y = (state.mouse.y * -state.viewport.height) / 2; // Invert Y

        // Wave + Magnetic effect
        const array = ref.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i++) {
            const x = array[i * 3];
            const z = array[i * 3 + 2];

            // Base Wave
            const wave = Math.sin(x * 0.5 + t) * Math.cos(z * 0.5 + t) * 0.5 - 2;

            // Distance to mouse (X-Z plane approximation since camera is tilted)
            const dx = x - mouse.current.x;
            const dz = z - (mouse.current.y * 2 + 5); // Offset to align with tilted camera
            const dist = Math.sqrt(dx * dx + dz * dz);
            const attraction = Math.exp(-dist * 0.5) * 1.5;

            array[i * 3 + 1] = wave + attraction;
        }
        ref.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#00E5FF"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

export const GridBackground = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
                <color attach="background" args={["#05070A"]} />
                <ambientLight intensity={0.5} />
                <GridPoints />
            </Canvas>
        </div>
    );
};
