"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Download, 
  RotateCcw, 
  Sparkles,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Car,
  Settings,
  CheckCircle
} from "lucide-react";

// Configuration des différents types de pièces automobiles
const PIECES_AUTOMOBILES = {
  steering_wheel: {
    nom: "Volant",
    materiau: "Cuir",
    categorie: "Intérieur",
    icone: "🚗",
    description: "Nettoyage du volant en cuir"
  },
  alloy_wheel: {
    nom: "Jante Alliage",
    materiau: "Aluminium poli",
    categorie: "Roues",
    icone: "⚙️",
    description: "Nettoyage de jante en alliage"
  },
  car_seat: {
    nom: "Siège Auto",
    materiau: "Tissu/Cuir",
    categorie: "Intérieur",
    icone: "💺",
    description: "Nettoyage de siège automobile"
  },
  dashboard: {
    nom: "Tableau de Bord",
    materiau: "Plastique",
    categorie: "Intérieur",
    icone: "📊",
    description: "Nettoyage du tableau de bord"
  },
  bumper: {
    nom: "Pare-chocs",
    materiau: "Plastique peint",
    categorie: "Extérieur",
    icone: "🚙",
    description: "Nettoyage de pare-chocs"
  },
  headlight: {
    nom: "Phare",
    materiau: "Polycarbonate",
    categorie: "Extérieur",
    icone: "💡",
    description: "Nettoyage de phare automobile"
  },
  side_mirror: {
    nom: "Rétroviseur",
    materiau: "Verre/Plastique",
    categorie: "Extérieur",
    icone: "🪞",
    description: "Nettoyage de rétroviseur"
  },
  door_handle: {
    nom: "Poignée de Porte",
    materiau: "Chrome/Plastique",
    categorie: "Extérieur",
    icone: "🚪",
    description: "Nettoyage de poignée"
  },
  gear_shift: {
    nom: "Levier de Vitesse",
    materiau: "Cuir/Plastique",
    categorie: "Intérieur",
    icone: "⚡",
    description: "Nettoyage du levier de vitesse"
  },
  brake_disc: {
    nom: "Disque de Frein",
    materiau: "Acier",
    categorie: "Freinage",
    icone: "🛑",
    description: "Nettoyage de disque de frein"
  },
  airbag: {
    nom: "Airbag de Volant",
    materiau: "Plastique/Cuir",
    categorie: "Sécurité",
    icone: "🛡️",
    description: "Nettoyage de l'airbag au centre du volant"
  },
  carrosserie: {
    nom: "Carrosserie",
    materiau: "Métal peint",
    categorie: "Extérieur",
    icone: "🚗",
    description: "Nettoyage et restauration de la carrosserie"
  },
  "other": {
    "nom": "Autres pièces",
    "materiau": "Divers",
    "categorie": "Général",
    "icone": "🔧",
    "description": "Nettoyage de pièces automobiles diverses"
  }
};

