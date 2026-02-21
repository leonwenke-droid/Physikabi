'use client';

import { Lightbulb, AlertTriangle, FlaskConical, GraduationCap } from 'lucide-react';

export type NoteBoxType = 'tip' | 'remember' | 'experiment' | 'ea';

interface NoteBoxProps {
  type: NoteBoxType;
  title?: string;
  children: React.ReactNode;
}

const config: Record<
  NoteBoxType,
  { icon: typeof Lightbulb; label: string; bgClass: string; borderClass: string }
> = {
  tip: {
    icon: Lightbulb,
    label: 'Tipp',
    bgClass: 'bg-elektrizitaet/10',
    borderClass: 'border-elektrizitaet/40',
  },
  remember: {
    icon: AlertTriangle,
    label: 'Merke',
    bgClass: 'bg-messunsicherheiten/10',
    borderClass: 'border-messunsicherheiten/40',
  },
  experiment: {
    icon: FlaskConical,
    label: 'Experiment',
    bgClass: 'bg-schwingungen/10',
    borderClass: 'border-schwingungen/40',
  },
  ea: {
    icon: GraduationCap,
    label: 'eA',
    bgClass: 'bg-quantenobjekte/10',
    borderClass: 'border-quantenobjekte/40',
  },
};

export function NoteBox({ type, title, children }: NoteBoxProps) {
  const { icon: Icon, label, bgClass, borderClass } = config[type];
  return (
    <div className={`rounded-xl border p-4 my-4 ${bgClass} ${borderClass}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5 shrink-0" />
        <span className="font-semibold text-sm uppercase tracking-wider">
          {title ?? label}
        </span>
      </div>
      <div className="text-sm [&>p]:mb-2 [&>p:last-child]:mb-0">{children}</div>
    </div>
  );
}
