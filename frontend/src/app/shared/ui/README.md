# 🎨 SpacePong Design System

## 🌟 Vue d'ensemble

Le Design System SpacePong est un système de design moderne et futuriste créé spécifiquement pour l'application de jeu Pong spatial. Il combine des éléments de glassmorphism, des effets néon, et une esthétique spatiale pour créer une expérience utilisateur immersive.

## 🎯 Philosophie de Design

### Thème Spatial
- **Couleurs** : Palette sombre avec des accents néon cyan, violet et bleu
- **Typographie** : Font `nasalization` pour l'aspect futuriste
- **Effets** : Glassmorphism, ombres et lueurs néon
- **Animations** : Fluides et engageantes

### Principes Clés
1. **Immersion** : Créer une expérience spatiale authentique
2. **Clarté** : Maintenir la lisibilité malgré l'esthétique complexe
3. **Cohérence** : Système unifié à travers toute l'application
4. **Performance** : Optimisé pour tous les appareils

## 🎨 Palette de Couleurs

### Couleurs Primaires
```scss
--space-dark: #0a0118      // Arrière-plan principal
--space-primary: #1a0b2e   // Arrière-plan secondaire
--space-secondary: #16213e // Éléments de surface
--space-accent: #7209b7    // Accent principal
--space-bright: #a663cc    // Accent lumineux
```

### Couleurs Néon
```scss
--neon-cyan: #00ffff      // Accents principaux
--neon-purple: #c724ff    // Éléments interactifs
--neon-blue: #4d9fff      // Liens et boutons
--neon-pink: #ff4da6      // Alertes et erreurs
--neon-green: #39ff14     // Succès et validation
```

### Couleurs de Texte
```scss
--text-primary: #ffffff    // Texte principal
--text-secondary: #b8c5d6  // Texte secondaire
--text-muted: #7a8ca8      // Texte en sourdine
--text-accent: #00ffff     // Texte d'accent
```

## 📝 Typographie

### Échelle de Tailles
```scss
--font-size-xs: 0.75rem    // 12px
--font-size-sm: 0.875rem   // 14px
--font-size-base: 1rem     // 16px
--font-size-lg: 1.125rem   // 18px
--font-size-xl: 1.25rem    // 20px
--font-size-2xl: 1.5rem    // 24px
--font-size-3xl: 1.875rem  // 30px
--font-size-4xl: 2.25rem   // 36px
--font-size-5xl: 3rem      // 48px
--font-size-6xl: 4rem      // 64px
```

### Familles de Polices
- **Primaire** : `nasalization` - Pour les titres et éléments UI
- **Secondaire** : `Inter` - Pour le contenu et texte courant
- **Monospace** : `Orbitron` - Pour les éléments de code

## 📐 Espacement

### Système d'Espacement (Base 8px)
```scss
--space-1: 0.25rem   // 4px
--space-2: 0.5rem    // 8px
--space-3: 0.75rem   // 12px
--space-4: 1rem      // 16px
--space-5: 1.25rem   // 20px
--space-6: 1.5rem    // 24px
--space-8: 2rem      // 32px
--space-10: 2.5rem   // 40px
--space-12: 3rem     // 48px
--space-16: 4rem     // 64px
--space-20: 5rem     // 80px
--space-24: 6rem     // 96px
```

## 🔘 Composants

### Boutons

#### Variantes
- **Primary** : Bouton d'action principal avec gradient violet
- **Secondary** : Bouton secondaire avec effet glass
- **Ghost** : Bouton transparent pour actions subtiles
- **Danger** : Bouton d'alerte avec gradient rouge

#### Tailles
- **Small (sm)** : 32px de hauteur
- **Medium (md)** : 40px de hauteur (défaut)
- **Large (lg)** : 48px de hauteur

#### Utilisation
```html
<app-button variant="primary" size="md" (clicked)="handleClick()">
  Action Principale
</app-button>

<app-button variant="secondary" [loading]="isLoading">
  Action Secondaire
</app-button>
```

### Cartes

#### Variantes
- **Default** : Carte standard avec effet glass
- **Highlighted** : Carte avec bordure cyan lumineuse
- **Game** : Carte spécialisée pour les éléments de jeu

#### Structure
```html
<app-card title="Titre" subtitle="Sous-titre" variant="highlighted">
  Contenu de la carte
  <div slot="footer">
    <app-button variant="ghost">Annuler</app-button>
    <app-button variant="primary">Valider</app-button>
  </div>
</app-card>
```

### Loaders

#### Types
- **Spinner** : Trois anneaux qui tournent
- **Pong** : Animation de balle de Pong
- **Rocket** : Fusée avec traînée

#### Utilisation
```html
<app-loader type="pong" size="lg" message="Chargement du jeu..."></app-loader>
```

## ✨ Effets Visuels

### Glassmorphism
```scss
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Effets Néon
```scss
.glow {
  filter: drop-shadow(0 0 20px currentColor);
}

.glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite alternate;
}
```

### Directives
- **appGlowEffect** : Ajoute un effet de lueur
- **appRipple** : Effet d'ondulation au clic

```html
<button appGlowEffect glowColor="#00ffff" appRipple>
  Bouton avec effets
</button>
```

## 📱 Responsive Design

### Breakpoints
```scss
--breakpoint-sm: 640px    // Mobile
--breakpoint-md: 768px    // Tablet
--breakpoint-lg: 1024px   // Desktop
--breakpoint-xl: 1280px   // Large Desktop
--breakpoint-2xl: 1536px  // Extra Large Desktop
```

### Stratégie Mobile-First
- Design optimisé pour mobile en priorité
- Progressive enhancement pour larger screens
- Touch-friendly interactions
- Optimisation des performances

## 🎭 Animations

### Transitions Standard
```scss
--transition-fast: 150ms ease-in-out
--transition-normal: 250ms ease-in-out
--transition-slow: 350ms ease-in-out
--transition-bounce: 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Classes Utilitaires
- `.fade-in` : Apparition en fondu
- `.slide-up` : Glissement vers le haut
- `.float` : Animation de flottement
- `.gradient-text` : Texte avec gradient animé

## 🚀 Utilisation

### Import du Design System
```scss
@import './styles/design-system.scss';
```

### Module UI
```typescript
import { UiModule } from './shared/ui/ui.module';

@NgModule({
  imports: [UiModule]
})
export class AppModule { }
```

## 📋 Checklist d'Implémentation

### Phase 1 : Fondations ✅
- [x] Variables CSS et design tokens
- [x] Système de couleurs
- [x] Typographie et espacement
- [x] Classes utilitaires

### Phase 2 : Composants 🔄
- [x] Boutons avec variantes
- [x] Cartes avec effets
- [x] Loaders animés
- [x] Directives d'effets

### Phase 3 : Intégration
- [ ] Refonte des composants existants
- [ ] Application du design system
- [ ] Tests et validation
- [ ] Documentation des patterns

## 🔧 Maintenance

### Conventions de Nommage
- Variables CSS : `--category-variant-property`
- Classes : `component-variant-modifier`
- Composants : `AppComponentName`

### Performance
- Utilisation de `transform` et `opacity` pour les animations
- Lazy loading des effets non critiques
- Optimisation des gradients et filtres
- Minimisation du reflow/repaint

---

*Créé avec 💜 pour SpacePong ft_transcendance*
