import Image from "next/image";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselPrevious,
  CarouselNext 
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "AutoShine a complètement transformé nos annonces en ligne. Les photos améliorées attirent plus d'acheteurs et nous aident à vendre les véhicules plus rapidement.",
    author: "Michel Dubois",
    role: "Directeur des ventes, Groupe Auto Dubois",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    rating: 5,
  },
  {
    quote: "La différence avant/après est incroyable. Nous avons vu une augmentation de 30% de l'engagement sur nos annonces depuis que nous utilisons AutoShine pour nos photos d'inventaire.",
    author: "Sarah Martin",
    role: "Directrice marketing, Autos de Luxe",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    rating: 5,
  },
  {
    quote: "Je passais des heures à retoucher les photos de voitures. Maintenant je les télécharge simplement sur AutoShine et j'obtiens des résultats professionnels en quelques secondes. Révolutionnaire !",
    author: "David Rodriguez",
    role: "Vendeur indépendant",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    rating: 5,
  },
  {
    quote: "La fonctionnalité de traitement par lots nous fait économiser d'innombrables heures chaque semaine. Tout notre inventaire a l'air professionnel avec un effort minimal.",
    author: "Jennifer Liu",
    role: "Responsable des opérations, Motors Pacifique",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Approuvé par les concessionnaires et vendeurs
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Découvrez pourquoi les professionnels de l'automobile choisissent AutoShine pour leurs besoins d'amélioration d'images
          </p>
        </div>

        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl h-full flex flex-col">
                  <div className="flex mb-4">
                    {Array(5).fill(0).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  
                  <blockquote className="flex-grow">
                    <p className="text-gray-700 dark:text-gray-300 italic mb-6">
                      "{testimonial.quote}"
                    </p>
                  </blockquote>
                  
                  <div className="flex items-center mt-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
        
        <div className="flex justify-center mt-8 md:hidden">
          <div className="flex space-x-2">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;