import { Artwork } from "@/types/Artwork";

/**
 * Digital art posts.
 *
 * Images currently live under public/assets/art/ as self-owned placeholders.
 * When real artwork is ready, swap each `images[].src` for a remote (R2 / Azure
 * Blob) URL and configure the remote loader in next.config.ts — nothing else
 * here changes. Keep `width`/`height` accurate so nothing shifts while loading.
 *
 * A post can hold multiple images (versions of the same piece); the first image
 * is the cover shown in the gallery grid.
 */
export const artworks: Artwork[] = [
  {
    id: "1",
    slug: "straw-hat-captain",
    title: "Straw Hat Captain",
    description:
      "A tribute piece exploring bold silhouettes and warm dusk lighting, painted digitally over several evenings. I worked through a few passes before landing on the final mood.",
    category: "fan-art",
    date: "2025-06-18",
    images: [
      { src: "/assets/art/straw-hat-captain.jpg", width: 800, height: 1100, caption: "Final" },
      {
        src: "/assets/art/straw-hat-captain-sketch.jpg",
        width: 800,
        height: 1100,
        caption: "Sketch",
      },
      {
        src: "/assets/art/straw-hat-captain-colors.jpg",
        width: 800,
        height: 1100,
        caption: "Color pass",
      },
    ],
    toolsUsed: ["Procreate", "Clip Studio Paint"],
    featured: true,
    commissionable: true,
    medium: "Digital painting",
    inspiration:
      "The freedom and momentum of an adventurer stepping into an open horizon — I wanted the light to feel like a promise.",
    process:
      "Started from a loose value sketch, blocked in the palette with a warm-to-cool gradient, then refined rim light and atmosphere in the final passes.",
  },
  {
    id: "2",
    slug: "neon-samurai",
    title: "Neon Samurai",
    description: "Character concept blending traditional armor with a neon-soaked cyberpunk mood.",
    category: "character-art",
    date: "2025-02-03",
    images: [{ src: "/assets/art/neon-samurai.jpg", width: 900, height: 900 }],
    toolsUsed: ["Procreate", "Photoshop"],
    featured: true,
    commissionable: true,
    medium: "Digital illustration",
    inspiration:
      "What would a wandering swordsman look like reimagined for a rain-slick future city?",
  },
  {
    id: "3",
    slug: "quiet-morning",
    title: "Quiet Morning",
    description: "A calm portrait study focused on soft skin tones and gentle window light.",
    category: "portraits",
    date: "2024-11-09",
    images: [{ src: "/assets/art/quiet-morning.jpg", width: 800, height: 1000 }],
    toolsUsed: ["Procreate"],
    featured: false,
    commissionable: true,
    medium: "Digital portrait",
  },
  {
    id: "4",
    slug: "city-of-dreams",
    title: "City of Dreams",
    description: "A wide environmental illustration imagining a coastal metropolis at blue hour.",
    category: "illustrations",
    date: "2025-04-27",
    images: [{ src: "/assets/art/city-of-dreams.jpg", width: 1200, height: 800 }],
    toolsUsed: ["Photoshop", "Blender"],
    featured: true,
    commissionable: false,
    medium: "Digital illustration",
    process:
      "Blocked the composition with simple 3D shapes for accurate perspective, then over-painted lighting, reflections, and atmosphere by hand.",
  },
  {
    id: "5",
    slug: "the-wanderer",
    title: "The Wanderer",
    description:
      "Full-body character design for a traveler carrying stories from far-off places. Shown from lineart through to the finished render.",
    category: "character-art",
    date: "2024-08-15",
    images: [
      { src: "/assets/art/the-wanderer.jpg", width: 800, height: 1200, caption: "Final" },
      {
        src: "/assets/art/the-wanderer-lineart.jpg",
        width: 800,
        height: 1200,
        caption: "Lineart",
      },
    ],
    toolsUsed: ["Clip Studio Paint"],
    featured: true,
    commissionable: true,
    medium: "Character design",
  },
  {
    id: "6",
    slug: "golden-hour",
    title: "Golden Hour",
    description:
      "A portrait bathed in late-afternoon warmth, studying how sunlight wraps around form.",
    category: "portraits",
    date: "2025-05-11",
    images: [{ src: "/assets/art/golden-hour.jpg", width: 900, height: 1100 }],
    toolsUsed: ["Procreate"],
    featured: false,
    commissionable: true,
    medium: "Digital portrait",
  },
  {
    id: "7",
    slug: "mecha-dawn",
    title: "Mecha Dawn",
    description: "Fan illustration of a towering machine powering up against a pale morning sky.",
    category: "fan-art",
    date: "2024-10-02",
    images: [{ src: "/assets/art/mecha-dawn.jpg", width: 1200, height: 900 }],
    toolsUsed: ["Photoshop"],
    featured: true,
    commissionable: false,
    medium: "Digital illustration",
  },
  {
    id: "8",
    slug: "forest-spirit",
    title: "Forest Spirit",
    description:
      "An illustration exploring folklore, layered foliage, and dappled green light — from tonal study to final.",
    category: "illustrations",
    date: "2025-01-20",
    images: [
      { src: "/assets/art/forest-spirit.jpg", width: 900, height: 1200, caption: "Final" },
      { src: "/assets/art/forest-spirit-study.jpg", width: 900, height: 1200, caption: "Study" },
    ],
    toolsUsed: ["Procreate", "Clip Studio Paint"],
    featured: true,
    commissionable: true,
    medium: "Digital illustration",
    inspiration: "Stories of guardians that live between the trees — half-seen, half-imagined.",
  },
  {
    id: "9",
    slug: "self-reflection",
    title: "Self Reflection",
    description: "A personal experiment with muted palettes and quiet, introspective composition.",
    category: "personal-projects",
    date: "2024-07-06",
    images: [{ src: "/assets/art/self-reflection.jpg", width: 800, height: 800 }],
    toolsUsed: ["Procreate"],
    featured: false,
    commissionable: false,
    medium: "Personal study",
  },
  {
    id: "10",
    slug: "abstract-flow",
    title: "Abstract Flow",
    description: "A non-representational piece playing with movement, gradients, and color rhythm.",
    category: "personal-projects",
    date: "2025-03-30",
    images: [{ src: "/assets/art/abstract-flow.jpg", width: 1200, height: 700 }],
    toolsUsed: ["Photoshop"],
    featured: false,
    commissionable: false,
    medium: "Abstract digital art",
  },
];
