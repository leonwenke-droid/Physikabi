'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm text-text-dim">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1 shrink-0">
          {i > 0 && <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-text transition-colors truncate max-w-[140px] sm:max-w-none">
              {item.label}
            </Link>
          ) : (
            <span className="text-text truncate max-w-[140px] sm:max-w-none">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
