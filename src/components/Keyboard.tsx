import clsx from 'clsx';

interface KeyProps {
  letter: string;
  timeout?: number;
}

const Key = ({ letter, timeout }:KeyProps) => {
  return (
    <div className={clsx(
        "flex w-max py-3 px-6 rounded-[2px] bg-white dark:bg-black dark:text-white",
        "border border-black dark:border-white mx-auto",
        "text-black font-sans font-medium tracking-tight select-none transition-all",
        // Base State
        "shadow-[4px_4px_0_#000,0_0_0_2px_#fff] dark:shadow-[px_4px_0_#fff,0_0_0_2px_#000]",
    )}
    style={{
        animation: `keyPress ${timeout}ms infinite cubic-bezier(0.645, 0.045, 0.355, 1)`
    }}
    >
      <span className="font-bold text-2xl opacity-20">{letter}</span>
    </div>
  );
};

const Keyboard = () => {
  const keys: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',',]
  ];

  return (
    <div className="fixed max-w-[100vw] top-[50vh] opacity-5 flex flex-col items-center p-4 max-w-xl mx-auto gap-3 scale-800 rotate-x-45 -rotate-z-35 rotate-y-10 translate-x-[-50%] max-w-[100vw] events-none">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex w-full gap-2" style={{
            paddingLeft: rowIndex * 40 + 'px',
        }}>
          {row.map((keyLetter) => {
            const randomTimeout = Math.floor(Math.random() * (20000 - 10000) + 10000);
            return (
                <Key key={keyLetter} letter={keyLetter} timeout={randomTimeout}/>
              )
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;