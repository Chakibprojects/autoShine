"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Car, Menu, X, User, LogIn, 
  Sun, Moon
} from "lucide-react";
import { useTheme } from "next-themes";

const BarreNavigation = () => {
  const [estDefilé, setEstDefilé] = useState(false);
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false);
  const cheminActuel = usePathname();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const gererDefilement = () => {
      if (window.scrollY > 10) {
        setEstDefilé(true);
      } else {
        setEstDefilé(false);
      }
    };

    window.addEventListener("scroll", gererDefilement);
    return () => window.removeEventListener("scroll", gererDefilement);
  }, []);

  const basculerTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const liensNavigation = [
    { nom: "Accueil", chemin: "/" },
    { nom: "Fonctionnalités", chemin: "/#features" },
    { nom: "Tarifs", chemin: "/#pricing" },
    { nom: "FAQ", chemin: "/#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        estDefilé
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-primary-600" />
            <span className="font-barlow font-bold text-xl md:text-2xl bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              AutoShine
            </span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {liensNavigation.map((lien) => (
              <Link
                key={lien.nom}
                href={lien.chemin}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  cheminActuel === lien.chemin
                    ? "text-primary-600"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                {lien.nom}
              </Link>
            ))}
          </nav>

          {/* Section droite desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={basculerTheme}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Basculer le thème</span>
            </Button>
            <Link href="/auth/login">
              <Button variant="outline" size="sm" className="flex items-center">
                <LogIn className="mr-1 h-4 w-4" />
                Se connecter
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="flex items-center">
                <User className="mr-1 h-4 w-4" />
                S'inscrire
              </Button>
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuMobileOuvert(!menuMobileOuvert)}
          >
            {menuMobileOuvert ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuMobileOuvert && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-slide-up">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {liensNavigation.map((lien) => (
              <Link
                key={lien.nom}
                href={lien.chemin}
                className={`block py-2 text-base font-medium ${
                  cheminActuel === lien.chemin
                    ? "text-primary-600"
                    : "text-gray-700 dark:text-gray-200"
                }`}
                onClick={() => setMenuMobileOuvert(false)}
              >
                {lien.nom}
              </Link>
            ))}
            <div className="pt-2 flex items-center">
              <Button variant="ghost" size="icon" onClick={basculerTheme}>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Basculer le thème</span>
              </Button>
            </div>
            <div className="pt-4 flex flex-col space-y-2">
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={() => setMenuMobileOuvert(false)}
                >
                  <LogIn className="mr-1 h-4 w-4" />
                  Se connecter
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button
                  className="w-full justify-center"
                  onClick={() => setMenuMobileOuvert(false)}
                >
                  <User className="mr-1 h-4 w-4" />
                  S'inscrire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default BarreNavigation;