export default function ProcesseurImage() {
  const [imageOriginale, setImageOriginale] = useState<string | null>(null);
  const [imageTraitee, setImageTraitee] = useState<string | null>(null);
  const [enTraitement, setEnTraitement] = useState(false);
  const [progressionTraitement, setProgressionTraitement] = useState(0);
  const [afficherComparaison, setAfficherComparaison] = useState(true);
  const [positionSlider, setPositionSlider] = useState(50);
  const [typePieceSelectionnee, setTypePieceSelectionnee] = useState<string>("");
  const [niveauAmelioration, setNiveauAmelioration] = useState(80);
  const [erreur, setErreur] = useState<string | null>(null);
  const [idTraitement, setIdTraitement] = useState<string | null>(null);
  const [typeErreur, setTypeErreur] = useState<'network' | 'timeout' | 'server' | 'config' | 'general' | null>(null);
  const refInputFichier = useRef<HTMLInputElement>(null);
  const refSlider = useRef<HTMLDivElement>(null);
  const enGlissement = useRef(false);

  const gererUploadFichier = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const fichier = event.target.files?.[0];
    if (fichier) {
      const lecteur = new FileReader();
      lecteur.onload = (e) => {
        const resultat = e.target?.result as string;
        setImageOriginale(resultat);
        setImageTraitee(null);
        setErreur(null);
        setTypeErreur(null);
        setIdTraitement(null);
      };
      lecteur.readAsDataURL(fichier);
    }
  }, []);

  const traiterImageAvecAPI = useCallback(async () => {
    if (!imageOriginale || !typePieceSelectionnee) {
      setErreur("Veuillez sélectionner une image et un type de pièce");
      return;
    }

    setEnTraitement(true);
    setProgressionTraitement(0);
    setErreur(null);
    setTypeErreur(null);

    try {
      // Simulation du progrès pour une meilleure expérience utilisateur
      const intervalleProgres = setInterval(() => {
        setProgressionTraitement(prev => {
          if (prev < 85) return prev + 15;
          return prev;
        });
      }, 300);

      // Conversion de l'image base64 en File
      const reponse = await fetch(imageOriginale);
      const blob = await reponse.blob();
      const fichier = new File([blob], 'image.jpg', { type: 'image/jpeg' });

      // Préparation des données pour l'API
      const donneesFormulaire = new FormData();
      donneesFormulaire.append('file', fichier);
      donneesFormulaire.append('part_type', typePieceSelectionnee);
      donneesFormulaire.append('enhancement_level', (niveauAmelioration / 100).toString());

      let reponseAPI;
      try {
        reponseAPI = await fetch('/api/clean-part', {
          method: 'POST',
          body: donneesFormulaire,
          signal: AbortSignal.timeout(180000), // 3 minutes timeout
        });
      } catch (erreurFetch) {
        clearInterval(intervalleProgres);
        if (erreurFetch instanceof Error && erreurFetch.name === 'AbortError') {
          setTypeErreur('timeout');
          throw new Error('Le traitement prend trop de temps (plus de 3 minutes). ModelsLab est très surchargé. Réessayez avec une image plus petite ou patientez 10-15 minutes.');
        }
        setTypeErreur('network');
        throw new Error('Impossible de contacter le serveur. Vérifiez votre connexion internet.');
      }

      clearInterval(intervalleProgres);

      if (!reponseAPI.ok) {
        let messageErreur = 'Erreur lors du traitement';
        let typeErreurLocal: typeof typeErreur = 'server';
        
        try {
          const donneesErreur = await reponseAPI.json();
          messageErreur = donneesErreur.detail || messageErreur;
          
          // Détermination du type d'erreur selon le code de statut
          if (reponseAPI.status === 401) {
            typeErreurLocal = 'config';
          } else if (reponseAPI.status === 408 || reponseAPI.status === 504) {
            typeErreurLocal = 'timeout';
          } else if (reponseAPI.status === 401 || reponseAPI.status === 403) {
            typeErreurLocal = 'server';
          } else if (reponseAPI.status === 408 || reponseAPI.status === 504 || reponseAPI.status === 524) {
            typeErreurLocal = 'server';
          } else if (reponseAPI.status === 429 || reponseAPI.status === 503) {
            typeErreurLocal = 'general';
          }
            
          if (messageErreur.includes('ModelsLab rencontre actuellement des difficultés')) {
            typeErreurLocal = 'server';
          }
        } catch (erreur: any) {
          if (reponseAPI.status === 524) {
            typeErreurLocal = 'timeout';
            messageErreur = 'Le service ModelsLab met trop de temps à répondre. Cela indique une surcharge temporaire de leurs serveurs.';
          } else if (reponseAPI.status >= 500) {
            typeErreurLocal = 'server';
            messageErreur = `Erreur serveur (${reponseAPI.status}). Le service rencontre des difficultés techniques temporaires.`;
          } else {
            typeErreurLocal = 'general';
            messageErreur = `Erreur ${reponseAPI.status}: ${reponseAPI.statusText}`;
          }
        }
        
        setTypeErreur(typeErreurLocal);
        throw new Error(messageErreur);
      }

      const resultat = await reponseAPI.json();
      
      setProgressionTraitement(100);
      setImageTraitee(resultat.processed_image_url);
      setIdTraitement(resultat.processing_id);

    } catch (erreur) {
      console.error('Erreur lors du traitement:', erreur);
      let messageErreur = 'Erreur lors du traitement de l\'image';
      
      if (erreur instanceof Error) {
        if (erreur.message.includes('Failed to fetch') || erreur.message.includes('contacter le serveur')) {
          setTypeErreur('network');
          messageErreur = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
        } else if (erreur.message.includes('timeout') || erreur.message.includes('trop de temps')) {
          setTypeErreur('timeout');
          messageErreur = erreur.message;
        } else {
          setTypeErreur('general');
          messageErreur = erreur.message;
        }
      }
      
      setErreur(messageErreur);
      setProgressionTraitement(0);
    } finally {
      setEnTraitement(false);
    }
  }, [imageOriginale, typePieceSelectionnee, niveauAmelioration]);

  const gererReset = () => {
    setImageTraitee(null);
    setTypePieceSelectionnee("");
    setNiveauAmelioration(80);
    setProgressionTraitement(0);
    setErreur(null);
    setTypeErreur(null);
    setIdTraitement(null);
  };

  const gererTelechargement = () => {
    if (imageTraitee) {
      const nomPiece = pieceSelectionnee?.nom.replace(/\s+/g, '-').toLowerCase() || 'piece';
      const horodatage = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const nomFichier = `autoshine-${nomPiece}-${horodatage}.jpg`;
      
      fetch(imageTraitee)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const lien = document.createElement('a');
          lien.href = url;
          lien.download = nomFichier;
          document.body.appendChild(lien);
          lien.click();
          document.body.removeChild(lien);
          window.URL.revokeObjectURL(url);
        })
        .catch(erreur => {
          console.error('Erreur lors du téléchargement:', erreur);
          // Solution de secours : téléchargement direct
          const lien = document.createElement('a');
          lien.href = imageTraitee;
          lien.download = nomFichier;
          lien.target = '_blank';
          document.body.appendChild(lien);
          lien.click();
          document.body.removeChild(lien);
        });
    }
  };

  // Gestion du slider de comparaison
  const gererAppuiSouris = () => {
    enGlissement.current = true;
  };

  const gererRelachementSouris = () => {
    enGlissement.current = false;
  };

  const gererMouvementSouris = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enGlissement.current || !refSlider.current) return;
    
    const rect = refSlider.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const pourcentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    setPositionSlider(pourcentage);
  };

  const pieceSelectionnee = typePieceSelectionnee ? PIECES_AUTOMOBILES[typePieceSelectionnee as keyof typeof PIECES_AUTOMOBILES] : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Nettoyage IA de Pièces Automobiles</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Uploadez une photo de pièce automobile et laissez l'IA la nettoyer automatiquement
          </p>
        </div>
        {imageTraitee && (
          <div className="text-sm text-green-600 font-medium flex items-center">
            <CheckCircle className="h-4 w-4 mr-1" />
            Pièce nettoyée avec succès
          </div>
        )}
      </div>

      {erreur && (
        <Card className={`border-2 ${
          typeErreur === 'timeout' ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20' :
          typeErreur === 'server' ? 'border-orange-300 bg-orange-50 dark:bg-orange-900/20' :
          typeErreur === 'network' ? 'border-red-300 bg-red-50 dark:bg-red-900/20' :
          typeErreur === 'config' ? 'border-purple-300 bg-purple-50 dark:bg-purple-900/20' :
          'border-gray-300 bg-gray-50 dark:bg-gray-900/20'
        }`}>
          <CardContent className="p-4">
            <div className={`flex items-start space-x-3 ${
              typeErreur === 'timeout' ? 'text-yellow-800 dark:text-yellow-200' :
              typeErreur === 'server' ? 'text-orange-800 dark:text-orange-200' :
              typeErreur === 'network' ? 'text-red-800 dark:text-red-200' :
              typeErreur === 'config' ? 'text-purple-800 dark:text-purple-200' :
              'text-gray-800 dark:text-gray-200'
            }`}>
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">
                  {typeErreur === 'timeout' ? '⏱️ Problème de délai' :
                   typeErreur === 'server' ? '🔧 Problème serveur' :
                   typeErreur === 'network' ? '🌐 Problème de connexion' :
                   typeErreur === 'config' ? '⚙️ Problème de configuration' :
                   '❌ Erreur'}
                </div>
                <div className="text-sm">{erreur}</div>
                
                <div className="mt-2 text-xs opacity-80">
                  {typeErreur === 'timeout' && (
                    <div>
                      <strong>Suggestions :</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        <li>Réessayez dans quelques minutes (surcharge temporaire)</li>
                        <li>Utilisez une image plus petite (moins de 2MB)</li>
                        <li>Réduisez l'intensité de nettoyage</li>
                      </ul>
                    </div>
                  )}
                  {typeErreur === 'server' && (
                    <div>
                      <strong>Suggestions :</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        <li>Problème temporaire côté ModelsLab (pas votre application)</li>
                        <li>Réessayez dans 2-3 minutes</li>
                        <li>Si le problème persiste, attendez 10-15 minutes</li>
                        <li>Ceci est normal lors de pics d'utilisation</li>
                      </ul>
                    </div>
                  )}
                  {typeErreur === 'network' && (
                    <div>
                      <strong>Suggestions :</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        <li>Vérifiez votre connexion internet</li>
                        <li>Réessayez dans quelques secondes</li>
                        <li>Changez de réseau si possible</li>
                      </ul>
                    </div>
                  )}
                  {typeErreur === 'config' && (
                    <div>
                      <strong>Action requise :</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        <li>Contactez l'administrateur</li>
                        <li>Problème de configuration API</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Zone de téléchargement */}
      {!imageOriginale && (
        <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700">
          <CardContent className="p-8 text-center">
            <div className="h-16 w-16 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
              <Upload className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              Téléchargez une photo de pièce automobile
            </h3>
            
            <div className="mt-3 flex items-center space-x-2 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 dark:text-green-400">Service actif</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 dark:text-gray-400">
                Traitement par ModelsLab AI
              </span>
            </div>
            <Button onClick={() => refInputFichier.current?.click()} className="mt-4">
              Sélectionner une image
            </Button>
            <input
              ref={refInputFichier}
              type="file"
              accept="image/*"
              onChange={gererUploadFichier}
              className="hidden"
            />
          </CardContent>
        </Card>
      )}

      {/* Interface de traitement */}
      {imageOriginale && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Prévisualisation */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">
                    {imageTraitee ? "Comparaison avant/après" : "Image originale"}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {imageTraitee && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAfficherComparaison(!afficherComparaison)}
                      >
                        {afficherComparaison ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        {afficherComparaison ? "Comparaison" : "Résultat seul"}
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setImageOriginale(null);
                        setImageTraitee(null);
                        setTypePieceSelectionnee("");
                        setNiveauAmelioration(80);
                        setProgressionTraitement(0);
                        setErreur(null);
                        setTypeErreur(null);
                        setIdTraitement(null);
                        if (refInputFichier.current) {
                          refInputFichier.current.value = '';
                        }
                      }}
                    >
                      <Upload className="h-4 w-4 mr-1" />
                      Nouvelle image
                    </Button>
                    <Button variant="outline" size="sm" onClick={gererReset}>
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                  </div>
                </div>

                {afficherComparaison && imageTraitee ? (
                  <div 
                    ref={refSlider}
                    className="relative w-full h-[400px] rounded-lg overflow-hidden border cursor-ew-resize"
                    onMouseDown={gererAppuiSouris}
                    onMouseUp={gererRelachementSouris}
                    onMouseMove={gererMouvementSouris}
                    onMouseLeave={gererRelachementSouris}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={imageOriginale}
                        alt="Image originale"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div 
                      className="absolute top-0 left-0 h-full overflow-hidden"
                      style={{ width: `${positionSlider}%` }}
                    >
                      <Image
                        src={imageTraitee}
                        alt="Image nettoyée par IA"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div 
                      className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
                      style={{ left: `${positionSlider}%` }}
                    >
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-primary-500">
                        <div className="text-primary-600 font-bold text-xs">↔</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-[400px] rounded-lg overflow-hidden relative border">
                    <Image
                      src={imageTraitee || imageOriginale}
                      alt={imageTraitee ? "Image nettoyée par IA" : "Image originale"}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                )}

                {afficherComparaison && imageTraitee && (
                  <div className="flex justify-between mt-2 text-sm font-medium">
                    <span className="text-gray-500">← Avant (original)</span>
                    <span className="text-primary-600">Après (nettoyé par IA) →</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contrôles */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-4 flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuration du nettoyage
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Type de pièce automobile
                    </label>
                    <Select value={typePieceSelectionnee} onValueChange={setTypePieceSelectionnee}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le type de pièce" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(PIECES_AUTOMOBILES).map(([cle, piece]) => (
                          <SelectItem key={cle} value={cle}>
                            <div className="flex items-center space-x-2">
                              <span>{piece.icone}</span>
                              <div>
                                <div className="font-medium">{piece.nom}</div>
                                <div className="text-xs text-gray-500">{piece.materiau} • {piece.categorie}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {pieceSelectionnee && (
                      <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{pieceSelectionnee.categorie}</Badge>
                          <span className="text-blue-700 dark:text-blue-300">
                            {pieceSelectionnee.description}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Intensité de nettoyage: {niveauAmelioration}%
                    </label>
                    <Slider
                      value={[niveauAmelioration]}
                      onValueChange={(valeur) => setNiveauAmelioration(valeur[0])}
                      max={100}
                      min={10}
                      step={5}
                      className="w-full"
                      disabled={enTraitement}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {niveauAmelioration < 40 ? "Nettoyage léger" : 
                       niveauAmelioration < 70 ? "Nettoyage standard" : "Nettoyage intensif"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Button 
                    onClick={traiterImageAvecAPI} 
                    className="w-full"
                    disabled={enTraitement || !typePieceSelectionnee}
                  >
                    {enTraitement ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Nettoyage IA...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Nettoyer avec IA
                      </>
                    )}
                  </Button>

                  {imageTraitee && !enTraitement && (
                    <Button 
                      variant="outline" 
                      onClick={gererTelechargement}
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le résultat
                    </Button>
                  )}
                </div>

                {enTraitement && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Traitement IA...</span>
                      <span>{progressionTraitement}%</span>
                    </div>
                    <Progress value={progressionTraitement} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      {progressionTraitement < 30 ? "Upload de l'image..." :
                       progressionTraitement < 60 ? "Analyse par IA..." :
                       progressionTraitement < 85 ? "Nettoyage en cours..." :
                       "Finalisation..."}
                    </p>
                    
                    {progressionTraitement > 70 && (
                      <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs text-yellow-700 dark:text-yellow-300">
                        <div className="flex items-center space-x-1">
                          <div className="animate-spin">⏳</div>
                          <span>Le traitement peut prendre jusqu'à 3 minutes selon la charge du serveur ModelsLab...</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Informations sur la pièce sélectionnée */}
            {pieceSelectionnee && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Car className="h-4 w-4 mr-2" />
                    {pieceSelectionnee.nom}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Matériau:</span>
                      <span className="font-medium">{pieceSelectionnee.materiau}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Catégorie:</span>
                      <Badge variant="outline">{pieceSelectionnee.categorie}</Badge>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded text-xs text-green-700 dark:text-green-300">
                    ✨ Nettoyage optimisé pour ce type de pièce
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Informations générales */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Nettoyage IA professionnel</h3>
                <div className="space-y-3">
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Suppression automatique de la saleté</li>
                    <li>• Élimination des rayures légères</li>
                    <li>• Restauration de l'éclat original</li>
                    <li>• Optimisation pour chaque matériau</li>
                    <li>• Qualité professionnelle</li>
                  </ul>
                  
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <div className="font-medium mb-1">Statut du service :</div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>ModelsLab API connectée</span>
                      </div>
                      <div className="mt-1 text-xs opacity-75">
                        Temps de traitement : 30s - 3min selon la charge
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      
      <input
        ref={refInputFichier}
        type="file"
        accept="image/*"
        onChange={gererUploadFichier}
        className="hidden"
      />
    </div>
  );
}