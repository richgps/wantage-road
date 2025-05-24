/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import {
  TransformWrapper,
  TransformComponent,
} from 'react-zoom-pan-pinch';
import { X } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';

/* ---------------------------------------------------------------------------
 | InlineImage – Sanity image renderer
 * ------------------------------------------------------------------------- */
function InlineImage({ value }: { value: any }) {
  const [open, setOpen] = useState(false);
  const [transformRef, setTransformRef] = useState<any>(null);

  /* freeze background scroll while light-box is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [open]);

  /* handle screen rotation - recenter and refit image */
  useEffect(() => {
    if (!open || !transformRef) return;

    const handleResize = () => {
      // Small delay to ensure viewport dimensions are updated
      setTimeout(() => {
        transformRef.resetTransform();
        transformRef.centerView();
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [open, transformRef]);

  const full  = urlFor(value).url();            // original asset
  const small = urlFor(value).width(1200).url(); // inline variant
  const alt   = value.alt || 'Blog image';

  return (
    <>
      {/* ------- inline (100 % column width) ------- */}
      <figure
        className="relative my-6 cursor-pointer group"
        onClick={() => setOpen(true)}
      >
        <Image
          src={small}
          alt={alt}
          width={1200}
          height={800}
          sizes="100vw"
          className="w-full h-auto rounded-lg"
        />

        {/* hover expand icon */}
        <div className="absolute inset-0 flex items-center justify-center
                        bg-black/25 opacity-0 group-hover:opacity-100 transition">
          <svg className="w-10 h-10 text-white" strokeWidth={3} fill="none"
               stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M9 3H5a2 2 0 0 0-2 2v4m0 6v4a2 2 0 0 0 2 2h4m6-18h4a2 2 0 0 1 2 2v4m0 6v4a2 2 0 0 1-2 2h-4" />
          </svg>
        </div>
      </figure>

      {/* ------- full-screen light-box ------- */}
      {open && (
        <dialog open className="fixed inset-0 z-50 bg-black/80 p-0 m-0">
          <div className="relative w-screen h-screen flex items-center justify-center">
            <TransformWrapper
              initialScale={1}
              minScale={0.1}
              maxScale={8}
              centerOnInit={true}
              wheel={{ step: 0.15 }}
              limitToBounds={true}
              onInit={(ref) => setTransformRef(ref)}
            >
              <TransformComponent wrapperClass="w-full h-full">
                <div className="w-full h-full flex items-center justify-center p-4">
                  <img
                    src={full}
                    alt={alt}
                    draggable={false}
                    className="select-none"
                    style={{
                      maxWidth: 'calc(100vw - 2rem)',
                      maxHeight: 'calc(100vh - 2rem)',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              </TransformComponent>
            </TransformWrapper>

            {/* close button - positioned to always be visible */}
            <button
              onClick={() => setOpen(false)}
              className="fixed top-4 right-4 z-[60] p-3 rounded-full
                         bg-black/70 text-white hover:bg-black focus:outline-none
                         shadow-lg backdrop-blur-sm"
              style={{ 
                position: 'fixed',
                top: 'max(16px, env(safe-area-inset-top, 16px))',
                right: 'max(16px, env(safe-area-inset-right, 16px))'
              }}
              aria-label="Close full-screen image"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}

/* ---------------------------------------------------------------------------
 | Portable-Text component map
 * ------------------------------------------------------------------------- */
const components: PortableTextComponents = {
  types: { image: InlineImage },
};

export function BlogPortableText({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}