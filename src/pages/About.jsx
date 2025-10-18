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


// Your main About component
export const About = () => {
  return (
    <div className="min-h-screen bg-[#FFF5E1] py-12 px-4 relative overflow-hidden">
      
      {/* Animated Petal Background */}
      <div className="absolute inset-0 z-0">
        <CherryBlossomSketch />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 pt-16">
          <h1 className="text-5xl md:text-6xl font-bold text-[#36454F] mb-4">About Me</h1>
          <p className="text-xl text-[#327048]">The person behind the code and creations</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Profile Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#36454F] mb-4">Arwa Ali</h2>
              <p className="text-xl text-[#327048] mb-6">Computer Science Student & Researcher</p>
            </div>

            {/* Story Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-[#36454F] mb-6">My Journey</h3>
              <div className="text-[#36454F] leading-relaxed space-y-4 text-lg">
                <p>
                  As a Computer Science student at UCF, I'm driven by a fascination with the intersection of Artificial Intelligence and human-computer interaction. My goal isn't just to write code, but to build intelligent systems that are intuitive, impactful, and solve real-world challenges.
                </p>
                <p>
                  This passion leads me to explore multiple frontiers simultaneously. In the lab, I'm architecting the brains of conversational AI agents for Virtual Reality. At hackathons, I'm building award-winning applications for emerging platforms like the Apple Vision Pro. This balance of methodical research and rapid, creative development is where I thrive.
                </p>
                <p>
                  Beyond the compiler, my world revolves around community and mentorship. Whether I'm guiding dozens of students through tough data structures concepts as an SI Leader or engaging in campus life, I believe in the power of collaboration and lifting others up. For me, technology is a tool, but community is the purpose. (Go Knights!)
                </p>
              </div>
            </div>

            {/* Values & Interests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-[#55828B]/10 to-[#C5528B]/10 rounded-xl p-6">
                <h4 className="text-xl font-bold text-[#36454F] mb-4">My Values</h4>
                <ul className="space-y-2 text-[#36454F] font-medium">
                  <li><span className="font-bold text-[#C5528B]">A</span> - Adaptable</li>
                  <li><span className="font-bold text-[#C5528B]">R</span> - Resourceful</li>
                  <li><span className="font-bold text-[#C5528B]">W</span> - Wholehearted</li>
                  <li><span className="font-bold text-[#C5528B]">A</span> - Analytical</li>
                  <li className="pt-2"><span className="font-bold text-[#55828B]">A</span> - Authentic</li>
                  <li><span className="font-bold text-[#55828B]">L</span> - Lifelong Learner</li>
                  <li><span className="font-bold text-[#55828B]">I</span> - Innovative</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-[#C5528B]/10 to-[#55828B]/10 rounded-xl p-6">
                <h4 className="text-xl font-bold text-[#36454F] mb-4">Interests</h4>
                <ul className="space-y-2 text-[#36454F]">
                  <li>• Applied AI & LLM Integration</li>
                  <li>• Virtual & Augmented Reality</li>
                  <li>• Systems Programming & Memory Visualization</li>
                  <li>• Full-Stack Application Architecture</li>
                  <li>• Mentoring & Technical Education</li>
                </ul>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="bg-gradient-to-br from-[#55828B]/5 to-[#C5528B]/5 rounded-xl p-6">
              <h4 className="text-xl font-bold text-[#36454F] mb-4">A Little More About Me</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#36454F]">
                <div>• Big Spider-Man fan 🕸️</div>
                <div>• Love trying (and cooking) new cuisines</div>
                <div>• Can be found playing any racquet sport</div>
                <div>• Unofficial ambassador for Indomie noodles</div>
                <div>• Enjoy taking photos and drawing flowers</div>
                <div>• I'm a huge animal lover, especially cats</div>
                <div>• I can't swallow pills to save my life</div>
                <div>• My prized possession is a working miniature Rubik's cube</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};