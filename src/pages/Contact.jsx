// Remember to run: npm install react-p5
import { Link } from "react-router-dom";
import React, { useState } from "react";
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


// Your main Contact component
export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [result, setResult] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    // Your new access key is added here
    const accessKey = "3a4b0523-ee5f-4576-b5d9-a05b011760a4"; 

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...formData, access_key: accessKey }),
    });
    
    const jsonResponse = await response.json();
    if (jsonResponse.success) {
      setResult("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
    } else {
      setResult(jsonResponse.message);
    }
  };

  const contactMethods = [
    { title: "Email", value: "arwaa0521@gmail.com", link: "mailto:arwaa0521@gmail.com", description: "Send me an email anytime!" },
    { title: "LinkedIn", value: "linkedin.com/in/arwa-a-cubed", link: "https://linkedin.com/in/arwa-a-cubed/", description: "Let's connect professionally" },
    { title: "GitHub", value: "github.com/Arwa-786", link: "https://github.com/Arwa-786", description: "Check out my code and projects" },
    { title: "Devpost", value: "arwaali_devpost", link: "https://devpost.com/ar110009?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav", description: "Take a look at my Hackathon Projects" }
  ];

  return (
    <div className="min-h-screen bg-[#FFF5E1] py-12 px-4 relative overflow-hidden">
      
      {/* Animated Petal Background */}
      <div className="absolute inset-0 z-0">
        <CherryBlossomSketch />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16 pt-16">
          <h1 className="text-5xl md:text-6xl font-bold text-[#36454F] mb-4">Contact</h1>
          <p className="text-xl text-[#55828B]">I'd love to hear from you! Let's connect.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-[#36454F] mb-8">Contact Information</h2>
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <a key={index} href={method.link} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#36454F] mb-1">{method.title}</h3>
                    <p className="text-[#55828B] font-medium mb-2 break-all">{method.value}</p>
                    <p className="text-[#36454F]">{method.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#36454F] mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#36454F] mb-2">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#55828B] focus:border-transparent transition-all duration-200" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#36454F] mb-2">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#55828B] focus:border-transparent transition-all duration-200" placeholder="your.email@example.com" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#36454F] mb-2">Subject</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#55828B] focus:border-transparent transition-all duration-200" placeholder="What's this about?" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#36454F] mb-2">Message</label>
                  <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#55828B] focus:border-transparent transition-all duration-200 resize-none" placeholder="Tell me about your project or just say hello!"></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-[#55828B] to-[#C5528B] hover:from-[#55828B]/80 hover:to-[#C5528B]/80 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
                  Send Message
                </button>
                {/* Display submission result */}
                {result && <p className="text-center text-sm font-medium text-[#327048] mt-4">{result}</p>}
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#36454F] mb-4">Let's Work Together!</h3>
            <p className="text-[#36454F] mb-6 max-w-2xl mx-auto">
              I'm always excited to collaborate on new projects, discuss innovative ideas, 
              or simply chat about technology. Whether you have a project in mind, want to 
              collaborate, or just want to say hello, I'd love to hear from you!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-gradient-to-r from-[#C5528B]/20 to-[#55828B]/20 text-[#C5528B] rounded-full text-sm font-medium">
                Open to collaboration
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-[#55828B]/20 to-[#C5528B]/20 text-[#55828B] rounded-full text-sm font-medium">
                Always learning
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};