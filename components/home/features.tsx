import { Car, Settings, Sparkles } from "lucide-react";
import { 
  Paintbrush, 
  Gauge, 
  Upload, 
  Download, 
  BarChart 
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-primary-600" />,
      title: "Nettoyage IA",
      description: "Supprimez automatiquement la saleté, les rayures et restaurez l'éclat original de vos pièces automobiles",
    },
    {
      icon: <Paintbrush className="h-6 w-6 text-primary-600" />,
      title: "Restauration matériaux",
      description: "Restaurez l'apparence d'origine de vos pièces selon leur matériau : cuir, plastique, métal, etc",
    },
    {
      icon: <Car className="h-6 w-6 text-primary-600" />,
      title: "15+ Types de pièces",
      description: "Support de nombreuses pièces : volant, jantes, sièges, phares, pare-chocs et bien plus",
    },
    {
      icon: <Settings className="h-6 w-6 text-primary-600" />,
      title: "Nettoyage adaptatif",
      description: "Algorithmes spécialisés pour chaque type de pièce et matériau pour un résultat optimal",
    },
    {
      icon: <Gauge className="h-6 w-6 text-primary-600" />,
      title: "Traitement rapide",
      description: "Obtenez des résultats professionnels en quelques secondes, pas en heures. Traitez tout votre inventaire rapidement",
    },
    {
      icon: <Upload className="h-6 w-6 text-primary-600" />,
      title: "Téléchargement par lots",
      description: "Téléchargez et traitez plusieurs images à la fois pour gagner du temps et rationaliser votre flux de travail",
    },
    {
      icon: <Download className="h-6 w-6 text-primary-600" />,
      title: "Export facile",
      description: "Téléchargez les images améliorées dans différents formats et résolutions adaptés à toute plateforme",
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary-600" />,
      title: "Analyses d'utilisation",
      description: "Suivez votre historique d'amélioration et optimisez votre flux de travail de traitement photo",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nettoyage IA professionnel pour pièces automobiles
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Notre plateforme alimentée par l'IA offre tout ce dont vous avez besoin pour nettoyer et restaurer vos pièces automobiles à leur état d'origine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
            >
              <div className="h-12 w-12 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;