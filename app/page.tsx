// Importation des composants de la page d'accueil
import PageAccueil from "@/components/home/hero";
import Fonctionnalites from "@/components/home/features";
import Tarifs from "@/components/home/pricing";
import Temoignages from "@/components/home/testimonials";
import FAQ from "@/components/home/faq";
import ContactezNous from "@/components/home/call-to-action";

// Composant principal de la page d'accueil
export default function PagePrincipale() {
  // Structure de la page avec tous les composants
  return (
    <div className="page-accueil">
      {/* Section héro avec présentation du service */}
      <PageAccueil />
      
      {/* Présentation des fonctionnalités principales */}
      <Fonctionnalites />
      
      {/* Avis de nos clients */}
      <Temoignages />
      
      {/* Grille tarifaire */}
      <Tarifs />
      
      {/* Questions fréquentes */}
      <FAQ />
      
      {/* Section de contact */}
      <ContactezNous />
    </div>
  );
}