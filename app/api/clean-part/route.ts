import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MODELSLAB_API_KEY = process.env.MODELSLAB_API_KEY || process.env.MODELSLAB_KEY;
const MODELSLAB_API_URL = 'https://modelslab.com/api/v7/images/image-to-image';

if (!MODELSLAB_API_KEY) {
  console.error('MODELSLAB_API_KEY manquante dans les variables d\'environnement');
}

// Configuration des différents types de pièces automobiles
const AUTOMOTIVE_PARTS = {
  "steering_wheel": {
    "name": "Volant",
    "prompt": "Photo professionnelle d'un volant de voiture impeccable, surface en cuir parfaite sans rayures ni marques d'usure, coutures parfaites, éclairage studio, arrière-plan propre. Supprimer toute saleté, empreintes et signes d'utilisation tout en conservant la texture réaliste du cuir."
  },
  "alloy_wheel": {
    "name": "Jante Alliage", 
    "prompt": "Photo studio d'une jante en alliage pristine, finition aluminium poli, sans poussière de frein ni rayures, surface réfléchissante, motif de jante détaillé visible, arrière-plan sombre. Enlever toute saleté et marques d'éraflure tout en améliorant l'éclat métallique."
  },
  "car_seat": {
    "name": "Siège Auto",
    "prompt": "Photo produit professionnelle d'un siège de voiture impeccable, sellerie tissu/cuir parfaite sans déchirures, trous, coupures ou dommages, sans taches, plis ou marques d'usure, coutures et surpiqûres intactes, coussins fermes et neufs, éclairage studio. Supprimer toutes déchirures, coupures, trous, rayures, taches et signes d'usage tout en gardant la texture réaliste de la sellerie et en préservant le design original du siège."
  },
  "dashboard": {
    "name": "Tableau de Bord",
    "prompt": "Photo intérieur automobile professionnelle d'un tableau de bord impeccable, surfaces plastique parfaites, sans poussière ni empreintes, tous boutons et écrans cristallins, éclairage ambiant. Supprimer toutes rayures et marques d'usure."
  },
  "bumper": {
    "name": "Pare-chocs",
    "prompt": "Photo studio de pare-chocs en parfait état, surface peinte impeccable, sans rayures ni éraflures, couleur uniforme, éclairage automobile professionnel. Supprimer tous dommages et imperfections."
  },
  "headlight": {
    "name": "Phare",
    "prompt": "Photo produit professionnelle de phare automobile, lentille cristalline, sans jaunissement ni opacité, boîtier parfait, éclairage studio. Supprimer toute oxydation et rayures tout en maintenant la transparence."
  },
  "side_mirror": {
    "name": "Rétroviseur",
    "prompt": "Photo professionnelle de rétroviseur de voiture, surface miroir parfaite, boîtier impeccable, sans fissures ni rayures, éclairage studio. Supprimer toutes imperfections tout en conservant les propriétés réfléchissantes."
  },
  "door_handle": {
    "name": "Poignée de Porte",
    "prompt": "Photo produit professionnelle de poignée de porte de voiture, finition chrome/plastique pristine, sans rayures ni marques d'usure, réflexion de surface parfaite, éclairage studio. Supprimer tous signes d'utilisation."
  },
  "gear_shift": {
    "name": "Levier de Vitesse",
    "prompt": "Photo studio de pommeau de levier de vitesse, surface impeccable, coutures parfaites si applicable, sans usure ni brillance d'utilisation, éclairage professionnel. Supprimer toutes empreintes et marques d'usure."
  },
  "brake_disc": {
    "name": "Disque de Frein",
    "prompt": "Photo professionnelle de pièces automobiles d'un disque de frein, surface métallique pristine, sans rouille ni rayures, finition usinée parfaite, éclairage studio. Supprimer toute corrosion et usure."
  },
  "airbag": {
    "name": "Airbag de Volant",
    "prompt": "Photo produit professionnelle du centre d'airbag de volant de voiture, surface plastique/cuir pristine, logo et texte propres, sans rayures ni marques d'usure, finition parfaite, éclairage studio. Supprimer toute saleté, empreintes et signes d'utilisation tout en conservant le design original de l'airbag et en le gardant comme composant d'airbag, sans le transformer en volant complet."
  },
  "carrosserie": {
    "name": "Carrosserie",
    "prompt": "Photographie automobile professionnelle de panneau de carrosserie, surface peinte impeccable, finition métallique parfaite, sans rayures, bosses ou éclats de peinture, couleur et brillance uniformes, éclairage studio avec reflets doux. Supprimer toute saleté, traces d'eau, oxydation et imperfections mineures tout en conservant la texture réaliste et la profondeur de la peinture automobile."
  },
  "other": {
    "name": "Autres pièces",
    "prompt": "Photographie produit professionnelle de composant automobile, état pristine avec finition de surface impeccable, sans saleté, graisse, taches d'huile ou corrosion, apparence matériau parfaite qu'il soit plastique, métal, caoutchouc ou composite, éclairage studio avec arrière-plan propre. Supprimer toute contamination, oxydation, marques d'usure et imperfections de surface tout en conservant le design original du composant et la texture réaliste du matériau. Restaurer à l'apparence d'usine neuve."
  }
};

