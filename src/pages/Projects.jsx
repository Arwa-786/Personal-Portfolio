import { Link } from "react-router-dom";
import React from "react";
import Sketch from "react-p5";

// This component holds your cherry blossom animation logic
const CherryBlossomSketch = () => {
  let petals = [];

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noStroke();
  };

  const draw = (p5) => {
    p5.clear();
    let t = p5.frameCount / 200;

    if (p5.frameCount % 5 === 0) {
      petals.push(new Petal(p5));
    }

    for (let i = petals.length - 1; i >= 0; i--) {
      petals[i].update(t);
      petals[i].display();
      if (petals[i].isOffscreen()) {
        petals.splice(i, 1);
      }
    }
  };
  
  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  class Petal {
    constructor(p5) {
      this.p5 = p5;
      this.posX = p5.random(0, p5.width);
      this.posY = p5.random(-50, -10);
      this.initialangle = p5.random(0, 2 * p5.PI);
      this.size = p5.random(5, 12);
      this.fillColor = p5.color(255, 230, 243, p5.random(150, 255));
    }

    update(time) {
      let w = 0.6;
      let angle = w * time + this.initialangle;
      this.posX += this.p5.sin(angle) * 0.3;
      this.posY += this.p5.pow(this.size, 0.5) * 0.4;
    }

    display() {
      this.p5.fill(this.fillColor);
      this.p5.ellipse(this.posX, this.posY, this.size);
    }
    
    isOffscreen() {
        return (this.posY > this.p5.height || this.posX < -10 || this.posX > this.p5.width + 10);
    }
  }

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};


// Your main Projects component
export const Projects = () => {
  const projects = [
    {
      title: "VR Conversational AI Agent",
      description: "A multimodal AI agent in Unity for real-time, human-like dialogue in VR. Features a low-latency pipeline (ASR→LLM→TTS) and gesture recognition with over 90% accuracy.",
      tech: ["Unity", "Python", "C#", "LLMs", "VLMs", "HuggingFace"],
      github: "https://github.com/maslychm/avatar_llm_unity",
      imageUrl: "./vr.png"
    },
    {
      title: "LinguaLens (HackHarvard 2025)",
      description: "An immersive language tutor for Apple Vision Pro. Transforms the user's physical environment into dynamic, AI-generated verbal quizzes using the Gemini API.",
      tech: ["VisionOS", "Swift", "Python", "FastAPI", "Gemini API"],
      github: "https://github.com/RupErz/WordQuest",
      imageUrl: "./lingua.png"
    },
    {
      title: "C Code Memory Visualizer",
      description: "An AI-powered tutor that analyzes C code and generates dynamic memory diagrams to explain complex pointer relationships. Used as a teaching aid for 50+ students.",
      tech: ["React", "Node.js", "Express", "Gemini API", "Monaco Editor"],
      github: "https://github.com/Arwa-786/C-Code-Visualizer",
      imageUrl: "./visu.png"
    },
    {
      title: "VISION (KnightHacks 2024)",
      description: "Honorable Mention winner. A hands-free UI engineered with real-time eye-tracking via OpenCV and over 10 voice commands for accessible control.",
      tech: ["Python", "OpenCV", "Pygame", "Speech Recognition"],
      github: "https://github.com/pranavsaigandikota/Vision",
      imageUrl: "./vision.png"
    },
    {
      title: "Pokemon Memory Card Game",
      description: "A classic memory card game built with vanilla JavaScript, featuring card shuffling, matching logic, and a responsive, intuitive gameplay interface.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/Arwa-786/Pokemon-Memory-Card-Game",
      imageUrl: "./poke.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF5E1] py-12 px-4 relative overflow-hidden">
      
      {/* Animated Petal Background */}
      <div className="absolute inset-0 z-0">
        <CherryBlossomSketch />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 pt-16">
          <h1 className="text-5xl md:text-6xl font-bold text-[#36454F] mb-4">Projects</h1>
          <p className="text-xl text-[#55828B]">A showcase of my development journey</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col"
            >
              <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#36454F] mb-3">{project.title}</h3>
                <p className="text-[#36454F] mb-4 leading-relaxed text-sm flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gradient-to-r from-[#55828B]/20 to-[#C5528B]/20 text-[#55828B] rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#327048] hover:bg-[#327048]/90 text-white py-2 px-3 rounded-lg text-center transition-all duration-200 text-sm font-medium flex items-center justify-center"
                  >
                    <i className="fab fa-github mr-2"></i> 
                    View the code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};