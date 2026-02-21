'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CARD_ENTER } from '@/lib/transitions';
import { Search, BookOpen, Printer, FileText } from 'lucide-react';
import katex from 'katex';
import {
  formulas,
  MODULE_LABELS,
  MODULE_COLORS,
  type FormulaEntry,
} from '@/lib/content/formulas';

function FormulaCard({ formula }: { formula: FormulaEntry }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(formula.formula, {
        throwOnError: false,
        displayMode: true,
        output: 'html',
      });
    } catch {
      return `<span class="text-text-muted">${formula.formula}</span>`;
    }
  }, [formula.formula]);

  const color = MODULE_COLORS[formula.module] ?? '#8888aa';

  return (
    <motion.article
      initial={CARD_ENTER.initial}
      animate={CARD_ENTER.animate}
      transition={CARD_ENTER.transition}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="formeln-card rounded-xl border overflow-hidden print:break-inside-avoid"
      style={{ borderColor: `${color}40`, backgroundColor: `${color}08` }}
      aria-label={`Formel: ${formula.name}`}
    >
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className="text-xs font-medium px-2 py-0.5 rounded"
            style={{ backgroundColor: `${color}30`, color }}
          >
            {MODULE_LABELS[formula.module]}
          </span>
          {formula.level === 'eA' && (
            <span className="text-xs px-2 py-0.5 rounded bg-atom/20 text-atom">
              eA
            </span>
          )}
        </div>
        <h3 className="font-heading font-semibold text-lg mb-2">{formula.name}</h3>
        <div
          className="katex-display text-lg mb-3 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {formula.context && (
          <p className="text-sm text-text-dim mb-3">{formula.context}</p>
        )}
        {Object.keys(formula.variables).length > 0 && (
          <dl className="space-y-1 text-sm text-text-dim border-t border-border/50 pt-3">
            {Object.entries(formula.variables).map(([symbol, desc]) => (
              <div key={symbol} className="flex gap-2">
                <dt className="font-mono shrink-0">{symbol}:</dt>
                <dd>{desc}</dd>
              </div>
            ))}
          </dl>
        )}
        <Link
          href={formula.lessonHref}
          className="mt-3 inline-flex items-center gap-2 text-sm hover:underline"
          style={{ color }}
        >
          <BookOpen className="w-4 h-4" />
          Zur Lektion
        </Link>
      </div>
    </motion.article>
  );
}

type ViewMode = 'digital' | 'pdf';

export default function FormelnPage() {
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('digital');

  const filteredFormulas = useMemo(() => {
    const normalize = (s: string) =>
      s
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ß/g, 'ss');
    let list = formulas;
    if (moduleFilter) {
      list = list.filter((f) => f.module === moduleFilter);
    }
    if (search.trim()) {
      const q = normalize(search.trim());
      list = list.filter((f) => {
        const match = (text: string) => normalize(text).includes(q);
        return (
          match(f.name) ||
          match(f.formula) ||
          (f.context && match(f.context)) ||
          f.searchTerms.some((t) => match(t.trim())) ||
          Object.keys(f.variables).some((k) => match(k)) ||
          Object.values(f.variables).some((v) => match(v))
        );
      });
    }
    return list;
  }, [search, moduleFilter]);

  const modules = useMemo(
    () => Array.from(new Set(formulas.map((f) => f.module))),
    []
  );

  return (
    <div className="formeln-page max-w-[900px] mx-auto p-4 sm:p-6 md:p-8">
      <header className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
          Formelsammlung
        </h1>
        <p className="text-text-dim mb-6">
          Alle wichtigen Formeln der 5 Module. Durchsuchbar, filterbar, druckbar.
          Zusätzlich: Offizielle Abitur-Formelsammlung (Mathematik, Chemie, Physik).
        </p>

        <div className="flex gap-2 mb-6 print:hidden">
          <button
            type="button"
            onClick={() => setViewMode('digital')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'digital'
                ? 'bg-elektrizitaet text-white'
                : 'bg-surface2 text-text-dim hover:text-text'
            }`}
          >
            <Search className="w-4 h-4" />
            Digitale Formeln
          </button>
          <button
            type="button"
            onClick={() => setViewMode('pdf')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'pdf'
                ? 'bg-elektrizitaet text-white'
                : 'bg-surface2 text-text-dim hover:text-text'
            }`}
          >
            <FileText className="w-4 h-4" />
            Offizielle PDF
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 print:hidden" style={{ display: viewMode === 'digital' ? undefined : 'none' }}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="search"
              placeholder="Formel suchen (Stichwort, Variable, …)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 sm:py-2.5 rounded-lg bg-surface2 border border-border text-text placeholder-text-muted focus:outline-none focus:border-elektrizitaet/50 min-h-[44px]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setModuleFilter('')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                moduleFilter === ''
                  ? 'bg-elektrizitaet/30 text-elektrizitaet'
                  : 'bg-surface2 text-text-dim hover:text-text'
              }`}
            >
              Alle
            </button>
            {modules.map((mod) => (
              <button
                key={mod}
                type="button"
                onClick={() => setModuleFilter(mod)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  moduleFilter === mod
                    ? 'text-white'
                    : 'bg-surface2 text-text-dim hover:text-text'
                }`}
                style={
                  moduleFilter === mod
                    ? { backgroundColor: MODULE_COLORS[mod] }
                    : undefined
                }
              >
                {MODULE_LABELS[mod]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 print:hidden flex items-center gap-2" style={{ display: viewMode === 'digital' ? undefined : 'none' }}>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg bg-surface2 border border-border hover:bg-surface text-sm touch-manipulation"
            aria-label="Formelsammlung drucken"
          >
            <Printer className="w-4 h-4" />
            Drucken
          </button>
          <span className="text-xs text-text-muted">
            {filteredFormulas.length} Formel{filteredFormulas.length !== 1 ? 'n' : ''}
          </span>
        </div>
      </header>

      {viewMode === 'pdf' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-border bg-surface2/30 overflow-hidden mb-8"
        >
          <div className="p-4 border-b border-border">
            <h2 className="font-medium text-lg">
              Mathematisch-naturwissenschaftliche Formelsammlung
            </h2>
            <p className="text-sm text-text-dim mt-1">
              Gemeinsame Abituraufgabenpools der Länder — Mathematik, Chemie, Physik
            </p>
            <a
              href="/formeln/formelsammlung-offiziell.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-sm text-elektrizitaet hover:underline"
            >
              <FileText className="w-4 h-4" />
              PDF in neuem Tab öffnen
            </a>
          </div>
          <div className="relative w-full" style={{ height: 'min(80vh, 900px)' }}>
            <iframe
              src="/formeln/formelsammlung-offiziell.pdf#view=FitH"
              title="Offizielle Abitur-Formelsammlung"
              className="w-full h-full border-0"
            />
          </div>
        </motion.div>
      )}

      <div
        className="grid gap-4 sm:grid-cols-2 print:grid-cols-2"
        style={{ display: viewMode === 'digital' ? undefined : 'none' }}
      >
        {filteredFormulas.map((f) => (
          <FormulaCard key={f.id} formula={f} />
        ))}
      </div>

      {filteredFormulas.length === 0 && (
        <p className="text-text-dim text-center py-12">
          Keine Formeln gefunden. Versuche einen anderen Suchbegriff oder Filter.
        </p>
      )}
    </div>
  );
}
