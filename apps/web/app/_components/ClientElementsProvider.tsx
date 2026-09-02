'use client';

import { useEffect } from 'react';

export function ClientElementsProvider() {
  useEffect(() => {
    import('@a11ypros/a11y-ui-elements');
  }, []);

  return null;
}
