'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 bg-[#0a0a0f] text-[#f0f0f8]">
      <h1 className="text-xl font-semibold text-[#ff7a5c]">Etwas ist schiefgelaufen</h1>
      <p className="text-[#8888aa] text-center max-w-md">
        Die Seite konnte nicht geladen werden.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="px-4 py-2 rounded-lg bg-[#4f9cf9] hover:bg-[#4f9cf9]/80 text-white transition-colors"
      >
        Erneut versuchen
      </button>
    </div>
  );
}
