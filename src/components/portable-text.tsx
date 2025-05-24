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

  /* freeze background scroll while light-box is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [open]);

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
              maxScale={4}
              centerOnInit={true}
              wheel={{ step: 0.15 }}
              limitToBounds={true}
            >
              <TransformComponent wrapperClass="w-full h-full">
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={full}
                    alt={alt}
                    draggable={false}
                    className="w-auto h-auto max-w-[95vw] max-h-[95vh] object-contain select-none"
                  />
                </div>
              </TransformComponent>
            </TransformWrapper>

            {/* close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full
                         bg-black/60 text-white hover:bg-black focus:outline-none"
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