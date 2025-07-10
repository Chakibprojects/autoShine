"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface PropsComparaisonImage {
  imageAvant: string;
  imageApres: string;
  alt: string;
  className?: string;
}

const ComparaisonImage = ({
  imageAvant,
  imageApres,
  alt,
  className = "",
}: PropsComparaisonImage) => {
  const [positionSlider, setPositionSlider] = useState(50);
  const refSlider = useRef<HTMLDivElement>(null);
  const enGlissement = useRef(false);

  const gererAppuiSouris = () => {
    enGlissement.current = true;
  };

  const gererRelachementSouris = () => {
    enGlissement.current = false;
  };

  const gererMouvementSouris = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enGlissement.current || !refSlider.current) return;
    
    const rect = refSlider.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const pourcentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    setPositionSlider(pourcentage);
  };

  const gererMouvementTactile = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!refSlider.current) return;
    
    const toucher = e.touches[0];
    const rect = refSlider.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(toucher.clientX - rect.left, rect.width));
    const pourcentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    setPositionSlider(pourcentage);
  };

  useEffect(() => {
    const gererRelachementGlobal = () => {
      enGlissement.current = false;
    };

    window.addEventListener("mouseup", gererRelachementGlobal);
    return () => {
      window.removeEventListener("mouseup", gererRelachementGlobal);
    };
  }, []);

  return (
    <div 
      ref={refSlider}
      className={`image-comparison ${className}`}
      onMouseDown={gererAppuiSouris}
      onMouseUp={gererRelachementSouris}
      onMouseMove={gererMouvementSouris}
      onTouchMove={gererMouvementTactile}
      onTouchStart={gererAppuiSouris}
      onTouchEnd={gererRelachementSouris}
    >
      {/* Image avant */}
      <Image
        src={imageAvant}
        alt={`Avant: ${alt}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
      
      {/* Image après */}
      <div 
        className="after-image" 
        style={{ width: `${positionSlider}%` }}
      >
        <Image
          src={imageApres}
          alt={`Après: ${alt}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      
      {/* Poignée du slider */}
      <div 
        className="slider-handle" 
        style={{ left: `${positionSlider}%` }}
        onMouseDown={gererAppuiSouris}
        onTouchStart={gererAppuiSouris}
      />
    </div>
  );
};

export default ComparaisonImage;