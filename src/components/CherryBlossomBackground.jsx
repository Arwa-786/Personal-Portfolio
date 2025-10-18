import React, { useEffect, useRef } from 'react';

export const CherryBlossomBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Simple petal class
    class Petal {
      constructor() {
        this.el = document.createElement('div');
        this.el.className = 'cherry-petal';
        
        this.el.style.position = 'absolute';
        this.el.style.pointerEvents = 'none';
        this.el.style.zIndex = '1';
        this.el.style.width = '20px';
        this.el.style.height = '20px';
        this.el.style.borderRadius = '50% 0 50% 0';
        this.el.style.background = 'linear-gradient(45deg, #FFB3C7, #FF9EC7)';
        this.el.style.opacity = '0.7';
        this.el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        
        this.reset();
        containerRef.current.appendChild(this.el);
      }

      reset() {
        const container = containerRef.current;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        
        this.x = Math.random() * containerWidth;
        this.y = -50 - Math.random() * 100;
        this.rotation = 0;
        this.rotationSpeed = Math.random() * 4 - 2;
        this.fallSpeed = Math.random() * 2 + 1;
        this.windEffect = Math.random() * 0.5 - 0.25;
      }

      update() {
        this.y += this.fallSpeed;
        this.x += this.windEffect + Math.sin(this.y * 0.01) * 0.5;
        this.rotation += this.rotationSpeed;
        
        this.el.style.left = this.x + 'px';
        this.el.style.top = this.y + 'px';
        this.el.style.transform = `rotate(${this.rotation}deg)`;
        
        // Reset if out of bounds
        const container = containerRef.current;
        if (this.y > container.offsetHeight + 100 || this.x < -100 || this.x > container.offsetWidth + 100) {
          this.reset();
        }
      }
    }

    // Create petals
    const petals = [];
    for (let i = 0; i < 20; i++) {
      petals.push(new Petal());
    }

    // Animation loop
    const animate = () => {
      petals.forEach(petal => petal.update());
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    />
  );
};
