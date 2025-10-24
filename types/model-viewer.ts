import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ModelViewerElement extends HTMLElement {
  canActivateAR?: () => Promise<boolean>;
  showPoster?: () => void;
  dismissPoster?: () => void;
  activateAR?: () => Promise<void> | void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': DetailedHTMLProps<HTMLAttributes<ModelViewerElement>, ModelViewerElement> & {
        src?: string;
        poster?: string;
        alt?: string;
        ar?: boolean | string;
        arModes?: string;
        cameraControls?: boolean | string;
        exposure?: number | string;
        shadowIntensity?: number | string;
        reveal?: 'auto' | 'interaction';
        loading?: 'lazy' | 'eager';
      };
    }
  }
}

declare module '@google/model-viewer';
