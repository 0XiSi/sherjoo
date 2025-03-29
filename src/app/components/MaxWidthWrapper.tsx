'use cache'

import React from 'react';

interface MaxWidthWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default async function MaxWidthWrapper({ children, className }: MaxWidthWrapperProps) {
  return (
    <div className={`mx-auto max-w-[752px] max-w-screen-xl px- sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}