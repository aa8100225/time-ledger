import { useRef, useState } from "react";
import clsx from "clsx";

interface Ripple {
  id: number;
  left: number;
  top: number;
  diameter: number;
}

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children?: React.ReactNode;
}

export default function RippleButton({
  onClick,
  className,
  children,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    const left = event.clientX - (button.offsetLeft + radius);
    const top = event.clientY - (button.offsetTop + radius);
    const newRipple: Ripple = {
      id: Date.now(),
      left,
      top,
      diameter,
    };

    setRipples((currentRipples) => [...currentRipples, newRipple]);
    onClick?.(event);
  };

  const handleAnimationEnd = (id: number) => {
    setRipples((currentRipples) =>
      currentRipples.filter((ripple) => ripple.id !== id)
    );
  };

  return (
    <button
      ref={buttonRef}
      onClick={createRipple}
      className={clsx("relative overflow-hidden", className ?? "")}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="animate-ripple pointer-events-none absolute scale-0 transform rounded-full bg-white opacity-70"
          style={{
            width: ripple.diameter,
            height: ripple.diameter,
            left: ripple.left,
            top: ripple.top,
          }}
          onAnimationEnd={() => handleAnimationEnd(ripple.id)}
        />
      ))}
      {children}
    </button>
  );
}