async function attendreResultat(fetchUrl: string, tentativesMax: number = 20) {
  for (let tentative = 1; tentative <= tentativesMax; tentative++) {
    console.log(`Tentative ${tentative}/${tentativesMax} pour récupérer le résultat...`);
    
    try {
      const response = await fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'key': MODELSLAB_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        console.error(`Erreur lors du polling (${response.status}): ${await response.text()}`);
        if (response.status === 404) {
          throw new Error('Résultat non trouvé. Le traitement a peut-être expiré.');
        }
        
        const tempsAttente = Math.min(3000 + (tentative * 1000), 8000);
        await new Promise(resolve => setTimeout(resolve, tempsAttente));
        continue;
      }

      const resultat = await response.json();
      console.log(`Statut de la réponse: ${resultat.status}`);
      
      if (resultat.status === 'success' && resultat.output?.length > 0) {
        console.log('Traitement terminé avec succès !');
        return resultat;
      }
      
      if (resultat.status === 'processing') {
        console.log('Traitement en cours, attente...');
        const tempsAttente = tentative <= 5 ? 2000 : Math.min(3000 + ((tentative - 5) * 1000), 10000);
        await new Promise(resolve => setTimeout(resolve, tempsAttente));
        continue;
      }
      
      if (resultat.status === 'failed') {
        throw new Error(`Traitement échoué: ${resultat.message || 'Erreur inconnue'}`);
      }
      
      console.log(`Statut inconnu: ${resultat.status}, nouvelle tentative...`);
      const tempsAttente = tentative <= 5 ? 2000 : Math.min(3000 + ((tentative - 5) * 1000), 10000);
      await new Promise(resolve => setTimeout(resolve, tempsAttente));
      
    } catch (erreurFetch) {
      console.error(`Erreur de réseau lors du polling (tentative ${tentative}):`, erreurFetch);
      
      if (tentative === tentativesMax) {
        throw new Error(`Impossible de récupérer le résultat après ${tentativesMax} tentatives: ${erreurFetch instanceof Error ? erreurFetch.message : 'Erreur réseau'}`);
      }
      
      const tempsAttente = tentative <= 5 ? 2000 : Math.min(3000 + ((tentative - 5) * 1000), 10000);
      await new Promise(resolve => setTimeout(resolve, tempsAttente));
    }
  }
  
  throw new Error('Timeout: Le traitement a pris trop de temps (plus de 3 minutes). ModelsLab est probablement très surchargé en ce moment.');
}

