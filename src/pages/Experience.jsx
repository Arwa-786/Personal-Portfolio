// Experience.jsx
import React, { useEffect, useRef } from "react";
import Matter from "matter-js"; // For the skills section
import Sketch from "react-p5";  // For the petal animation

// --- Cherry Blossom Animation Component ---
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


// --- Interactive Skills Component ---
const SkillDrop = ({ skills }) => {
  // ... (SkillDrop component code remains the same as before) ...
    const containerRef = useRef(null);
  
  const engineRef = useRef(Matter.Engine.create());
  const runnerRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const engine = engineRef.current;
    const world = engine.world;
    const container = containerRef.current;

    if (!container) return;
    
    if (runnerRef.current) {
      Matter.Runner.stop(runnerRef.current);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    Matter.World.clear(world);
    Matter.Engine.clear(engine);
    container.innerHTML = '';

    const { clientWidth: width, clientHeight: height } = container;

    const render = Matter.Render.create({
      element: container,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: "transparent",
      }
    });

    const wallThickness = 100;
    const walls = [
      Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true, render: { visible: false } }),
      Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true, render: { visible: false } }),
      Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true, render: { visible: false } }),
      Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true, render: { visible: false } })
    ];
    Matter.World.add(world, walls);

    const colorPalette = ["#55828B", "#A7D7C5", "#C5528B", "#F4C2C2"];
    const skillBodies = skills.map((skill, index) => {
      const radius = 50;
      const x = Math.random() * (width - 100) + 50;
      const y = Math.random() * (height / 3);
      const color = colorPalette[index % colorPalette.length];

      const body = Matter.Bodies.circle(x, y, radius, {
        restitution: 0.8,
        friction: 0.1,
        render: {
          fillStyle: 'transparent',
          strokeStyle: 'transparent'
        }
      });
      body.skill = skill;
      body.color = color;
      return body;
    });

    Matter.World.add(world, skillBodies);

    const skillLabels = skillBodies.map((body) => {
      const label = document.createElement('div');
      label.className = 'skill-label';
      label.textContent = body.skill;
      label.style.cssText = `
        position: absolute;
        color: white;
        font-weight: 600;
        font-size: 12px;
        text-align: center;
        pointer-events: none;
        z-index: 10;
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: ${body.color};
        transform: translate(-50px, -50px);
      `;
      container.appendChild(label);
      return label;
    });

    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } }
    });
    Matter.World.add(world, mouseConstraint);

    const updateLabels = () => {
      skillBodies.forEach((body, index) => {
        const label = skillLabels[index];
        if (label && body) {
          label.style.left = body.position.x + 'px';
          label.style.top = body.position.y + 'px';
          label.style.transform = `translate(-50px, -50px) rotate(${body.angle}rad)`;
        }
      });
      animationFrameRef.current = requestAnimationFrame(updateLabels);
    };
    updateLabels();

    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, [skills]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative w-full h-[500px] border-2 border-dashed border-[#327048] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ minHeight: '500px' }}
      />
      <p className="text-center text-[#327048] mt-4 text-sm">
        Drag and interact with the skill circles!
      </p>
    </div>
  );
};


// --- Main Experience Page Component ---
export const Experience = () => {
  const experiences = [
    {
      title: "Undergraduate Research Assistant",
      company: "ISUE Lab, University of Central Florida",
      duration: "May 2025 – Present",
      description: "Architecting a Python backend with 5 modules (Unity, ASR, LLM, VLM, TTS) for real-time multimodal interactions in VR, improving VLM accuracy by benchmarking 30+ models.",
    },
    {
        title: "Undergraduate Research Assistant",
        company: "Research with Prof. Jongouk Choi, UCF",
        duration: "June 2025 – Present",
        description: "Investigating the fault-tolerance of LLMs on embedded systems (NVIDIA Jetson) by deploying models and simulating security attacks like bit-flips.",
    },
    {
      title: "Supplemental Instruction Leader",
      company: "University of Central Florida",
      duration: "Aug 2024 – Present",
      description: "Mentoring peers in advanced C (DSA), authoring all quiz and exam materials, and leading weekly review sessions for crowds of over 70 students.",
    },
  ];

  const leadershipActivities = [
    {
        title: "Student Government Senator",
        organization: "College of Engineering and Computer Science",
        description: "Representing over 15,500 students and managing financial funding allocations for 650+ registered student organizations."
    },
    {
        title: "STEM Ambassador",
        organization: "University of Central Florida",
        description: "Fostering interest in technology by leading engaging presentations and technical demonstrations for over 100 K-12 students."
    }
  ];

  const skills = [
    "C", "C++", "Java", "Python", "JavaScript", "HTML/CSS", "Swift", "C#", "React", "Node.js", "FastAPI", "Express.js", "Unity", "Django", "Git", "GitHub", "VS Code", "LM Studio", "Apple VisionOS", "VR SDKs", "OpenCV", "Hugging Face", "Gemini API", "pandas", "NumPy",
  ];

  return (
    <div className="min-h-screen bg-[#FFF5E1] py-20 px-6 relative overflow-hidden">
      {/* Animated Petal Background */}
      <div className="absolute inset-0 z-0">
        <CherryBlossomSketch />
      </div>
      
      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-[#36454F] mb-12">My Journey</h1>

        <h2 className="text-4xl font-bold text-[#36454F] mb-8">Professional Experience</h2>
        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <div key={i} className="bg-white shadow-lg rounded-2xl p-8 border-l-8 border-[#C5528B] text-left hover:scale-[1.02] transition-transform">
              <h3 className="text-2xl font-bold text-[#36454F]">{exp.title}</h3>
              <p className="text-[#55828B] font-medium">{exp.company}</p>
              <p className="text-sm text-gray-600 mb-3">{exp.duration}</p>
              <p className="text-[#36454F]">{exp.description}</p>
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-bold text-[#36454F] mt-20 mb-8">Leadership & Activities</h2>
        <div className="space-y-12">
          {leadershipActivities.map((activity, i) => (
            <div key={i} className="bg-white shadow-lg rounded-2xl p-8 border-l-8 border-[#55828B] text-left hover:scale-[1.02] transition-transform">
              <h3 className="text-2xl font-bold text-[#36454F]">{activity.title}</h3>
              <p className="text-[#55828B] font-medium mb-3">{activity.organization}</p>
              <p className="text-[#36454F]">{activity.description}</p>
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-bold text-[#36454F] mt-20 mb-8">Technical Skills</h2>
        <SkillDrop skills={skills} />
      </div>
    </div>
  );
};

export default Experience;