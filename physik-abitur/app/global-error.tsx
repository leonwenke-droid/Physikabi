'use client';

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="de">
      <body style={{ background: '#0a0a0f', color: '#f0f0f8', minHeight: '100vh', margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ color: '#ff7a5c', fontSize: '1.25rem', marginBottom: '1rem' }}>
          Etwas ist schiefgelaufen
        </h1>
        <p style={{ color: '#8888aa', textAlign: 'center', maxWidth: '28rem', marginBottom: '1.5rem' }}>
          Die App konnte nicht geladen werden. Versuche die Seite neu zu laden.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            background: '#4f9cf9',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Erneut versuchen
        </button>
      </body>
    </html>
  );
}