export async function POST(request: NextRequest) {
  try {
    console.log('Début du traitement de nettoyage de pièce...');
    
    if (!MODELSLAB_API_KEY) {
      console.error('MODELSLAB_API_KEY manquante dans les variables d\'environnement');
      return NextResponse.json(
        { 
          success: false, 
          detail: 'Configuration API manquante. Veuillez vérifier la configuration du serveur.' 
        },
        { status: 500 }
      );
    }
    
    const formData = await request.formData();
    const fichier = formData.get('file') as File;
    const typePiece = formData.get('part_type') as string;
    const niveauAmelioration = parseFloat(formData.get('enhancement_level') as string || '0.8');

    if (!fichier) {
      return NextResponse.json(
        { success: false, detail: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    if (!typePiece || !AUTOMOTIVE_PARTS[typePiece as keyof typeof AUTOMOTIVE_PARTS]) {
      return NextResponse.json(
        { success: false, detail: `Type de pièce non supporté: ${typePiece}` },
        { status: 400 }
      );
    }

    console.log(`Type de pièce: ${typePiece}`);
    console.log(`Niveau d'amélioration: ${niveauAmelioration}`);
    console.log(`Taille du fichier: ${fichier.size} bytes`);

    const nomFichier = `autoshine-${Date.now()}-${fichier.name}`;
    console.log(`Upload vers Vercel Blob: ${nomFichier}`);
    
    let urlImage;
    try {
      const { url } = await put(nomFichier, fichier, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      urlImage = url;
    } catch (erreurUpload) {
      console.error('Erreur upload Vercel Blob:', erreurUpload);
      return NextResponse.json(
        { 
          success: false, 
          detail: 'Erreur lors du téléchargement de l\'image. Veuillez réessayer.' 
        },
        { status: 500 }
      );
    }

    console.log(`Image uploadée: ${urlImage}`);

    const infoPiece = AUTOMOTIVE_PARTS[typePiece as keyof typeof AUTOMOTIVE_PARTS];
    const prompt = infoPiece.prompt;

    console.log(`Prompt utilisé: ${prompt.substring(0, 100)}...`);

    const corpsRequete = {
      init_image: urlImage,
      prompt: prompt,
      model_id: "flux-kontext-pro",
      width: 768,
      height: 768,
      num_inference_steps: 20,
      guidance_scale: 7.5,
      strength: niveauAmelioration,
      seed: Math.floor(Math.random() * 1000000),
      scheduler: "DPMSolverMultistepScheduler",
    };

    console.log('Envoi de la requête à ModelsLab API...');

    const reponse = await fetch(MODELSLAB_API_URL, {
      method: 'POST',
      headers: {
        'key': MODELSLAB_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(corpsRequete),
    });

    if (!reponse.ok) {
      const texteErreur = await reponse.text();
      console.error(`Erreur API ModelsLab (${reponse.status}):`, texteErreur);
      console.error(`URL utilisée: ${MODELSLAB_API_URL}`);
      console.error(`Clé API (premiers caractères): ${MODELSLAB_API_KEY?.substring(0, 8)}...`);
      
      if (reponse.status === 401) {
        return NextResponse.json(
          { 
            success: false, 
            detail: 'Clé API ModelsLab invalide ou expirée. Veuillez vérifier la configuration.' 
          },
          { status: 401 }
        );
      } else if (reponse.status === 429) {
        return NextResponse.json(
          { 
            success: false, 
            detail: 'Trop de requêtes simultanées. Veuillez patienter 1-2 minutes avant de réessayer.' 
          },
          { status: 429 }
        );
      } else if (reponse.status === 524) {
        return NextResponse.json(
          { 
            success: false, 
            detail: 'Le service ModelsLab met trop de temps à répondre (timeout). Leurs serveurs sont probablement surchargés. Réessayez dans 5-10 minutes.' 
          },
          { status: 524 }
        );
      } else if (reponse.status >= 500) {
        return NextResponse.json(
          { 
            success: false, 
            detail: `Le service ModelsLab rencontre des difficultés techniques (erreur ${reponse.status}). Cela arrive parfois lors de pics d'utilisation. Réessayez dans quelques minutes.` 
          },
          { status: 503 }
        );
      } else {
        return NextResponse.json(
          { 
            success: false, 
            detail: `Erreur de communication avec ModelsLab (${reponse.status}). ${reponse.status === 403 ? 'Problème d\'autorisation.' : 'Veuillez réessayer.'}` 
          },
          { status: reponse.status }
        );
      }
    }

    const resultatInitial = await reponse.json();
    console.log(`Réponse initiale de l'API:`, JSON.stringify(resultatInitial, null, 2));

    let resultatFinal;

    if (resultatInitial.status === 'success' && resultatInitial.output?.length > 0) {
      console.log('Résultat immédiat obtenu !');
      resultatFinal = resultatInitial;
    }
    else if (resultatInitial.status === 'error' || resultatInitial.status === 'failed') {
      const messageErreur = resultatInitial.message || 'Erreur inconnue de l\'API ModelsLab';
      console.error(`Erreur de l'API ModelsLab: ${messageErreur}`);
      
      if (messageErreur.includes('server error') || messageErreur.includes('A server error occurred')) {
        return NextResponse.json(
          { 
            success: false, 
            detail: `ModelsLab rencontre actuellement des difficultés techniques. Ceci est un problème temporaire côté ModelsLab, pas de votre application. Veuillez patienter 2-3 minutes et réessayer.` 
          },
          { status: 503 }
        );
      }
      
      return NextResponse.json(
        { 
          success: false, 
          detail: `Le traitement a échoué côté ModelsLab: ${messageErreur}. Cela peut être temporaire, réessayez dans quelques minutes.` 
        },
        { status: 422 }
      );
    }
    else if (resultatInitial.fetch_result) {
      console.log('Démarrage du polling pour récupérer le résultat...');
      resultatFinal = await attendreResultat(resultatInitial.fetch_result);
    }
    else if (resultatInitial.id) {
      const urlFetch = `${MODELSLAB_API_URL}/${resultatInitial.id}`;
      console.log(`Démarrage du polling avec ID: ${resultatInitial.id}`);
      resultatFinal = await attendreResultat(urlFetch);
    }
    else {
      console.error(`Format de réponse inattendu:`, resultatInitial);
      return NextResponse.json(
        { 
          success: false, 
          detail: 'Réponse inattendue de ModelsLab. Leur API pourrait être en cours de mise à jour. Réessayez dans quelques minutes.' 
        },
        { status: 502 }
      );
    }

    const urlImageTraitee = resultatFinal.output[0];
    
    if (!urlImageTraitee) {
      console.error(`Aucune image dans la réponse:`, resultatFinal);
      return NextResponse.json(
        { 
          success: false, 
          detail: 'Le traitement n\'a pas produit d\'image. Cela peut arriver si l\'image d\'origine est corrompue ou si ModelsLab a un problème temporaire.' 
        },
        { status: 502 }
      );
    }

    console.log('Traitement terminé avec succès !');

    return NextResponse.json({
      success: true,
      message: `${infoPiece.name} nettoyé avec succès`,
      processing_id: `autoshine-${Date.now()}`,
      original_image_url: urlImage,
      processed_image_url: urlImageTraitee,
      part_type: typePiece,
      part_name: infoPiece.name,
    });

  } catch (erreur) {
    console.error('Erreur lors du traitement:', erreur);
    console.error('Stack trace:', erreur instanceof Error ? erreur.stack : 'No stack trace');
    
    let messageErreur = 'Erreur lors du traitement de l\'image';
    let codeStatut = 500;
    
    if (erreur instanceof Error) {
      if (erreur.message.includes('fetch')) {
        messageErreur = 'Impossible de contacter ModelsLab. Vérifiez votre connexion internet ou réessayez plus tard.';
        codeStatut = 503;
      } else if (erreur.message.includes('Timeout')) {
        messageErreur = 'Le traitement prend trop de temps (plus de 2 minutes). ModelsLab est probablement surchargé. Réessayez avec une image plus petite ou patientez quelques minutes.';
        codeStatut = 408;
      } else if (erreur.message.includes('API')) {
        messageErreur = 'Problème de configuration de l\'API ModelsLab. Contactez le support technique.';
        codeStatut = 502;
      } else if (erreur.message.includes('récupérer le résultat')) {
        messageErreur = 'Impossible de récupérer le résultat du traitement. ModelsLab pourrait avoir des problèmes de réseau temporaires.';
        codeStatut = 503;
      } else {
        messageErreur = erreur.message;
      }
    }

    return NextResponse.json(
      { 
        success: false, 
        detail: messageErreur 
      },
      { status: codeStatut }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    supported_parts: Object.fromEntries(
      Object.entries(AUTOMOTIVE_PARTS).map(([cle, piece]) => [
        cle,
        {
          name: piece.name,
          description: `Nettoyage de ${piece.name.toLowerCase()}`
        }
      ])
    ),
    total_count: Object.keys(AUTOMOTIVE_PARTS).length,
    api_status: 'ready'
  });
}