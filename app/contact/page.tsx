"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import Link from "next/link";

export default function PageContact() {
  const [enSoumission, setEnSoumission] = useState(false);
  const [donneesFormulaire, setDonneesFormulaire] = useState({
    nom: "",
    email: "",
    entreprise: "",
    sujet: "",
    message: ""
  });

  const gererChangementInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDonneesFormulaire(precedent => ({
      ...precedent,
      [name]: value
    }));
  };

  const gererSoumission = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnSoumission(true);
    
    // Simulation d'envoi de formulaire
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Réinitialisation du formulaire
    setDonneesFormulaire({
      nom: "",
      email: "",
      entreprise: "",
      sujet: "",
      message: ""
    });
    
    setEnSoumission(false);
    alert("Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Link href="/" className="flex items-center space-x-2">
                <Car className="h-8 w-8 text-primary-600" />
                <span className="font-barlow font-bold text-2xl bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                  AutoShine
                </span>
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contactez-nous
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Une question sur AutoShine ? Besoin d'une démonstration personnalisée ? 
              Notre équipe est là pour vous aider.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations de contact */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-primary-600" />
                    Informations de contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600 dark:text-gray-400">contact@autoshine.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-gray-600 dark:text-gray-400">+33 1 23 45 67 89</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        123 Avenue de l'Innovation<br />
                        75001 Paris, France
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Horaires d'ouverture</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Lundi - Vendredi</span>
                      <span className="text-gray-600 dark:text-gray-400">9h00 - 18h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samedi</span>
                      <span className="text-gray-600 dark:text-gray-400">10h00 - 16h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimanche</span>
                      <span className="text-gray-600 dark:text-gray-400">Fermé</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support technique</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Besoin d'aide technique ? Notre équipe de support est disponible 24h/24.
                  </p>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    support@autoshine.com
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Formulaire de contact */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Envoyez-nous un message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={gererSoumission} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="nom" className="block text-sm font-medium mb-2">
                          Nom complet *
                        </label>
                        <Input
                          id="nom"
                          name="nom"
                          type="text"
                          value={donneesFormulaire.nom}
                          onChange={gererChangementInput}
                          placeholder="Jean Dupont"
                          required
                          disabled={enSoumission}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={donneesFormulaire.email}
                          onChange={gererChangementInput}
                          placeholder="jean@exemple.com"
                          required
                          disabled={enSoumission}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="entreprise" className="block text-sm font-medium mb-2">
                          Entreprise
                        </label>
                        <Input
                          id="entreprise"
                          name="entreprise"
                          type="text"
                          value={donneesFormulaire.entreprise}
                          onChange={gererChangementInput}
                          placeholder="Nom de votre entreprise"
                          disabled={enSoumission}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="sujet" className="block text-sm font-medium mb-2">
                          Sujet *
                        </label>
                        <Input
                          id="sujet"
                          name="sujet"
                          type="text"
                          value={donneesFormulaire.sujet}
                          onChange={gererChangementInput}
                          placeholder="Demande de démonstration"
                          required
                          disabled={enSoumission}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={donneesFormulaire.message}
                        onChange={gererChangementInput}
                        placeholder="Décrivez votre demande ou vos questions..."
                        rows={6}
                        required
                        disabled={enSoumission}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={enSoumission}>
                      {enSoumission ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section FAQ */}
          <div className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Questions fréquentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Combien de temps pour une réponse ?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Nous répondons généralement dans les 2 heures pendant les heures ouvrables.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Proposez-vous des démonstrations ?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Oui, nous offrons des démonstrations personnalisées pour tous les plans Pro et Enterprise.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Support technique disponible ?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Notre support technique est disponible 24h/24 pour tous les utilisateurs payants.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Intégrations personnalisées ?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Nous développons des intégrations sur mesure pour les clients Enterprise.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}