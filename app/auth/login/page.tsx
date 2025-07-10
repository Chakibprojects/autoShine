"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, Loader2 } from "lucide-react";

export default function PageConnexion() {
  const [enChargement, setEnChargement] = useState(false);
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const routeur = useRouter();

  function gererSoumission(e: React.FormEvent) {
    e.preventDefault();
    setEnChargement(true);
    
    // Simulation de connexion plus fluide
    setTimeout(() => {
      setEnChargement(false);
      routeur.push("/dashboard");
    }, 300);
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-primary-600" />
            <span className="font-barlow font-bold text-2xl bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              AutoShine
            </span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
          Accès à l'outil de nettoyage IA
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Entrez n'importe quels identifiants pour tester
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={gererSoumission} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email (test)
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="test@autoshine.com"
                required
                disabled={enChargement}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Mot de passe (test)
              </label>
              <Input
                id="password"
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                placeholder="password123"
                required
                disabled={enChargement}
              />
            </div>

            <Button type="submit" className="w-full" disabled={enChargement}>
              {enChargement ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connexion...
                </>
              ) : (
                "Accéder à l'outil"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Mode test - utilisez n'importe quels identifiants valides
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}