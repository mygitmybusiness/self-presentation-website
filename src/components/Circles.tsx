import { JSX } from "react";

const Circles = () => {
    const numberOfCircles = 15;

    const renderCircles = (): JSX.Element[] => {
        const elements: JSX.Element[] = [];
        
        for (let i = numberOfCircles; i >= 1; i--) {
            const sizePercent = i * (100 / numberOfCircles); 
            const finalOpacity = (100 / i) * 0.005;
            
            elements.push(
                <div 
                    key={i} 
                    className="absolute border rounded-full animate-fade-in opacity-0"
                    style={{ 
                        width: `${sizePercent}%`, 
                        height: `${sizePercent}%`,
                        borderColor: `rgba(0,0,0, ${sizePercent})`,
                        right: (i > (numberOfCircles / 2)) ? -((100 / numberOfCircles) * (i - (numberOfCircles / 2))) * 1 + 'px' : -i + 'px',
                        
                        ['--final-opacity' as any]: finalOpacity, 
                        
                        animationDelay: `${i * 100}ms` 
                    }}
                />
            );
        }
        return elements;
    };

    return (
        <div className="z-1 absolute rotate-[164deg] bottom-0 left-0 scale-300 w-[500px] h-[500px] flex items-center justify-center">
            {renderCircles()}
        </div>
    );
};

export default Circles;