export interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  phone?: string;
  service: ServiceType;
  message: string;
  acceptComms: boolean;
}

export type ServiceType =
  | "lead-qualification"
  | "smart-erp"
  | "knowledge-assistant"
  | "voice-calling"
  | "other";

export interface Project {
  number: string;
  title: string;
  description: string;
  badge: string;
  badgeColor: "yellow" | "blue" | "green" | "purple";
  techStack: string[];
  features: string[];
  metrics?: { value: string; label: string }[];
  callout: string;
  calloutIcon: string;
  calloutTitle: string;
}

export interface UseCase {
  icon: string;
  gradient: string;
  problem: string;
  solution: string;
  title: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface StatItem {
  value: string;
  suffix: string;
  label: string;
  prefix?: string;
}
