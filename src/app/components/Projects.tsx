"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { EffectCard } from "./EffectCard";

const projects = [
  {
    title: "Sensorice",
    description:
      "SensoRice is an innovative project aimed at modernizing agricultural practices by integrating advanced sensor technology and automation. The system addresses key challenges in farming, including inefficient water usage, floods, pest control, and the reliance on constant manual monitoring.",
    image: "/sensorice.png",
    techStack: [
      "C++",
      "Bun",
      "Prisma",
      "Express",
      "Vite",
      "React",
      "Typescript",
    ],
    githubUrl: "https://github.com/JunHengker/SENSORICE",
    liveUrl: "https://sensorice.onlyjun.xyz/",
  },
  {
    title: "SVSTAIN",
    description:
      "SVSTAIN Cloth is a start-up fashion brand focused on sustainability. SVSTAIN Cloth offers high-quality fashion products that are inherently sustainable, featuring a unique concept of PATCHES",
    image: "/svstain.png",
    techStack: [
      "System Administration",
      "Bun",
      "Prisma",
      "Express",
      "Vite",
      "React",
      "Typescript",
    ],
    githubUrl: "https://https://github.com/JunHengker",
    liveUrl: "https://svstain.com",
  },
  {
    title: "UMN CE Official Website",
    description:
      "The official website of the Computer Engineering Program at Universitas Multimedia Nusantara serves as a key resource for showcasing information about the program. ",
    image: "/tekom.png",
    techStack: ["React", "Vite", "Chakra UI", "Typescript", "Front-end Dev"],
    githubUrl: "https://https://github.com/Web-TK-UMN",
    liveUrl: "https://tk.umn.ac.id/",
  },
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [visibleProjects, setVisibleProjects] = useState(3);

  useEffect(() => {
    const updateVisibleProjects = () => {
      if (window.innerWidth <= 768) {
        setVisibleProjects(2);
      } else {
        setVisibleProjects(3);
      }
    };

    updateVisibleProjects();
    window.addEventListener("resize", updateVisibleProjects);
    return () => window.removeEventListener("resize", updateVisibleProjects);
  }, []);

  useEffect(() => {
    const sections = gsap.utils.toArray(".section") as HTMLElement[];

    if (sections.length > 1) {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: `+=${sections.length * 1860}`,
        },
        // 1860
      });
    }

    // Card Animations
    gsap.fromTo(
      cardsRef.current?.children || [],
      {
        opacity: 0,
        y: 70,
        rotateX: -15,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Cleanup Function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative overflow-hidden xl:h-[266vh] lg:h-[270vh] md:h-[270vh] sm:h-[270vh] h-[270vh]">
      {/* Horizontal Scroll Sections */}
      <div ref={containerRef} className="flex">
        <div className="section h-screen w-screen flex">
          <div className="z-1 absolute w-full h-full flex items-center justify-center bg-white">
            <h2 className="xl:text-[8em] xl:pt-[4em] lg:text-[4em] lg:pt-[4.6em] md:text-[4em] md:pt-[5em] sm:text-[3.5em] sm:pt-[3em] text-[2.5em] pt-6 font-bold xl:mb-12 lg:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Featured Projects
            </h2>
          </div>
          <div className="z-2 section h-screen  w-screen px-8 xl:py-16 lg:py-4 md:py-12">
            <div className="max-w-7xl mx-auto items-center justify-center">
              <div
                ref={cardsRef}
                className="flex flex-wrap xl:gap-8 lg:gap-8 md:gap-6 sm:gap-4 gap-3 justify-center"
              >
                {projects.slice(0, visibleProjects).map((project, index) => (
                  <EffectCard key={index} {...project} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="section h-screen w-[200em]">
          <div className="section h-screen w-screen flex items-center justify-end bg-[#1e1e1e] xl:pl-8 xl:pr-8 lg:pl-8 md:pl-8 sm:pl-8 pl-8 pr-3">
            <div className="z-4 max-w-4xl w-full bg-[#2a2a2a] rounded-2xl shadow-xl p-10 text-white">
              <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Get in Touch
              </h2>
              <p className="text-gray-400 text-center mt-2">
                Have a question or want to work together? Drop me a message
                below.
              </p>

              <form className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 rounded-lg bg-[#333] text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded-lg bg-[#333] text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-3 rounded-lg bg-[#333] text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:scale-95 transition-transform duration-300"
                >
                  Send Message
                </button>
              </form>

              <div className="flex justify-center gap-6 mt-6 text-gray-400">
                <a
                  href="https://github.com/JunHengker/"
                  target="_blank"
                  className="hover:text-white"
                >
                  🔗 GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/alvinyohanes/"
                  target="_blank"
                  className="hover:text-white"
                >
                  🔗 LinkedIn
                </a>
                <a
                  href="mailto:alvinyoh08@gmail.com"
                  className="hover:text-white"
                >
                  📧 Email
                </a>
              </div>
            </div>
            <footer className="text-white py-4 absolute bottom-0">
              <div className="container mx-auto px-4">
                <p className="text-sm">
                  &copy; 2025 Alvin Yohanes. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
