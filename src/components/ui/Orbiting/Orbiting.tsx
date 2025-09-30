"use client"
import React, { useEffect, useState, memo } from 'react';

// --- Type Definitions ---
type IconType = 'frontend' | 'backend' | 'database' | 'mobile' | 'devops' | 'fullstack';

type GlowColor = 'cyan' | 'purple';

interface SkillIconProps {
  type: IconType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

// --- Improved SVG Icon Components ---
const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  frontend: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <defs>
          <linearGradient id="frontendGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <filter id="frontendShadow">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.3" />
          </filter>
        </defs>
        <rect x="2" y="3" width="20" height="16" rx="2" fill="url(#frontendGrad)" filter="url(#frontendShadow)" />
        <rect x="3" y="4" width="18" height="2" rx="1" fill="#1E40AF" opacity="0.8" />
        <circle cx="5" cy="5" r="0.6" fill="#EF4444" />
        <circle cx="6.5" cy="5" r="0.6" fill="#F59E0B" />
        <circle cx="8" cy="5" r="0.6" fill="#10B981" />
        <rect x="4" y="8" width="16" height="1" rx="0.5" fill="#DBEAFE" />
        <rect x="4" y="10.5" width="12" height="1" rx="0.5" fill="#DBEAFE" />
        <rect x="4" y="13" width="14" height="1" rx="0.5" fill="#DBEAFE" />
        <rect x="4" y="15.5" width="8" height="1" rx="0.5" fill="#DBEAFE" />
        <path
          d="M16 8 L20 12 L16 16"
          stroke="#DBEAFE"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    color: "#3B82F6",
  },
  backend: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <defs>
          <linearGradient id="backendGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <filter id="backendGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect x="1" y="4" width="22" height="4" rx="2" fill="url(#backendGrad)" filter="url(#backendGlow)" />
        <rect x="1" y="10" width="22" height="4" rx="2" fill="url(#backendGrad)" filter="url(#backendGlow)" />
        <rect x="1" y="16" width="22" height="4" rx="2" fill="url(#backendGrad)" filter="url(#backendGlow)" />
        <circle cx="4" cy="6" r="1" fill="#065F46" />
        <circle cx="4" cy="12" r="1" fill="#065F46" />
        <circle cx="4" cy="18" r="1" fill="#065F46" />
        <rect x="7" y="5.5" width="8" height="1" rx="0.5" fill="#ECFDF5" />
        <rect x="7" y="11.5" width="10" height="1" rx="0.5" fill="#ECFDF5" />
        <rect x="7" y="17.5" width="9" height="1" rx="0.5" fill="#ECFDF5" />
        <path
          d="M18 5 L21 6 L18 7 M18 11 L21 12 L18 13 M18 17 L21 18 L18 19"
          stroke="#ECFDF5"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    ),
    color: "#10B981",
  },
  fullstack: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <defs>
          <linearGradient id="fullstackGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="fullstackGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <filter id="fullstackShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
          </filter>
        </defs>
        {/* Frontend Layer */}
        <rect x="2" y="2" width="20" height="8" rx="2" fill="url(#fullstackGrad1)" filter="url(#fullstackShadow)" />
        <rect x="3" y="3" width="18" height="1.5" rx="0.75" fill="#DDD6FE" />
        <circle cx="4.5" cy="4.75" r="0.6" fill="#EF4444" />
        <circle cx="6" cy="4.75" r="0.6" fill="#F59E0B" />
        <circle cx="7.5" cy="4.75" r="0.6" fill="#10B981" />
        <rect x="4" y="6.5" width="12" height="0.8" rx="0.4" fill="#DDD6FE" />
        <rect x="4" y="8" width="8" height="0.8" rx="0.4" fill="#DDD6FE" />

        {/* Connection */}
        <path d="M10 11 L14 11" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M8 11 L10 11 L9 10 M14 11 L16 11 L15 10"
          stroke="#6366F1"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Backend Layer */}
        <rect
          x="2"
          y="14"
          width="20"
          height="2.5"
          rx="1.25"
          fill="url(#fullstackGrad2)"
          filter="url(#fullstackShadow)"
        />
        <rect
          x="2"
          y="17.5"
          width="20"
          height="2.5"
          rx="1.25"
          fill="url(#fullstackGrad2)"
          filter="url(#fullstackShadow)"
        />
        <rect
          x="2"
          y="21"
          width="20"
          height="2.5"
          rx="1.25"
          fill="url(#fullstackGrad2)"
          filter="url(#fullstackShadow)"
        />
        <circle cx="4" cy="15.25" r="0.7" fill="#065F46" />
        <circle cx="4" cy="18.75" r="0.7" fill="#065F46" />
        <circle cx="4" cy="22.25" r="0.7" fill="#065F46" />
      </svg>
    ),
    color: "#8B5CF6",
  },
  devops: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <defs>
          <radialGradient id="devopsGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#F59E0B" />
          </radialGradient>
          <filter id="devopsGlow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="12" cy="12" r="11" fill="none" stroke="url(#devopsGrad)" strokeWidth="1.5" opacity="0.3" />
        <circle cx="12" cy="12" r="9" fill="none" stroke="url(#devopsGrad)" strokeWidth="2" />
        <path
          d="M12 3 L14.5 8.5 L20.5 7 L16.5 12 L20.5 17 L14.5 15.5 L12 21 L9.5 15.5 L3.5 17 L7.5 12 L3.5 7 L9.5 8.5 Z"
          fill="url(#devopsGrad)"
          filter="url(#devopsGlow)"
        />
        <circle cx="12" cy="12" r="4" fill="#92400E" />
        <circle cx="12" cy="12" r="2" fill="#FEF3C7" />
        <path d="M9.5 9.5 L14.5 14.5 M14.5 9.5 L9.5 14.5" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="5" r="1" fill="#FCD34D" />
        <circle cx="19" cy="12" r="1" fill="#FCD34D" />
        <circle cx="12" cy="19" r="1" fill="#FCD34D" />
        <circle cx="5" cy="12" r="1" fill="#FCD34D" />
      </svg>
    ),
    color: "#F59E0B",
  },
  mobile: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <defs>
          <linearGradient id="mobileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <filter id="mobileShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3" />
          </filter>
        </defs>
        <rect x="5" y="1" width="14" height="22" rx="3" fill="url(#mobileGrad)" filter="url(#mobileShadow)" />
        <rect x="6" y="3.5" width="12" height="16" rx="1" fill="#FDF2F8" />
        <circle cx="12" cy="21" r="1.2" fill="#FDF2F8" />
        <rect x="10" y="2.2" width="4" height="0.6" rx="0.3" fill="#BE185D" />

        {/* App icons */}
        <rect x="7.5" y="5" width="2" height="2" rx="0.4" fill="#EC4899" />
        <rect x="10.5" y="5" width="2" height="2" rx="0.4" fill="#3B82F6" />
        <rect x="13.5" y="5" width="2" height="2" rx="0.4" fill="#10B981" />
        <rect x="7.5" y="8" width="2" height="2" rx="0.4" fill="#F59E0B" />
        <rect x="10.5" y="8" width="2" height="2" rx="0.4" fill="#8B5CF6" />
        <rect x="13.5" y="8" width="2" height="2" rx="0.4" fill="#EF4444" />

        {/* Screen content */}
        <rect x="7" y="12" width="10" height="1" rx="0.5" fill="#EC4899" opacity="0.6" />
        <rect x="7" y="14" width="8" height="1" rx="0.5" fill="#EC4899" opacity="0.6" />
        <rect x="7" y="16" width="9" height="1" rx="0.5" fill="#EC4899" opacity="0.6" />

        {/* Signal bars */}
        <rect x="15.5" y="2.5" width="0.5" height="0.5" fill="#BE185D" />
        <rect x="16.2" y="2.3" width="0.5" height="0.7" fill="#BE185D" />
        <rect x="16.9" y="2.1" width="0.5" height="0.9" fill="#BE185D" />
        <rect x="17.6" y="1.9" width="0.5" height="1.1" fill="#BE185D" />
      </svg>
    ),
    color: "#EC4899",
  },
  database: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <defs>
          <linearGradient id="dbGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F87171" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
          <linearGradient id="dbGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>
          <filter id="dbShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Database cylinder layers */}
        <ellipse cx="12" cy="6" rx="9" ry="3.5" fill="url(#dbGrad1)" filter="url(#dbShadow)" />
        <path d="M3 6 V18 C3 20.2 7.03 22 12 22 C16.97 22 21 20.2 21 18 V6" fill="url(#dbGrad2)" />

        <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="url(#dbGrad1)" opacity="0.9" />
        <ellipse cx="12" cy="18" rx="9" ry="3.5" fill="url(#dbGrad1)" />

        {/* Data visualization */}
        <rect x="6" y="7" width="3" height="0.8" rx="0.4" fill="#FEE2E2" />
        <rect x="10" y="7" width="4" height="0.8" rx="0.4" fill="#FEE2E2" />
        <rect x="15" y="7" width="2" height="0.8" rx="0.4" fill="#FEE2E2" />

        <rect x="6" y="13" width="4" height="0.8" rx="0.4" fill="#FEE2E2" />
        <rect x="11" y="13" width="3" height="0.8" rx="0.4" fill="#FEE2E2" />
        <rect x="15" y="13" width="3" height="0.8" rx="0.4" fill="#FEE2E2" />

        {/* Connection indicators */}
        <circle cx="18" cy="9" r="1" fill="#FCD34D" opacity="0.8" />
        <circle cx="18" cy="15" r="1" fill="#FCD34D" opacity="0.8" />
        <path d="M17 9 L19 9 M18 8 L18 10" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" />
        <path d="M17 15 L19 15 M18 14 L18 16" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    color: "#EF4444",
  },
}


