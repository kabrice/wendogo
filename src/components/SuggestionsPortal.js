import { createPortal } from 'react-dom';
import { useEffect, useState, useRef } from 'react';

const SuggestionsPortal = ({ children, targetRef, show }) => {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (targetRef.current && show) {
      const updatePosition = () => {
        const rect = targetRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY + 4,
          left: rect.left + window.scrollX,
          width: rect.width
        });
      };

      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [targetRef, show]);

  if (!mounted || !show) return null;

  return createPortal(
    <div
      className="absolute bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 sm:max-h-60 overflow-y-auto z-[70]"
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
        maxWidth: '896px'
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export default SuggestionsPortal;
