import { Link } from "react-router-dom";

export const Resume = () => {
  return (
    <div className="min-h-screen bg-[#FFF5E1] py-12 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 pt-16">
          <h1 className="text-5xl md:text-6xl font-bold text-[#36454F] mb-4">Resume</h1>
          <p className="text-xl text-[#55828B]">Download my resume or view it online</p>
        </div>

        {/* Resume Content */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Header Section */}
            <div className="text-center mb-12 border-b-2 border-[#55828B]/20 pb-8">
              <h2 className="text-4xl font-bold text-[#36454F] mb-2">Arwa Ali</h2>
              <p className="text-xl text-[#55828B] mb-4">Computer Science Student | Full-Stack Developer</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-[#36454F]">
                <span>arwa.ali@email.com</span>
                <span>(555) 123-4567</span>
                <span>City, State</span>
                <span>linkedin.com/in/arwa-a-cubed</span>
              </div>
            </div>

            {/* Education */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-[#36454F] mb-6">Education</h3>
              <div className="bg-gradient-to-r from-[#55828B]/10 to-[#C5528B]/10 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h4 className="text-xl font-semibold text-[#36454F]">Bachelor of Science in Computer Science</h4>
                  <span className="text-[#55828B] font-medium">2022 - 2026</span>
                </div>
                <p className="text-[#36454F] mb-2">University Name</p>
                <p className="text-[#36454F]">GPA: 3.8/4.0 | Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems, Machine Learning</p>
              </div>
            </div>

            {/* Experience */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-[#36454F] mb-6">Experience</h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#55828B]/10 to-[#C5528B]/10 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-xl font-semibold text-[#36454F]">Research Assistant</h4>
                    <span className="text-[#55828B] font-medium">2023 - Present</span>
                  </div>
                  <p className="text-[#36454F] mb-3">AI Research Lab</p>
                  <ul className="text-[#36454F] space-y-1">
                    <li>• Conducting research on machine learning algorithms</li>
                    <li>• Published research paper on neural network optimization</li>
                    <li>• Developed ML models with 90%+ accuracy rates</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-[#C5528B]/10 to-[#55828B]/10 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-xl font-semibold text-[#36454F]">Software Development Intern</h4>
                    <span className="text-[#55828B] font-medium">Summer 2023</span>
                  </div>
                  <p className="text-[#36454F] mb-3">Tech Solutions Inc.</p>
                  <ul className="text-[#36454F] space-y-1">
                    <li>• Developed full-stack web applications using React and Node.js</li>
                    <li>• Collaborated with senior developers on feature implementation</li>
                    <li>• Improved application performance by 25% through code optimization</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-[#36454F] mb-6">Technical Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#55828B]/10 to-[#C5528B]/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-[#36454F] mb-3">Programming Languages</h4>
                  <p className="text-[#36454F]">C, C++, Python, Java, JavaScript, TypeScript, HTML5, CSS3, Swift, C#</p>
                </div>
                <div className="bg-gradient-to-br from-[#C5528B]/10 to-[#55828B]/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-[#36454F] mb-3">Frameworks & Libraries</h4>
                  <p className="text-[#36454F]">React, Node.js, Express.js, Flask, Unity, OpenCV, FastAPI, Hugging Face</p>
                </div>
                <div className="bg-gradient-to-br from-[#55828B]/10 to-[#C5528B]/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-[#36454F] mb-3">Tools & Technologies</h4>
                  <p className="text-[#36454F]">Git, Docker, AWS, Figma, Jest, Webpack, Vite, TensorFlow, PyTorch</p>
                </div>
                <div className="bg-gradient-to-br from-[#C5528B]/10 to-[#55828B]/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-[#36454F] mb-3">Databases</h4>
                  <p className="text-[#36454F]">MongoDB, PostgreSQL, MySQL, Redis, Firebase</p>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-[#36454F] mb-6">Key Projects</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-[#55828B]/10 to-[#C5528B]/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-[#36454F] mb-2">AI Chat Assistant</h4>
                  <p className="text-[#36454F] mb-2">Intelligent chatbot with natural language processing capabilities</p>
                  <p className="text-sm text-[#55828B]">Technologies: Python, OpenAI API, Flask, React</p>
                </div>
                <div className="bg-gradient-to-r from-[#C5528B]/10 to-[#55828B]/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-[#36454F] mb-2">E-Commerce Platform</h4>
                  <p className="text-[#36454F] mb-2">Full-stack e-commerce application with React, Node.js, and MongoDB</p>
                  <p className="text-sm text-[#55828B]">Technologies: React, Node.js, MongoDB, Stripe API</p>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="text-center pt-8 border-t-2 border-[#55828B]/20">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-[#55828B] to-[#C5528B] hover:from-[#55828B]/80 hover:to-[#C5528B]/80 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Download PDF Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