// --- Memoized Icon Component ---
const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

// --- Configuration for the Orbiting Skills ---
const skillsConfig:SkillConfig[] = [
  // Inner Orbit - Core Technologies
  { 
    id: 'frontend',
    orbitRadius: 100, 
    size: 40, 
    speed: 1, 
    iconType: 'frontend', 
    phaseShift: 0, 
    glowColor: 'cyan',
    label: 'Frontend'
  },
  { 
    id: 'backend',
    orbitRadius: 100, 
    size: 45, 
    speed: 1, 
    iconType: 'backend', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'cyan',
    label: 'Backend'
  },
  { 
    id: 'database',
    orbitRadius: 100, 
    size: 40, 
    speed: 1, 
    iconType: 'database', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'cyan',
    label: 'Database'
  },
  // Outer Orbit - Specialized Areas
  { 
    id: 'fullstack',
    orbitRadius: 180, 
    size: 50, 
    speed: -0.6, 
    iconType: 'fullstack', 
    phaseShift: 0, 
    glowColor: 'purple',
    label: 'Full Stack'
  },
  { 
    id: 'mobile',
    orbitRadius: 180, 
    size: 45, 
    speed: -0.6, 
    iconType: 'mobile', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'purple',
    label: 'Mobile Dev'
  },
  { 
    id: 'devops',
    orbitRadius: 180, 
    size: 40, 
    speed: -0.6, 
    iconType: 'devops', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'purple',
    label: 'DevOps'
  },
];

