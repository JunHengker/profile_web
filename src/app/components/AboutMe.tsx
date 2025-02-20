"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollAnimation from "@/app/components/ScrollAnimation";
import Image from "next/image";

const AboutMe = () => {
  gsap.registerPlugin(ScrollTrigger);
  const sectionRef = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section,
      {
        opacity: 0,
        y: "35%",
      },
      {
        opacity: 1,
        y: "0%",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
          toggleActions: "play none none reverse",
        },
      }
    );

    const section2 = section2Ref.current;
    if (!section2) return;

    gsap.fromTo(
      section2,
      {
        opacity: 0,
        x: "250%",
      },
      {
        opacity: 1,
        x: "0%",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section2,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
          toggleActions: "play none none reverse",
        },
      }
    );

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="min-h-screen bg-white rounded-t-[1em] flex flex-col items-center justify-start gap-2 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full bg-gray-200 h-12 flex items-center px-4 rounded-t-[1em] shadow-md">
        <div className="flex gap-2">
          <span className="h-3 w-3 bg-red-500 rounded-full"></span>
          <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
          <span className="h-3 w-3 bg-green-500 rounded-full"></span>
        </div>
      </div>

      {/* About Me section */}
      <div ref={sectionRef} className="pt-[5em] p-8">
        <div className="mx-auto flex flex-col lg:flex-row gap-8 items-center justify-center">
          <div className="rounded-3xl shadow-2xl overflow-hidden xl:flex-[27.5%] lg:flex-[30%] flex items-center justify-center">
            <div className="items-center justify-center xl:w-full xl:h-full lg:w-full lg:h-full md:w-[25em] md:h-[25em] sm:w-[35em] sm:h-[35em]">
              <Image
                src="/imageofmesit.jpeg"
                alt="Profile picture"
                className="transition-transform duration-300 object-fill hover:scale-105"
                width={450}
                height={450}
              />
            </div>
          </div>

          <div className="rounded-3xl shadow-2xl overflow-hidden bg-white flex-[70%] flex items-center">
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Hello, nice to meet you!
              </h2>
              <p className="text-lg text-gray-600 mb-6 text-justify">
                My name is Alvin Yohanes, I’m an enthusiastic Computer
                Engineering student at UMN. I’m passionate about exploring
                diverse areas within the tech field. I enjoy working on projects
                that combine innovation, performance, and creativity, applying
                my skills to deliver efficient and impactful solutions.
              </p>
              <p className="text-lg text-gray-600 mb-8 text-justify">
                I also have a keen interest in management and business, which I
                explore through competitions focused on strategy, leadership,
                and innovation.
              </p>
              <div className="flex xl:space-x-4 lg:space-x-4 md:space-x-4 sm:space-x-2 space-x-2 xl:text-xl lg:text-lg md:text-xl sm:text-xl text-md">
                <a
                  href="mailto:alvinyoh08@gmail.com?subject=Working Email &body=Hi Alvin, I'd like to get in touch with you!"
                  className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 xl:px-[1em] lg:px-[1em] md::px-[1em] sm:px-[1em] px-[0em] pt-[1.4em] font-semibold hover:scale-90 transition-transform duration-300"
                >
                  Contact Me
                </a>
                <a
                  href="/CV-AlvinYohanes-UMN.pdf"
                  download
                  className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 px-[1em] pt-[1.4em] font-semibold hover:scale-90 transition-transform duration-300"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={section2Ref}
        className="w-full mx-auto flex flex-col lg:flex-row items-center justify-center px-8 pb-8 pt-4"
      >
        <div className="rounded-3xl shadow-2xl overflow-hidden bg-white flex-[70%] flex items-center">
          <div className="p-8 flex flex-col justify-center items-center">
            <ScrollAnimation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
