import Link from "next/link";
import { Car } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="h-6 w-6 text-primary-600" />
              <span className="font-barlow font-bold text-xl bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                AutoShine
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Transformez vos photos de voitures en qualité professionnelle avec l'amélioration par IA. Parfait pour les concessionnaires et vendeurs individuels
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-barlow font-semibold text-base mb-4">Produit</h3>
            <ul className="space-y-2">
              {["Fonctionnalités", "Tarifs", "Exemples", "Comment ça marche"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-barlow font-semibold text-base mb-4">Entreprise</h3>
            <ul className="space-y-2">
              {["À propos", "Blog", "Carrières", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-barlow font-semibold text-base mb-4">Légal</h3>
            <ul className="space-y-2">
              {["Conditions d'utilisation", "Politique de confidentialité", "Politique des cookies", "RGPD"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/legal/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} AutoShine. Tous droits réservés.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              {["Twitter", "LinkedIn", "Instagram", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <span className="text-sm">{social}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;