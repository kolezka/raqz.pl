import './AnimatedBackground.css'

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      
      {/* Large floating elements with CSS classes */}
      <div 
        className="absolute w-80 h-80 opacity-60 rounded-full float1"
        style={{
          top: '-10rem',
          left: '-8rem',
          background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)',
          filter: 'blur(60px)'
        }}
      />

      <div 
        className="absolute w-72 h-72 opacity-40 rounded-full float2"
        style={{
          top: '-5rem',
          right: '25%',
          background: 'linear-gradient(135deg, #22d3ee, #3b82f6, #8b5cf6)',
          filter: 'blur(50px)'
        }}
      />

      <div 
        className="absolute w-64 h-64 opacity-50 rounded-full float3"
        style={{
          top: '8rem',
          right: '-6rem',
          background: 'linear-gradient(135deg, #8b5cf6, #f472b6, #ef4444)',
          filter: 'blur(40px)'
        }}
      />

      <div 
        className="absolute w-48 h-48 opacity-30 rounded-full float4"
        style={{
          top: '50%',
          left: '25%',
          background: 'linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6)',
          filter: 'blur(30px)'
        }}
      />

      <div 
        className="absolute w-96 h-96 opacity-40 rounded-full float5"
        style={{
          bottom: '-8rem',
          left: '33%',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #f472b6)',
          filter: 'blur(70px)'
        }}
      />

      {/* Medium floating particles */}
      <div 
        className="absolute w-24 h-24 opacity-50 rounded-full floatSmall1"
        style={{
          top: '5rem',
          left: '50%',
          background: 'linear-gradient(135deg, #fbbf24, #f97316)',
          filter: 'blur(15px)'
        }}
      />

      <div 
        className="absolute w-32 h-32 opacity-45 rounded-full floatSmall2"
        style={{
          top: '66%',
          right: '33%',
          background: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
          filter: 'blur(20px)'
        }}
      />

      <div 
        className="absolute w-28 h-28 opacity-40 rounded-full floatSmall3"
        style={{
          bottom: '25%',
          left: '16%',
          background: 'linear-gradient(135deg, #f43f5e, #f472b6)',
          filter: 'blur(18px)'
        }}
      />

      {/* Tailwind-animated elements */}
      <div className="absolute top-1/3 left-1/3 w-20 h-20 opacity-30 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse-slow" style={{ filter: 'blur(10px)' }} />
      
      <div className="absolute bottom-1/3 right-1/4 w-16 h-16 opacity-35 rounded-full bg-gradient-to-r from-green-400 to-blue-400 animate-float-reverse" style={{ filter: 'blur(8px)' }} />

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/10 pointer-events-none" />
    </div>
  )
}