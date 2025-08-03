// components/AnimatedBackground.js

"use client"; // Optionnel, mais bonne pratique

export function AnimatedBackground() {
  return (
    <div className="fixed top-0 left-0 -z-10 h-full w-full">
      <div className="absolute inset-0 backdrop-blur-3xl"></div>

      {/* Halo 1: Une source de lumière claire (presque blanche) */}
      <div
        className="absolute top-1/4 left-1/4 h-72 w-72 animate-blob rounded-full bg-slate-100/30 opacity-70 filter blur-3xl animation-delay-2000"
      ></div>
      
      {/* Halo 2: Une couleur vive et saturée */}
      <div
        className="absolute bottom-1/4 right-1/4 h-72 w-72 animate-blob rounded-full bg-slate-600/40 opacity-100 filter blur-3xl"
      ></div>

      {/* Halo 3: L'ancienne couleur rose, plus discrète */}
      <div
        className="absolute -bottom-8 left-20 h-72 w-72 animate-blob rounded-full bg-[#fde4e4]/30 opacity-50 filter blur-2xl animation-delay-4000"
      ></div>
        
      {/* Halo 4: L'ancienne couleur bleue, pour la texture */}
      <div
        className="absolute top-0 -right-4 h-72 w-72 animate-blob rounded-full bg-[#aab7ff]/30 opacity-50 filter blur-2xl animation-delay-6000"
      ></div>
    </div>
  );
}