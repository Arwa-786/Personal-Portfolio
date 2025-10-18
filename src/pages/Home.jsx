import { Link } from "react-router-dom";
import React from "react";
import Sketch from "react-p5";

// This component holds the corrected cherry blossom animation logic
const CherryBlossomSketch = () => {
  let petals = [];

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noStroke();
  };

  const draw = (p5) => {
    p5.clear(); // Use clear() for a transparent background
    let t = p5.frameCount / 200; // Slow down the overall animation time

    // Add a few petals every few frames
    if (p5.frameCount % 5 === 0) {
      petals.push(new Petal(p5));
    }

    for (let i = petals.length - 1; i >= 0; i--) {
      petals[i].update(t);
      petals[i].display();
      // Remove petals that are off-screen
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
      let w = 0.6; // angular speed for sway
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


// Your main Home component
export const Home = () => {
  return (
    <div className="min-h-screen bg-[#FFF5E1] relative overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <CherryBlossomSketch />
      </div>

      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-16 relative z-10">
        <img 
          src="./imgar.png" 
          alt="Arwa Ali" 
          className="w-60 h-70 object-cover rounded-full mb-8 border-4 border-[#327048] shadow-lg hover:scale-105 transition-transform duration-300"
        />
        
        <h1 className="text-5xl md:text-6xl font-bold text-[#36454F] mb-4">
          Arwa Ali
        </h1>
        
        <p className="text-2xl text-[#327048] mb-12">
          Computer Science Student & Researcher
        </p>
        
       <div className="flex flex-row gap-6">
  {/* LinkedIn Icon */}
  <a 
    href="https://linkedin.com/in/arwa-a-cubed/" 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label="LinkedIn Profile"
    className="w-16 h-16 flex items-center justify-center text-2xl border-2 border-[#327048] text-[#327048] rounded-full hover:bg-[#327048] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#327048]"
  >
    <i className="fab fa-linkedin"></i>
  </a>

  {/* GitHub Icon */}
  <a 
    href="https://github.com/Arwa-786" 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label="GitHub Profile"
    className="w-16 h-16 flex items-center justify-center text-2xl border-2 border-[#327048] text-[#327048] rounded-full hover:bg-[#327048] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#327048]"
  >
    <i className="fab fa-github"></i>
  </a>

  {/* Resume Icon */}
  <a 
    href="/ArwaAliResume2025.pdf"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Download Resume"
    className="w-16 h-16 flex items-center justify-center text-2xl border-2 border-[#327048] text-[#327048] rounded-full hover:bg-[#327048] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#327048]"
  >
    <i className="fas fa-file-lines"></i>
  </a>
</div>
      </div>
    </div>
  );
};