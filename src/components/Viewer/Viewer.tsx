/* non free library pdftron
   https://www.pdftron.com/api/web/
   https://www.pdftron.com/api/web/global.html#WebViewerOptions
 */
import WebViewer, { WebViewerInstance } from '@pdftron/webviewer';
import { useEffect, useRef } from 'react';

import styles from './Viewer.module.css';

interface ViewerProps {}

export default function Viewer(props: ViewerProps) {
  const viewerElementRef = useRef(null);
  const viewerInstanceRef = useRef<WebViewerInstance>();

  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: 'page4.pptx',
        disabledElements: ['header'],
        isReadOnly: true,
        enableAnnotations: false,
        forceClientSideInit: true,
        disableLogs: true,
      },
      viewerElementRef.current!
    ).then(instance => {
      viewerInstanceRef.current = instance;

      const { documentViewer, annotationManager, Tools } = instance.Core;
      const UI = instance.UI;

      documentViewer.enableReadOnlyMode();
      annotationManager.enableReadOnlyMode();

      // only show one page
      UI.setLayoutMode(UI.LayoutMode.Single);

      // disable pan and select button
      UI.disableTools([Tools.ToolNames.PAN, Tools.ToolNames.EDIT, Tools.ToolNames.MARQUEE]);

      // disable more buttons like [search, comments]
      UI.disableFeatures([
        UI.Feature.Search, // search
        UI.Feature.NotesPanel, // comments
        UI.Feature.PageNavigation, // mouse scroll
        UI.Feature.Ribbons, // [View Annotate Shapes Insert EditText FillAndSign Forms]
        UI.Feature.TextSelection,
        UI.Feature.Download,
        UI.Feature.Print,
        UI.Feature.MultiTab,
        UI.Feature.MultiViewerMode,
      ]);

      // hide buttons on header or hide header itself
      UI.disableElements(['menuButton', 'leftPanelButton', 'viewControlsButton', 'zoomOverlayButton']);
      UI.disableElements(['header']);
    });
  }, []);

  const getCurrentPage = () => {
    const documentViewer = viewerInstanceRef.current?.Core.documentViewer;
    documentViewer && console.log(documentViewer.getCurrentPage());
  };

  const goToPage3 = () => {
    const documentViewer = viewerInstanceRef.current?.Core.documentViewer;
    documentViewer?.setCurrentPage(3, false);
  };

  return (
    <>
      <div className={styles.webviewer} ref={viewerElementRef}></div>
      <button onClick={getCurrentPage}>get current page</button>
      <button onClick={goToPage3}>go to 3</button>
    </>
  );
}
