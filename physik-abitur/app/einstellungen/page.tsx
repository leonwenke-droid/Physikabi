'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Settings, RotateCcw, ArrowLeft } from 'lucide-react';
import { useProgressStore } from '@/lib/progress';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export default function EinstellungenPage() {
  const [confirmReset, setConfirmReset] = useState(false);
  const resetProgress = useProgressStore((s) => s.resetProgress);

  const handleReset = () => {
    resetProgress();
    setConfirmReset(false);
  };

  return (
    <div className="max-w-[600px] mx-auto p-4 sm:p-6 md:p-8">
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/' },
          { label: 'Einstellungen' },
        ]}
      />
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 mt-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-lg bg-surface2 flex items-center justify-center">
            <Settings className="w-6 h-6 text-text-dim" />
          </div>
          <h1 className="font-heading text-2xl font-bold">Einstellungen</h1>
        </div>
        <p className="text-text-dim">
          Verwalte deine Lerndaten und Einstellungen.
        </p>
      </motion.header>

      <section className="rounded-xl border border-border bg-surface2/30 p-6">
        <h2 className="font-medium mb-4">Fortschritt</h2>
        <p className="text-sm text-text-dim mb-4">
          Setze deinen gesamten Lernfortschritt zurück. Alle abgehakten Lektionen,
          Quiz-Ergebnisse, Badges und der Streak werden gelöscht. Diese Aktion kann
          nicht rückgängig gemacht werden.
        </p>
        {!confirmReset ? (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-schwingungen/20 text-schwingungen hover:bg-schwingungen/30 transition-colors text-sm font-medium"
            aria-label="Fortschritt zurücksetzen"
          >
            <RotateCcw className="w-4 h-4" />
            Fortschritt zurücksetzen
          </button>
        ) : (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-schwingungen text-white hover:opacity-90 transition-opacity text-sm font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Ja, wirklich zurücksetzen
            </button>
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface2 border border-border text-text-dim hover:text-text transition-colors text-sm"
            >
              Abbrechen
            </button>
          </div>
        )}
      </section>

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-text-dim hover:text-text mt-8 transition-colors"
        aria-label="Zurück zum Dashboard"
      >
        <ArrowLeft className="w-4 h-4" />
        Zurück zum Dashboard
      </Link>
    </div>
  );
}
