import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const TechElement = ({ svg, color, size = 24, index }) => {
  const randomPosition = () => ({
    x: Math.random() * window.innerWidth - 100,
    y: Math.random() * window.innerHeight - 100,
  });

  const [position, setPosition] = useState(randomPosition());
  const [animState, setAnimState] = useState({
    isChasing: false,
    isRotating: false,
    isPulsing: false,
    isBouncing: false,
    scaleAmount: 1,
  });

  // Create a delayed start effect
  const startDelay = useRef(index * 300);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition({
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight - 100,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Initial timeout creates a staggered start effect
    const initialTimeout = setTimeout(() => {
      // Update position and animation state periodically
      const interval = setInterval(() => {
        // Get new random position
        setPosition(randomPosition());

        // Set random animation states
        setAnimState({
          isChasing: Math.random() > 0.3,
          isRotating: Math.random() > 0.5,
          isPulsing: Math.random() > 0.4,
          isBouncing: Math.random() > 0.6,
          scaleAmount: Math.random() * 0.5 + 0.8, // Scale between 0.8 and 1.3
        });
      }, Math.random() * 4000 + 2000);

      return () => clearInterval(interval);
    }, startDelay.current);

    return () => clearTimeout(initialTimeout);
  }, []);

  const getAnimationStyles = () => {
    const { isChasing, isRotating, isPulsing, isBouncing, scaleAmount } =
      animState;

    return {
      x: position.x,
      // y: position.y,
      scale: isPulsing ? [1, scaleAmount, 1] : scaleAmount,
      rotate: isRotating ? [0, 180, 360] : 0,
      y: isBouncing ? [position.y, position.y - 20, position.y] : position.y,
    };
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      initial={{
        opacity: 0,
        scale: 0.2,
        x: randomPosition().x,
        y: randomPosition().y,
      }}
      animate={{
        opacity: 1,
        ...getAnimationStyles(),
      }}
      transition={{
        opacity: { duration: 1, delay: startDelay.current / 1000 },
        duration: animState.isChasing ? 3 : 5,
        ease: 'easeInOut',
        scale: {
          duration: 2,
          repeat: animState.isPulsing ? Infinity : 0,
          repeatType: 'reverse',
        },
        rotate: {
          duration: 5,
          repeat: animState.isRotating ? Infinity : 0,
          ease: 'linear',
        },
        y: {
          duration: 1.5,
          repeat: animState.isBouncing ? Infinity : 0,
          repeatType: 'reverse',
        },
      }}
      whileHover={{
        scale: 1.5,
        rotate: 180,
        filter: 'brightness(1.5)',
        transition: { duration: 0.4 },
      }}
      whileTap={{
        scale: 0.8,
        rotate: -90,
        transition: { duration: 0.2 },
      }}
    >
      <div
        className={`${color} opacity-70 hover:opacity-100 transition-all duration-300 drop-shadow-lg`}
        style={{ width: size, height: size }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </motion.div>
  );
};

// Motion particles for background enhancement
const BackgroundParticle = ({ index }) => {
  const size = Math.random() * 4 + 2;
  const delay = index * 0.2;
  const duration = Math.random() * 10 + 20;

  const yStart = Math.random() * window.innerHeight;
  const xStart = Math.random() * window.innerWidth;

  return (
    <motion.div
      className="absolute rounded-full bg-white opacity-30"
      style={{ width: size, height: size }}
      initial={{
        x: xStart,
        y: yStart,
        scale: 0,
      }}
      animate={{
        x: xStart + (Math.random() * 100 - 50),
        y: yStart - Math.random() * 200,
        scale: [0, 1, 0],
        opacity: [0, 0.5, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

const HeroBackground = () => {
  const techElements = [
    {
      svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>file_type_flutter</title><polyline points="15.383 18.316 18.744 15.042 27.093 15.042 19.697 22.438 15.383 18.316 15.383 18.316 15.383 18.316 15.383 18.316 15.383 18.316" style="fill:#40d0fd"></polyline><polygon points="4.907 16.125 9.106 20.424 27.093 2.287 18.744 2.287 4.907 16.125" style="fill:#41d0fd;isolation:isolate"></polygon><polygon points="11.176 22.479 15.435 26.675 19.697 22.438 15.383 18.316 11.176 22.479" style="fill:#1fbcfd"></polygon><polygon points="15.435 26.675 19.697 22.438 26.989 29.813 18.593 29.813 15.435 26.675" style="fill:#095a9d"></polygon><polygon points="15.435 26.675 19.406 25.354 18.068 24.057 15.435 26.675" style="fill:#0e5199"></polygon></g></svg>`,
      color: 'text-blue-500',
      size: 40,
    },
    {
      svg: `<svg viewBox="-3 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Android-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-304.000000, -560.000000)" fill="#95CF00"> <path d="M330.727009,569.600905 C329.935377,569.600905 329.294532,568.977195 329.294532,568.206729 C329.294532,567.436264 329.935377,566.815376 330.727009,566.815376 C331.518641,566.815376 332.159486,567.436264 332.159486,568.206729 C332.159486,568.977195 331.518641,569.600905 330.727009,569.600905 L330.727009,569.600905 Z M319.272991,569.600905 C318.481359,569.600905 317.840514,568.977195 317.840514,568.206729 C317.840514,567.436264 318.481359,566.815376 319.272991,566.815376 C320.064623,566.815376 320.705468,567.436264 320.705468,568.206729 C320.705468,568.977195 320.064623,569.600905 319.272991,569.600905 L319.272991,569.600905 Z M331.573737,564.018558 L332.107291,563.233981 L332.640845,562.460694 L333.829743,560.722208 C333.97763,560.507719 333.916736,560.219853 333.696355,560.078742 C333.478873,559.934809 333.180199,559.994075 333.038111,560.208564 L331.222867,562.852982 L330.677713,563.648847 C328.952361,562.996915 327.029826,562.632849 325,562.632849 C322.973074,562.632849 321.047639,562.996915 319.322287,563.648847 L318.780033,562.852982 L318.243579,562.071228 L316.967688,560.208564 C316.819801,559.994075 316.524027,559.937631 316.303645,560.078742 C316.086164,560.219853 316.025269,560.507719 316.170257,560.722208 L317.359155,562.460694 L317.892709,563.233981 L318.429163,564.018558 C314.37821,565.855822 311.637945,569.335616 311.637945,573.317766 L338.362055,573.317766 C338.362055,569.335616 335.62179,565.855822 331.573737,564.018558 Z M311.843828,575.174785 L311.637945,575.174785 L311.637945,595.613286 C311.637945,597.236061 312.992129,598.556859 314.662386,598.556859 L316.842999,598.556859 C316.767606,598.802392 316.727009,599.059214 316.727009,599.330147 L316.727009,605.214471 C316.727009,606.75258 318.011599,608 319.591964,608 C321.172328,608 322.456918,606.75258 322.456918,605.214471 L322.456918,599.330147 C322.456918,599.059214 322.413422,598.802392 322.340928,598.556859 L327.659072,598.556859 C327.586578,598.802392 327.545982,599.059214 327.545982,599.330147 L327.545982,605.214471 C327.545982,606.75258 328.827672,608 330.408036,608 C331.991301,608 333.275891,606.75258 333.275891,605.214471 L333.275891,599.330147 C333.275891,599.059214 333.232394,598.802392 333.157001,598.556859 L335.340514,598.556859 C337.010771,598.556859 338.362055,597.236061 338.362055,595.613286 L338.362055,575.174785 L311.843828,575.174785 Z M306.864954,575.174785 C305.28169,575.174785 304,576.422205 304,577.960314 L304,589.884184 C304,591.422293 305.28169,592.669713 306.864954,592.669713 C308.445319,592.669713 309.727009,591.422293 309.727009,589.884184 L309.727009,577.960314 C309.727009,576.422205 308.445319,575.174785 306.864954,575.174785 Z M343.137945,575.174785 C341.554681,575.174785 340.272991,576.422205 340.272991,577.960314 L340.272991,589.884184 C340.272991,591.422293 341.554681,592.669713 343.137945,592.669713 C344.71831,592.669713 346,591.422293 346,589.884184 L346,577.960314 C346,576.422205 344.71831,575.174785 343.137945,575.174785 Z" id="Android"> </path> </g> </g> </g></svg>`,
      color: 'text-green-500',
      size: 40,
    },
    {
      svg: `<svg viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M70.534,69.696 L53.988,53.15 L54.058,172.75 L54.256,178.34 C54.338,180.97 54.826,183.938 55.64,187.014 L186.744,233.244 L219.516,218.724 L219.528,218.684 L70.534,69.696" fill="#00D2B8"> </path> <path d="M55.64,187.014 L55.648,187.022 C55.64,186.968 55.612,186.908 55.612,186.852 C55.612,186.908 55.62,186.96 55.64,187.014 L55.64,187.014 Z M219.516,218.724 L186.744,233.244 L55.648,187.022 C58.152,196.63 63.696,207.43 69.662,213.336 L112.446,255.876 L207.576,256 L219.528,218.684 L219.516,218.724 L219.516,218.724 Z" fill="#55DDCA"> </path> <path d="M3.034,130.116 C-1.202,134.638 0.902,143.966 7.722,150.838 L37.14,180.5 L55.64,187.014 C54.826,183.938 54.338,180.97 54.256,178.34 L54.058,172.75 L53.988,53.15 L3.034,130.116 Z" fill="#0081C6"> </path> <path d="M187.82,54.686 C184.744,53.9 181.794,53.414 179.12,53.33 L173.212,53.126 L53.988,53.142 L219.544,218.684 L219.558,218.684 L234.098,185.88 L187.82,54.686" fill="#0079B3"> </path> <path d="M187.67,54.654 C187.734,54.668 187.784,54.686 187.826,54.692 L187.82,54.686 C187.784,54.668 187.734,54.668 187.67,54.654 L187.67,54.654 Z M214.118,68.732 C208.11,62.674 197.452,57.168 187.826,54.692 L234.098,185.88 L219.558,218.684 L219.544,218.684 L255.076,207.336 L255.152,109.92 L214.118,68.732 L214.118,68.732 Z" fill="#00A4E4"> </path> <path d="M181.338,36.298 L151.684,6.862 C144.826,0.068 135.494,-2.046 130.984,2.178 L53.988,53.142 L173.212,53.126 L179.12,53.33 C181.794,53.414 184.744,53.9 187.82,54.686 L181.338,36.298 L181.338,36.298 Z" fill="#00D2B8"> </path> </g> </g></svg>`,
      color: 'text-purple-500',
      size: 40,
    },
    {
      svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>file_type_ionic</title><circle cx="16.024" cy="15.923" r="5.716" style="fill:#4e8ef7"></circle><path d="M27.688,6.224A1.964,1.964,0,0,0,24.436,4.74a14.013,14.013,0,1,0,2.77,2.77A1.955,1.955,0,0,0,27.688,6.224ZM16.023,29.452a13.529,13.529,0,1,1,8.1-24.362,1.964,1.964,0,0,0,2.738,2.738A13.523,13.523,0,0,1,16.023,29.452Z" style="fill:#4e8ef7"></path></g></svg>`,
      color: 'text-pink-500',
      size: 40,
    },
    {
      svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,17.56L16.07,16.43L16.62,10.33H9.38L9.2,8.3H16.8L17,6.31H7L7.56,12.32H14.45L14.22,14.9L12,15.5L9.78,14.9L9.64,13.24H7.64L7.93,16.43L12,17.56M4.07,3H19.93L18.5,19.2L12,21L5.5,19.2L4.07,3Z"/></svg>`,
      color: 'text-indigo-500',
      size: 40,
    },
    // Add more tech icons for a richer background
    // {
    //   svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,3C13.74,3 15.36,3.5 16.74,4.35L17.85,3.24C16.15,2.17 14.13,1.5 12,1.5C7.31,1.5 3.33,4.27 1.58,8.28L3,8.5C4.46,5.21 7.5,3 12,3Z"/><path d="M20.5,11C20.5,11.35 20.5,11.7 20.45,12.05L21.95,12.55C21.97,12.03 22,11.5 22,11C22,10.03 21.86,9.1 21.63,8.22L20.23,8.93C20.4,9.6 20.5,10.3 20.5,11Z"/><path d="M15.32,18.41L14.32,19.41C13.55,20.18 12.35,20.21 11.53,19.5C11.27,19.29 11.06,19.03 10.91,18.74C10.74,18.4 10.65,18.03 10.65,17.65V6.27H9.15V17.65C9.15,18.35 9.32,19 9.62,19.57C9.93,20.15 10.37,20.65 10.91,21.06C11.66,21.64 12.6,21.9 13.56,21.9C14.75,21.9 15.83,21.47 16.71,20.59L18.24,19.06L17.18,17.95L15.32,18.41Z"/><path d="M7.32,14.58C7.32,13.94 6.87,13.41 6.24,13.34C5.85,13.3 5.47,13.44 5.17,13.74L2.62,16.27L4.03,17.68L6.17,15.58C6.74,15.16 7.32,14.92 7.32,14.58Z"/></svg>`,
    //   color: 'text-red-500',
    //   size: 45,
    // },
    // {
    //   svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.5,4.5C19.85,4.5 21,5.65 21,7C21,8.35 19.85,9.5 18.5,9.5C17.15,9.5 16,8.35 16,7C16,5.65 17.15,4.5 18.5,4.5M4.5,19.5C3.15,19.5 2,18.35 2,17C2,15.65 3.15,14.5 4.5,14.5C5.85,14.5 7,15.65 7,17C7,18.35 5.85,19.5 4.5,19.5M19,12C20.66,12 22,13.34 22,15C22,16.66 20.66,18 19,18C18.1,18 17.29,17.62 16.7,17L11.53,14.77C11.31,16.03 10.57,17.12 9.54,17.82L10.72,21H11C12.66,21 14,22.34 14,24H4C4,22.34 5.34,21 7,21H7.28L8.46,17.82C7.43,17.12 6.69,16.03 6.47,14.77L1.3,17C0.71,17.62 0.1,18 0,18C0,16.34 1.34,15 3,15C3.55,15 4.06,15.18 4.5,15.5L9.5,13.3C9.5,12.43 9.75,11.6 10.2,10.9L7.2,7.9C6.84,7.97 6.44,8 6,8C4.34,8 3,6.66 3,5C3,3.34 4.34,2 6,2C7.66,2 9,3.34 9,5C9,5.44 8.97,5.84 8.9,6.2L11.9,9.2C12.6,8.75 13.43,8.5 14.3,8.5L15.5,3.5C15.18,3.06 15,2.55 15,2C15,0.34 16.34,0 18,0C19.66,0 21,1.34 21,3C21,4.66 19.66,6 18,6C17.45,6 16.94,5.82 16.5,5.5L15.3,10.5C17.1,10.77 18.42,12.42 18.42,14.3L19,12" /></svg>`,
    //   color: 'text-emerald-500',
    //   size: 45,
    // },
  ];

  // Create arrays for animated particles and motion blurs
  const particles = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      {/* Multiple gradient layers for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background/20 via-purple-500/5 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/5 via-background/5 to-indigo-500/5" />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 15,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* Floating background particles */}
      {particles.map((index) => (
        <BackgroundParticle key={index} index={index} />
      ))}

      {/* Tech icons */}
      {techElements.map((element, index) => (
        <TechElement
          key={index}
          svg={element.svg}
          color={element.color}
          size={element.size}
          index={index}
        />
      ))}

      {/* Animated grid overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, #8a8a8a 1px, transparent 1px), linear-gradient(to bottom, #8a8a8a 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
        }}
      />

      {/* Foreground glow effect */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-purple-500/20 blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />

        <motion.div
          className="absolute top-1/3 left-1/4 w-48 h-48 rounded-full bg-blue-500/20 blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 2,
          }}
        />
      </div>

      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background/90" />
    </div>
  );
};

export default HeroBackground;
