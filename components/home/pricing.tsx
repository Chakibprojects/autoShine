import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Pricing = () => {
  const plans = [
    {
      name: "Essai gratuit",
      price: "0",
      description: "Essayez avant d'acheter avec notre essai sans engagement",
      features: ["3 améliorations d'images", "Édition d'image de base", "Exports en résolution standard", "Support 24h"],
      cta: "Commencer l'essai gratuit",
      popular: false,
    },
    {
      name: "Basic",
      price: "49",
      description: "Parfait pour les petits concessionnaires et vendeurs individuels",
      features: ["100 images par mois", "Fonctionnalités d'amélioration avancées", "Exports en résolution HD", "Support email prioritaire", "Traitement par lots"],
      cta: "Choisir Basic",
      popular: false,
    },
    {
      name: "Pro",
      price: "99",
      description: "Idéal pour les concessionnaires en croissance avec des inventaires plus importants",
      features: ["500 images par mois", "Toutes les fonctionnalités d'amélioration", "Exports en résolution Ultra HD", "Support téléphonique prioritaire", "Traitement par lots", "Marque personnalisée", "Analyses avancées"],
      cta: "Choisir Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Sur mesure",
      description: "Solutions sur mesure pour les grands réseaux de concessionnaires",
      features: ["Images illimitées", "Toutes les fonctionnalités d'amélioration", "Exports en résolution Ultra HD", "Gestionnaire de compte dédié", "Traitement par lots", "Marque personnalisée", "Analyses avancées", "Accès API", "Intégrations personnalisées"],
      cta: "Contacter les ventes",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tarification simple et transparente
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choisissez le plan qui correspond à vos besoins. Tous les plans incluent notre technologie d'amélioration IA de base
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border ${
                plan.popular
                  ? "border-primary-400 dark:border-primary-500"
                  : "border-gray-200 dark:border-gray-700"
              } overflow-hidden transition-all duration-300 hover:shadow-md`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                  Plus populaire
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">
                    {plan.price === "Sur mesure" ? "" : "€"}
                    {plan.price}
                  </span>
                  {plan.price !== "Sur mesure" && (
                    <span className="text-gray-500 dark:text-gray-400 ml-1">/mois</span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/auth/signup">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-primary-600 hover:bg-primary-700"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Besoin d'une solution personnalisée ? Contactez notre équipe commerciale pour un devis sur mesure
          </p>
          <Link href="/contact">
            <Button variant="link" className="text-primary-600">
              Contacter les ventes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing;