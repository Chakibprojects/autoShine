import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="py-20 bg-primary-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à transformer vos photos automobiles ?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des centaines de concessionnaires et vendeurs qui attirent plus d'acheteurs avec des photos de qualité professionnelle
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Commencer votre essai gratuit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600 bg-transparent"
              >
                Planifier une démo
              </Button>
            </Link>
          </div>
          <p className="text-primary-200 mt-6">
            Aucune carte de crédit requise. Annulation à tout moment
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;