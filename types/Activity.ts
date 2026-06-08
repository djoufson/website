export type ActivityStatus = "upcoming" | "ongoing" | "shipped" | "note";

export interface ActivityLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface Activity {
  id: string;
  date: string;
  when?: string;
  status: ActivityStatus;
  tag?: string;
  title: string;
  description: string;
  location?: string;
  image?: string;
  link?: ActivityLink;
}
