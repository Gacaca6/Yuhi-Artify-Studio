export interface GeneratedArt {
  image: string;
  title: string;
  description: string;
}

export const artStyles = ['None', 'Impressionism', 'Surrealism', 'Abstract', 'Modern Art', 'Van Gogh', 'Pop Art', 'Cubism'] as const;

export type ArtStyle = typeof artStyles[number];
