import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import { useEffect, useState, useRef } from 'react';

function GeometricBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const shapes = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 40 + 10,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      type: Math.floor(Math.random() * 3), // 0=三角形 1=方形 2=六角形
      opacity: Math.random() * 0.15 + 0.05,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
    }));

    const drawTriangle = (ctx, x, y, size) => {
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size, y + size);
      ctx.lineTo(x - size, y + size);
      ctx.closePath();
    };

    const drawSquare = (ctx, x, y, size) => {
      ctx.beginPath();
      ctx.rect(x - size / 2, y - size / 2, size, size);
      ctx.closePath();
    };

    const drawHexagon = (ctx, x, y, size) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach(shape => {
        shape.x += shape.speedX;
        shape.y += shape.speedY;
        shape.rotation += shape.rotationSpeed;

        if (shape.x > canvas.width + 50) shape.x = -50;
        if (shape.x < -50) shape.x = canvas.width + 50;
        if (shape.y > canvas.height + 50) shape.y = -50;
        if (shape.y < -50) shape.y = canvas.height + 50;

        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        ctx.strokeStyle = `rgba(255, 255, 255, ${shape.opacity})`;
        ctx.lineWidth = 1.5;

        if (shape.type === 0) drawTriangle(ctx, 0, 0, shape.size);
        else if (shape.type === 1) drawSquare(ctx, 0, 0, shape.size);
        else drawHexagon(ctx, 0, 0, shape.size);

        ctx.stroke();
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [displayText, setDisplayText] = useState('');
  const fullText = '前端開發學習者 | 技術筆記分享';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <GeometricBackground />
      <div className="container" style={{ position: 'relative', zIndex: 1, color: '#ffffff' }}>
        <p style={{ fontSize: '1rem', opacity: 0.85, marginBottom: '0.3rem', letterSpacing: '0.1em', color: '#ffffff' }}>
          Welcome！Henry Yang's Website
        </p>
        <Heading as="h1" className="hero__title" style={{ fontSize: '2.5rem', color: '#ffffff' }}>
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle" style={{ fontSize: '1.1rem', color: '#ffffff' }}>
          {displayText}
        </p>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}