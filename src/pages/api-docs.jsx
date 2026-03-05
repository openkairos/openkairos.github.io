import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useEffect, useMemo, useRef} from 'react';

export default function ApiDocs() {
  const openApiUrl = useBaseUrl('/openapi/');
  const iframeRef = useRef(null);
  const lastSeenIframeHashRef = useRef('');
  const lastAppliedParentHashRef = useRef('');

  const initialSrc = useMemo(() => {
    if (typeof window === 'undefined') {
      return openApiUrl;
    }
    return `${openApiUrl}${window.location.hash || ''}`;
  }, [openApiUrl]);

  useEffect(() => {
    const normalizeHash = (hash) => {
      if (!hash) {
        return '';
      }
      return hash.startsWith('#') ? hash : `#${hash}`;
    };

    const applyParentHashToIframe = (hash) => {
      const normalized = normalizeHash(hash);
      const iframe = iframeRef.current;
      if (!iframe) {
        return;
      }

      try {
        const iframeWindow = iframe.contentWindow;
        if (!iframeWindow) {
          return;
        }
        if (iframeWindow.location.hash !== normalized) {
          iframeWindow.location.hash = normalized;
        }
      } catch {
        iframe.src = `${openApiUrl}${normalized}`;
      }
    };

    const applyIframeHashToParent = (hash) => {
      const normalized = normalizeHash(hash);
      if (window.location.hash === normalized) {
        return;
      }
      if (normalized) {
        window.location.hash = normalized;
      } else {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };

    const syncFromIframe = () => {
      const iframe = iframeRef.current;
      if (!iframe) {
        return;
      }

      try {
        const iframeWindow = iframe.contentWindow;
        if (!iframeWindow) {
          return;
        }
        const iframeHash = normalizeHash(iframeWindow.location.hash);
        if (!iframeHash || iframeHash === lastSeenIframeHashRef.current) {
          return;
        }
        lastSeenIframeHashRef.current = iframeHash;
        applyIframeHashToParent(iframeHash);
      } catch {
        // Ignore cross-origin/access issues.
      }
    };

    const onParentHashChange = () => {
      const currentHash = normalizeHash(window.location.hash);
      if (currentHash === lastAppliedParentHashRef.current) {
        return;
      }
      lastAppliedParentHashRef.current = currentHash;
      applyParentHashToIframe(currentHash);
    };

    const onIframeLoad = () => {
      const currentHash = normalizeHash(window.location.hash);
      lastAppliedParentHashRef.current = currentHash;
      applyParentHashToIframe(currentHash);
      syncFromIframe();
    };

    const iframe = iframeRef.current;
    iframe?.addEventListener('load', onIframeLoad);
    window.addEventListener('hashchange', onParentHashChange);

    const poll = window.setInterval(syncFromIframe, 150);
    onParentHashChange();

    return () => {
      iframe?.removeEventListener('load', onIframeLoad);
      window.removeEventListener('hashchange', onParentHashChange);
      window.clearInterval(poll);
    };
  }, [openApiUrl]);

  return (
    <Layout title='API Reference' description='API Reference Documentation'>
      <iframe
        ref={iframeRef}
        src={initialSrc}
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
        }}
        title='OpenAPI Documentation'
      />
    </Layout>
  );
}
