"use client";

import Image from "next/image";
import { FC } from "react";
import docker from "@/assets/docker.svg";
import bunLogo from "@/assets/BunLogo.png";
import nodejs from "@/assets/nodejs.svg";
import prisma from "@/assets/prisma.svg";
import typescript from "@/assets/typescript.svg";
import react from "@/assets/reactjs.svg";
import next from "@/assets/nextjs.svg";
import gsap from "@/assets/gsap.svg";
import laravel from "@/assets/laravel.svg";
import jupyter from "@/assets/jupyter.svg";
import python from "@/assets/python.svg";
import vercel from "@/assets/vercel.svg";
import vite from "@/assets/vite.svg";
import java from "@/assets/java.svg";
import cCode from "@/assets/c-original.svg";
import github from "@/assets/github.svg";

const techLogo = [
  { name: "Docker", img: docker },
  { name: "Bun", img: bunLogo },
  { name: "Node", img: nodejs },
  { name: "Prisma", img: prisma },
  { name: "Typescript", img: typescript },
  { name: "Vite", img: vite },
  { name: "Vercel", img: vercel },
  { name: "React", img: react },
  { name: "Next", img: next },
  { name: "GSAP", img: gsap },
  { name: "Laravel", img: laravel },
  { name: "Jupyter", img: jupyter },
  { name: "Python", img: python },
  { name: "Java", img: java },
  { name: "C", img: cCode },
  { name: "Github", img: github },
];

const ScrollAnimation: FC = () => {
  return (
    <div className="relative xl:w-full lg:w-full md:w-full sm:w-full w-[18.5em]">
      {/* Scrolling Container */}
      <div className="flex space-x-8 w-full animate-scroll">
        {[...techLogo, ...techLogo].map((tech, index) => (
          <Image
            key={index}
            src={tech.img}
            alt={tech.name}
            width={128}
            height={128}
            className="xl:w-24 xl:h-24 lg:w-21 lg:h-21 md:w-16 md:h-16 sm:w-14 sm:h-14 w-12 h-12"
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollAnimation;
