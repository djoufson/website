import { Artwork } from "@/types/Artwork";

/**
 * Digital art posts.
 *
 * Images live under public/assets/art/ as optimized WebP (originals kept
 * offline). A post can hold multiple images (versions of the same piece); the
 * first image is the cover shown in the gallery grid. Keep `width`/`height`
 * accurate so nothing shifts while loading.
 */
export const artworks: Artwork[] = [
  {
    id: "1",
    slug: "kambeul",
    title: "Kambeul",
    description:
      "A cool, laid-back portrait - sunglasses on, an earbud in - set against sharp red-and-white graphic shapes.",
    category: "portraits",
    date: "2021-07-02",
    images: [{ src: "/assets/art/kambeul.webp", width: 1556, height: 2200 }],
    toolsUsed: ["Adobe Illustrator"],
    featured: true,
    commissionable: true,
    medium: "Vector illustration",
  },
  {
    id: "2",
    slug: "djouf",
    title: "Djouf",
    description:
      "A relaxed, laughing self-portrait framed by loose magenta and yellow brush shapes, with a ghosted second face behind.",
    category: "portraits",
    date: "2021-05-20",
    images: [{ src: "/assets/art/djouf.webp", width: 2200, height: 2200 }],
    toolsUsed: ["Adobe Illustrator"],
    featured: false,
    commissionable: true,
    medium: "Vector illustration",
  },
  {
    id: "3",
    slug: "panther",
    title: "Panther",
    description:
      "A black panther rendered in deep blacks, its green eyes and faint markings glowing out of the shadow.",
    category: "illustrations",
    date: "2021-04-10",
    images: [{ src: "/assets/art/panther.webp", width: 2200, height: 2200 }],
    toolsUsed: ["Procreate"],
    featured: true,
    commissionable: false,
    medium: "Digital painting",
  },
  {
    id: "4",
    slug: "hatik",
    title: "Hatik",
    description:
      "A portrait of the artist Hatik, carried from a loose line sketch through a tonal study to the final coloured version.",
    category: "fan-art",
    date: "2021-02-15",
    images: [
      { src: "/assets/art/hatik-red.webp", width: 1500, height: 1500, caption: "Colour" },
      { src: "/assets/art/hatik-bw.webp", width: 1500, height: 1500, caption: "Line sketch" },
      { src: "/assets/art/hatik-neo.webp", width: 1500, height: 1500, caption: "Tonal study" },
    ],
    toolsUsed: ["Procreate"],
    featured: true,
    commissionable: true,
    medium: "Digital drawing",
    process:
      "Started from a scribbly line sketch, pushed it into a greyscale tonal study to settle the light, then laid in the warm red colour pass.",
  },
  {
    id: "5",
    slug: "berka",
    title: "Berka",
    description:
      "A side-profile portrait with a cel-shaded finish and a green rim light picking out the features against a flat grey backdrop.",
    category: "portraits",
    date: "2021-12-05",
    images: [{ src: "/assets/art/berka.webp", width: 1400, height: 1400 }],
    toolsUsed: ["Procreate"],
    featured: true,
    commissionable: true,
    medium: "Digital painting",
  },
  {
    id: "6",
    slug: "irvin",
    title: "Kyrie",
    description:
      "Fan illustration of the Brooklyn point guard mid-drive, painted with a glitchy ribbon motif streaking behind him.",
    category: "fan-art",
    date: "2021-10-18",
    images: [{ src: "/assets/art/irvin.webp", width: 2200, height: 2200 }],
    toolsUsed: ["Adobe Photoshop"],
    featured: false,
    commissionable: false,
    medium: "Digital painting",
  },
  {
    id: "7",
    slug: "tiger",
    title: "Tiger",
    description:
      "A tiger portrait, its fur and whiskers built up stroke by stroke against a soft green blur.",
    category: "illustrations",
    date: "2021-08-22",
    images: [{ src: "/assets/art/tiger.webp", width: 720, height: 711 }],
    toolsUsed: ["Procreate"],
    featured: false,
    commissionable: false,
    medium: "Digital painting",
  },
  {
    id: "8",
    slug: "warren",
    title: "Warren in Red",
    description:
      "A portrait worked almost entirely in reds - light and shadow carved out with warm and cool tones over a single hue.",
    category: "portraits",
    date: "2021-06-14",
    images: [{ src: "/assets/art/warren.webp", width: 1400, height: 1400 }],
    toolsUsed: ["Procreate"],
    featured: false,
    commissionable: true,
    medium: "Digital painting",
  },
  {
    id: "9",
    slug: "wizzy",
    title: "Wizzy",
    description:
      "An original character design - a grinning, mohawked performer with headphones and a mic, drawn in a bold graffiti-cartoon style.",
    category: "character-art",
    date: "2021-03-09",
    images: [{ src: "/assets/art/wizzy.webp", width: 2200, height: 2200 }],
    toolsUsed: ["Adobe Illustrator"],
    featured: true,
    commissionable: true,
    medium: "Vector illustration",
  },
  {
    id: "10",
    slug: "pixel-dreams",
    title: "Pixel Dreams",
    description:
      "A pixel-art self-portrait at the laptop, badged with my +C Dreams handle - a small love letter to retro games.",
    category: "personal-projects",
    date: "2023-11-25",
    images: [{ src: "/assets/art/djoufson.webp", width: 2200, height: 2200 }],
    toolsUsed: ["Aseprite"],
    featured: false,
    commissionable: false,
    medium: "Pixel art",
  },
];
