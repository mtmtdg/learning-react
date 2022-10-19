import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef } from 'react';

import styles from './Viewer.module.css';

interface ViewerProps {}

export default function Viewer(props: ViewerProps) {
  const viewer = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: 'page4.pptx',
      },
      viewer.current!
    ).then(instance => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;

      documentViewer.addEventListener('documentLoaded', () => {});
    });
  }, []);

  return <div className={styles.webviewer} ref={viewer}></div>;
}
