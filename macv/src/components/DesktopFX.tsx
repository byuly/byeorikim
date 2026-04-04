import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// All particle effects on one canvas — zero React re-renders
export default function DesktopFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Shooting stars ────────────────────────────────────────────────────
    interface Star {
      x: number; y: number;
      vx: number; vy: number;
      alpha: number; decay: number;
      tailLen: number; width: number;
    }

    const stars: Star[] = [];

    const spawnStar = () => {
      const fromTop = Math.random() < 0.6;
      stars.push({
        x: fromTop ? Math.random() * canvas.width : -10,
        y: fromTop ? -10 : Math.random() * canvas.height * 0.5,
        vx: Math.cos(25 * Math.PI / 180) * (Math.random() * 10 + 8),
        vy: Math.sin(25 * Math.PI / 180) * (Math.random() * 10 + 8),
        alpha: 1,
        decay: Math.random() * 0.012 + 0.01,
        tailLen: Math.random() * 120 + 60,
        width: Math.random() * 1.2 + 0.4,
      });
    };

    const starTimer = setInterval(spawnStar, 2800);

    // ── Sparkles ──────────────────────────────────────────────────────────
    interface Sparkle {
      x: number; y: number;
      size: number;
      alpha: number;
      phase: number;   // 0–2π, drives the twinkle
      speed: number;
    }

    const SPARKLE_COUNT = 30;
    const sparkles: Sparkle[] = Array.from({ length: SPARKLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.85,
      size: Math.random() * 1.8 + 0.6,
      alpha: Math.random(),
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.025 + 0.008,
    }));

    // ── Draw loop ─────────────────────────────────────────────────────────
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sparkles
      for (const s of sparkles) {
        s.phase += s.speed;
        s.alpha = (Math.sin(s.phase) + 1) / 2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,220,${s.alpha * 0.85})`;
        ctx.fill();
      }

      // Shooting stars
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        const tx = s.x - s.vx * (s.tailLen / 12);
        const ty = s.y - s.vy * (s.tailLen / 12);

        const grad = ctx.createLinearGradient(tx, ty, s.x, s.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(1, `rgba(255,255,240,${s.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.lineCap = "round";
        ctx.stroke();

        // Bright head
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.width * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,220,${s.alpha * 0.9})`;
        ctx.fill();

        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;
        if (s.alpha <= 0) stars.splice(i, 1);
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(starTimer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      {/* Frogs — 5 Framer Motion instances is fine */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {FROGS.map((f) => (
          <motion.div
            key={f.id}
            className="absolute select-none"
            style={{
              left: f.x,
              fontSize: f.size,
              filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))",
            }}
            initial={{ bottom: "-8%", opacity: 0, rotate: -10 }}
            animate={{
              bottom: ["-8%", "15%", "8%", "28%", "18%", "108%"],
              opacity: [0, 1, 1, 1, 1, 0],
              rotate: [-10, 10, -8, 14, -6, 8],
              x: [0, f.wobble[0], f.wobble[1], f.wobble[2], f.wobble[3], f.wobble[4]],
            }}
            transition={{
              duration: f.dur,
              delay: f.delay,
              repeat: Infinity,
              repeatDelay: f.pause,
              ease: "easeInOut",
            }}
          >
            🐸
          </motion.div>
        ))}
      </div>
    </>
  );
}

const FROGS = [
  { id: 1, x: "8%",  size: 22, dur: 12, delay: 0,   pause: 6,  wobble: [0, 22, -14, 30, -10, 8]   },
  { id: 2, x: "24%", size: 18, dur: 15, delay: 3.5,  pause: 4,  wobble: [0, -18, 25, -20, 15, -5]  },
  { id: 3, x: "55%", size: 28, dur: 11, delay: 7,    pause: 8,  wobble: [0, 30, -22, 18, -28, 12]  },
  { id: 4, x: "73%", size: 20, dur: 14, delay: 1.5,  pause: 5,  wobble: [0, -25, 10, -30, 20, -8]  },
  { id: 5, x: "88%", size: 16, dur: 13, delay: 5,    pause: 7,  wobble: [0, 15, -20, 25, -12, 10]  },
];
