"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
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
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Colonne gauche - Contenu textuel */}
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800">
              <Sparkles className="h-4 w-4 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                Amélioration par IA
              </span>
            </div>
            
            <h1 className="font-barlow text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Nettoyez vos pièces automobiles avec 
              <span className="text-gradient block"> qualité professionnelle</span>
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
              AutoShine utilise une IA avancée pour nettoyer vos pièces automobiles en quelques secondes. Suppression de saleté, rayures et restauration de l'éclat original
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/#examples">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Voir les exemples
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start space-x-4 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-primary-100 border-2 border-white dark:border-gray-900 flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-primary-700">
                      {i}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">500+</span> concessionnaires font confiance à AutoShine
              </p>
            </div>
          </div>

          {/* Colonne droite - Comparaison d'images */}
          <div className="lg:w-1/2 w-full max-w-lg mx-auto lg:max-w-none">
            <div 
              ref={refSlider}
              className="image-comparison w-full h-[400px] shadow-xl rounded-xl overflow-hidden"
              onMouseDown={gererAppuiSouris}
              onMouseUp={gererRelachementSouris}
              onMouseMove={gererMouvementSouris}
              onTouchMove={gererMouvementTactile}
              onTouchStart={gererAppuiSouris}
              onTouchEnd={gererRelachementSouris}
            >
              {/* Image avant */}
              <Image
                src="/images/before-after/before.jpg"
                alt="Avant amélioration"
                width={800}
                height={600}
                className="object-cover"
              />
              
              {/* Image après */}
              <div 
                className="after-image" 
                style={{ width: `${positionSlider}%` }}
              >
                <Image
                  src="/images/before-after/after.jpg"
                  alt="Après amélioration"
                  width={800}
                  height={600}
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
            
            <div className="flex justify-between mt-2 text-sm font-medium">
              <span className="text-gray-500">Avant</span>
              <span className="text-primary-600">Après</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;