// --- Memoized Orbiting Skill Component ---
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out pointer-events-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 5 : 1, // Reduced z-index values
      }}
    >
      <div
        className={`
          relative w-full h-full p-2 bg-gray-800/90 backdrop-blur-sm
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer pointer-events-auto
          ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${iconComponents[iconType]?.color}40, 0 0 60px ${iconComponents[iconType]?.color}20`
            : undefined
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900/95 backdrop-blur-sm rounded text-xs text-white whitespace-nowrap pointer-events-none">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan: {
      primary: 'rgba(6, 182, 212, 0.4)',
      secondary: 'rgba(6, 182, 212, 0.2)',
      border: 'rgba(6, 182, 212, 0.3)'
    },
    purple: {
      primary: 'rgba(147, 51, 234, 0.4)',
      secondary: 'rgba(147, 51, 234, 0.2)',
      border: 'rgba(147, 51, 234, 0.3)'
    }
  };

  const colors = glowColors[glowColor] || glowColors.cyan;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
        zIndex: 0, // Ensure paths are behind everything
      }}
    >
      {/* Glowing background */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />

      {/* Static ring for depth */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colors.border}`,
          boxShadow: `inset 0 0 20px ${colors.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main App Component ---
export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 100, glowColor: 'cyan', delay: 0 },
    { radius: 180, glowColor: 'purple', delay: 1.5 }
  ];

  return (
    <main className="w-full flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #374151 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, #4B5563 0%, transparent 50%)`,
          }}
        />
      </div>

      <div 
        className="relative w-[calc(100vw-40px)] h-[calc(100vw-40px)] md:w-[450px] md:h-[450px] flex items-center justify-center"
      >
        
        {/* Central "Code" Icon with enhanced glow */}
        <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center z-10 relative shadow-2xl pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
        </div>

        {/* Render glowing orbit paths */}
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {/* Render orbiting skill icons */}
        {skillsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill
              key={config.id}
              config={config}
              angle={angle}
            />
          );
        })}
      </div>
    </main>
  );
}