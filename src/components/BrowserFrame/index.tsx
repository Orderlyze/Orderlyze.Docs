import React from 'react';

type BrowserFrameProps = {
  src: string;
  alt?: string;
  url?: string;
  children?: React.ReactNode;
};

export default function BrowserFrame({
  src,
  alt = '',
  url = 'web.orderlyze.com',
  children,
}: BrowserFrameProps): React.ReactElement {
  return (
    <div className="browser-frame">
      <div className="browser-bar">
        <div className="browser-dots">
          <span className="dot-red" />
          <span className="dot-yellow" />
          <span className="dot-green" />
        </div>
        <div className="browser-url">
          <span>{url}</span>
        </div>
        <div className="browser-bar-spacer" />
      </div>
      {children ?? <img src={src} alt={alt} />}
    </div>
  );
}
