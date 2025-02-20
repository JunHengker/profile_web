"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import icebearPatch1 from "@/assets/icebearPatch1.png";
import typescript from "@/assets/typescript.svg";
import prisma from "@/assets/prisma.svg";
import next from "@/assets/next.svg";
import icebearPatch5 from "@/assets/icebearPatch5.png";

import UMN from "@/assets/UMNLogo.png";
import bunLogo from "@/assets/bunLogo.png";
import githubLogo from "@/assets/githubLogo.png";
import useSWR from "swr";
import ScrambleText from "./ScrambleText";
import ScrollDownAnim from "./ScrollDownAnim";

const fetchAssets = async (assets: string[]) => {
  const promises = assets.map(
    (asset) =>
      new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = asset;
        img.onload = () => resolve();
        img.onerror = () => reject(`Failed to load image: ${asset}`);
      })
  );
  await Promise.all(promises);
  return assets;
};

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef(Matter.Engine.create());

  const assetsPath = [icebearPatch1.src, icebearPatch5.src];

  const { data, error } = useSWR("assets", () => fetchAssets(assetsPath), {
    onSuccess: () => setIsLoaded(true),
  });

  useEffect(() => {
    if (!isLoaded || !sceneRef.current) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } =
      Matter;

    // Ensure sceneRef is not null before proceeding
    if (!sceneRef.current) return;

    // Create the engine renderer
    const render = Render.create({
      element: sceneRef.current, // Attach to the ref container
      engine: engineRef.current, // Use the engine created above

      options: {
        width: window.innerWidth,
        height: 752,
        background: "#1e1e1e", // Set background to black
        wireframes: false, // Disable wireframes for a solid look
      },
    });

    const patches = assetsPath.map((asset, index) => {
      const xPosition = Math.random() * window.innerWidth;
      const yPosition = -110;

      return Bodies.circle(xPosition, yPosition, 80, {
        restitution: 0.9,
        frictionAir: 0.01,
        render: {
          sprite: {
            texture: asset,
            xScale: 0.15,
            yScale: 0.15,
          },
        },
      });
    });

    const UMNBall = Bodies.circle(Math.random() * window.innerWidth, -110, 70, {
      restitution: 0.9,
      frictionAir: 0.01,
      render: {
        sprite: {
          texture: UMN.src,
          xScale: 0.08,
          yScale: 0.08,
        },
      },
    });

    const bunBall = Bodies.circle(Math.random() * window.innerWidth, -110, 60, {
      restitution: 0.9,
      frictionAir: 0.01,
      render: {
        sprite: {
          texture: bunLogo.src,
          xScale: 0.15,
          yScale: 0.15,
        },
      },
    });

    const githubBlock = Bodies.rectangle(
      Math.random() * window.innerWidth, // Random x position

      -110, // 60 pixels from the bottom
      200, // Full width
      70, // block tall
      {
        restitution: 0.9,
        frictionAir: 0.01,
        render: {
          sprite: {
            texture: githubLogo.src,
            xScale: 0.2,
            yScale: 0.2,
          },
        },
      }
    );

    const typescriptBlock = Bodies.rectangle(
      Math.random() * window.innerWidth,
      -110,
      58,
      58,
      {
        restitution: 0.9,
        frictionAir: 0.01,
        render: {
          sprite: {
            texture: typescript.src,

            xScale: 0.2,
            yScale: 0.2,
          },
        },
      }
    );

    const prismaBlock = Bodies.polygon(
      Math.random() * window.innerWidth,
      -110,
      3,
      48,
      {
        restitution: 0.9,
        frictionAir: 0.01,
        render: {
          sprite: {
            texture: prisma.src,
            xScale: 0.2,
            yScale: 0.2,
          },
        },
      }
    );

    const nextBall = Bodies.circle(
      Math.random() * window.innerWidth,
      -110,
      43,
      {
        restitution: 0.9,
        frictionAir: 0.01,
        render: {
          sprite: {
            texture: next.src,
            xScale: 0.2,
            yScale: 0.2,
          },
        },
      }
    );

    // Creating enclosure walls for the item
    // Create a ground
    const ground = Bodies.rectangle(
      window.innerWidth / 2, // Center the ground
      750, // 60 pixels from the bottom
      window.innerWidth, // Full width
      1, // block tall
      { isStatic: true, render: { fillStyle: "#1e1e1e" } } // Static ground
    );

    //create side walls
    const leftWall = Bodies.rectangle(0, 300, 1, 1000, {
      isStatic: true,
      render: { fillStyle: "#1e1e1e" },
    });

    const rightWall = Bodies.rectangle(window.innerWidth, 300, 1, 1000, {
      isStatic: true,
      render: { fillStyle: "#1e1e1e" },
    });

    // Add  everything to the world
    World.add(engineRef.current.world, [
      ...patches,
      UMNBall,
      bunBall,
      githubBlock,
      typescriptBlock,
      prismaBlock,
      nextBall,
      ground,
      leftWall,
      rightWall,
    ]);

    // Create and run the runner
    const runner = Runner.create();
    Runner.run(runner, engineRef.current);
    Render.run(render);

    // Set up mouse control for item draggable
    const mouseConstraint = MouseConstraint.create(engineRef.current, {
      mouse: Mouse.create(render.canvas),
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    World.add(engineRef.current.world, mouseConstraint);

    // Disable pointer events on scroll
    let scrollTimeout: NodeJS.Timeout;
    function handleScroll() {
      render.canvas.style.pointerEvents = "none";
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        render.canvas.style.pointerEvents = "auto";
      }, 200);
    }

    render.canvas.addEventListener("wheel", handleScroll);

    // Ensure the renderer looks at the correct area on window resize
    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = 750;
      Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: window.innerWidth, y: 600 },
      });
    };
    window.addEventListener("resize", handleResize);

    // bersihin matter.js
    return () => {
      Render.stop(render);
      World.clear(engineRef.current.world, true);
      Engine.clear(engineRef.current);
      render.canvas.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, assetsPath]);

  if (error) return <div>Failed to load assets</div>;

  return (
    <section className="min-h-[47em] bg-[#1e1e1e] max-w-screen overflow-hidden relative">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e] z-10">
          {/* Custom Loading Animation */}
          <div className="loader">
            <div className="spinner" />
          </div>
        </div>
      )}

      <div
        ref={sceneRef}
        className="flex items-center justify-center w-full h-full z-0"
      >
        <div className="text-center px-4 z-0 absolute items-center">
          <div className="text-white text-4xl md:text-6xl font-bold flex items-center justify-center">
            <ScrambleText
              words={["Alvin Yohanes", "Jun Hengker"]}
              customClassName="relative z-10 flex items-center text-rgb pb-4"
              pauseDuration={3000}
            />
          </div>

          <div className="text-white text-lg md:text-xl mt-4 flex items-center justify-center bg-transparent">
            <ScrambleText
              words={[
                "Computer Engineering Student",
                "Fullstack Developer",
                "System Administration",
                "Software & Hardware Enthusiast",
              ]}
              cycle={2}
              pauseDuration={3000}
              shuffleTime={20}
              customClassName="relative z-10 flex items-center text2-rgb pb-4"
            />
          </div>
          <div className="text-white text-lg md:text-xl mt-4 flex items-center justify-center">
            <ScrollDownAnim />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
