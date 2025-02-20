"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import VanillaTilt from "vanilla-tilt";

interface EffectCardProps {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export function EffectCard({
  title,
  description,
  image,
  techStack,
  githubUrl,
  liveUrl,
}: EffectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    VanillaTilt.init(card, {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.8,
      scale: 1.05,
      perspective: 1000,
      gyroscope: true,
    });

    return () => {
      if (card) {
        // @ts-ignore - vanilla-tilt types are incomplete
        card.vanillaTilt?.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative bg-gradient-to-br from-white via-gray-100 to-white rounded-xl overflow-hidden shadow-lg xl:w-[400px] lg:w-[400px] md:w-[340px] sm:w-[300px] transform-gpu border border-white/50 group-hover:border-white/80 transition-colors"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.9) 45%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.9) 55%, transparent 60%)",
          transform: "translateZ(1px)",
          animation: "shine 1.5s infinite",
        }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",
          transform: "translateZ(2px) rotate(45deg)",
          animation: "rainbow 3s infinite linear",
        }}
      />
      {/* <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8), transparent)",
          transform: "translateZ(3px)",
          animation: "pulse 2s infinite",
        }}
      /> */}

      <div className="relative xl:h-[15em] lg:h-[15em] md:h-[13em] sm:h-[11.5em] h-[11em] overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{ transform: "translateZ(15px)" }}
        />
        <Image
          src={image}
          alt={title}
          fill
          className="group-hover:scale-110 transition-transform duration-500"
          style={{
            transform: "translateZ(20px)",
            objectFit: "cover",
          }}
        />
        <div
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm"
          style={{
            transform: "translateZ(30px)",
          }}
        >
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors transform-gpu hover:scale-110 hover:shadow-lg"
            >
              <Github className="w-6 h-6" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors transform-gpu hover:scale-110 hover:shadow-lg"
            >
              <ExternalLink className="w-6 h-6" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className="xl:p-6 lg:p-6 md:p-4 sm:p-2 p-2 relative"
        style={{
          transform: "translateZ(30px)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm" />
        <div className="relative">
          <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-gray-800 text-sm rounded-full border border-white/50 backdrop-blur-sm hover:border-white/80 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
