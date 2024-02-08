"use client"

import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export function AnimatedNumberFramerMotion({ value }) {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 3000 });
    useEffect(
        () => springValue.on("change", (latest) => {
            if (ref.current && latest.toFixed(0) <= value) {
                (ref.current as HTMLSpanElement).textContent = latest.toFixed(0);
            }
        }),
        [springValue, value]
    );

    return <span ref={ref} />;
}
