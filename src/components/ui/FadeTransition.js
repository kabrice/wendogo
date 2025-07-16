import React, { useState, useEffect } from 'react';

const FadeTransition = ({ 
  show, 
  children, 
  className = "", 
  duration = 300,
  enterFrom = "opacity-0 translate-y-2",
  enterTo = "opacity-100 translate-y-0",
  leaveFrom = "opacity-100 translate-y-0",
  leaveTo = "opacity-0 -translate-y-2"
}) => {
  const [shouldRender, setShouldRender] = useState(show);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      // Petit délai pour déclencher l'animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [show]);

  const onTransitionEnd = () => {
    if (!show) {
      setShouldRender(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`transition-all duration-${duration} ${
        isVisible ? enterTo : show ? enterFrom : leaveTo
      } ${className}`}
      onTransitionEnd={onTransitionEnd}
    >
      {children}
    </div>
  );
};

export default FadeTransition;
