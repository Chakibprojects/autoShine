import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Comment fonctionne l'amélioration photo par IA ?",
      answer:
        "AutoShine utilise des algorithmes d'apprentissage automatique avancés entraînés sur des milliers de photos de voitures professionnelles. Notre IA analyse votre image, identifie les zones à améliorer et applique des améliorations précises à l'éclairage, la couleur, le contraste et plus encore—tout en maintenant un aspect naturel qui présente votre véhicule avec précision",
    },
    {
      question: "Combien de photos puis-je améliorer avec chaque plan ?",
      answer:
        "Notre Essai Gratuit inclut 3 améliorations de photos. Le plan Basic permet 100 images par mois, le plan Pro inclut 500 images par mois, et le plan Enterprise offre un traitement photo illimité. Les crédits non utilisés ne sont pas reportés au mois suivant",
    },
    {
      question: "Dois-je installer un logiciel ?",
      answer:
        "Non, AutoShine est une plateforme SaaS 100% web. Il n'y a aucun logiciel à télécharger ou installer. Vous pouvez accéder et utiliser AutoShine depuis n'importe quel navigateur web moderne sur ordinateur ou appareils mobiles",
    },
    {
      question: "Combien de temps faut-il pour traiter une image ?",
      answer:
        "La plupart des images sont traitées en 3-5 secondes. Le temps de traitement peut varier légèrement selon la taille et la complexité de l'image, mais notre système est optimisé pour la vitesse sans sacrifier la qualité",
    },
    {
      question: "Puis-je traiter plusieurs images à la fois ?",
      answer:
        "Oui ! Tous les plans payants incluent le traitement par lots, vous permettant de télécharger et améliorer plusieurs images simultanément. C'est parfait pour les concessionnaires avec de gros inventaires qui ont besoin d'un traitement efficace",
    },
    {
      question: "Mes photos améliorées auront-elles l'air fausses ou sur-traitées ?",
      answer:
        "Non, AutoShine est spécifiquement conçu pour créer des améliorations d'aspect naturel qui maintiennent l'authenticité de votre véhicule. Notre IA se concentre sur la mise en valeur des meilleures caractéristiques de votre voiture sans créer une apparence irréaliste ou trop retouchée",
    },
    {
      question: "Puis-je personnaliser les paramètres d'amélioration ?",
      answer:
        "Oui, bien que notre IA applique automatiquement des améliorations optimales, vous pouvez ajuster l'intensité de divers effets comme la luminosité, le contraste et la saturation des couleurs selon vos préférences. Les plans Pro et Enterprise offrent plus d'options de personnalisation",
    },
    {
      question: "Y a-t-il une limite de taille de fichier ou de résolution d'image ?",
      answer:
        "Le plan Basic supporte les images jusqu'à 12MP. Les plans Pro et Enterprise supportent les images jusqu'à 24MP. Pour une vitesse et qualité de traitement optimales, nous recommandons des images entre 3-12MP. Les fichiers extrêmement volumineux peuvent être automatiquement redimensionnés",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Questions fréquemment posées
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Obtenez des réponses aux questions courantes sur les fonctionnalités et capacités d'AutoShine
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Vous avez encore des questions ? Nous sommes là pour vous aider
          </p>
          <a
            href="/contact"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Contactez notre équipe de support →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;