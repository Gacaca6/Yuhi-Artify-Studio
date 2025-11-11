import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const SparklesIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3a6.5 6.5 0 0 0-6.5 6.5c0 1.954 1.258 3.635 3 4.5" />
    <path d="M12 21a6.5 6.5 0 0 0 6.5-6.5c0-1.954-1.258-3.635-3-4.5" />
    <path d="M6 10l-3 3 3 3" />
    <path d="M18 10l3 3-3 3" />
    <path d="m19 5-1-1" />
    <path d="m5 19-1-1" />
    <path d="m5 5 1-1" />
    <path d="m19 19 1-1" />
  </svg>
);

// FIX: Add missing UploadCloudIcon component.
export const UploadCloudIcon: React.FC<IconProps> = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2.4-3-4.1-5.6-4.1-1.2 0-2.3.5-3.1 1.4-1.2-.8-2.7-1.3-4.2-1.3-3.3 0-6 2.7-6 6 0 1.4.5 2.8 1.4 3.9" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
);

export const ImageIcon: React.FC<IconProps> = (props) => (
    <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
        <circle cx="9" cy="9" r="2"></circle>
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
);
