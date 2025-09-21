import React from 'react';

interface HeroProps {
    children: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({ children }) => {
    return (
        <div className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
            <div className="absolute inset-0 bg-brand-dark opacity-50"></div>
            <div className="relative z-10 container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">Find Your Dream Home</h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-md">The best place to find the house you deserve.</p>
                {children}
            </div>
        </div>
    );
};
