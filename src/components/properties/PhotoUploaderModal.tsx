import React, { useState } from 'react';
import { Upload, X, CheckCircle2, Image as ImageIcon, RefreshCw, AlertCircle } from 'lucide-react';

interface PhotoUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotosUpdated: () => void;
}

const PHOTO_SLOTS = [
  { slot: 1, label: 'Lanai - Canal & Mountain View', standard: 'unit-3205-01.webp', rawNum: 1 },
  { slot: 2, label: 'Living Room - Leather Couch & Red Rug', standard: 'unit-3205-02.webp', rawNum: 2 },
  { slot: 3, label: 'Lanai - Ocean & Diamond Head Angle', standard: 'unit-3205-03.webp', rawNum: 3 },
  { slot: 4, label: 'Suite View - Living into Bedroom', standard: 'unit-3205-04.webp', rawNum: 4 },
  { slot: 5, label: 'Accordion Privacy Wall Partition', standard: 'unit-3205-05.webp', rawNum: 5 },
  { slot: 6, label: 'Living & Dining - 3 Stool Counter', standard: 'unit-3205-06.webp', rawNum: 6 },
  { slot: 7, label: 'Gourmet Kitchen - Granite & Range', standard: 'unit-3205-07.webp', rawNum: 7 },
  { slot: 8, label: 'Master Bedroom - Platform Bed & Dresser', standard: 'unit-3205-08.webp', rawNum: 8 },
  { slot: 9, label: 'Kitchen & TV View into Bedroom', standard: 'unit-3205-09.webp', rawNum: 9 },
  { slot: 10, label: 'Breakfast Bar Peninsula with Stools', standard: 'unit-3205-10.webp', rawNum: 10 },
  { slot: 11, label: 'Walk-In Shower - Emerald Tile', standard: 'unit-3205-11.webp', rawNum: 11 },
  { slot: 12, label: 'Bathroom Vanity - Green Granite Counter', standard: 'unit-3205-12.webp', rawNum: 12 },
];

export const processAndSavePhotos = async (files: FileList | File[]): Promise<number> => {
  const storedMap: Record<number, string> = (() => {
    try {
      const item = localStorage.getItem('wb_3205_custom_photos');
      return item ? JSON.parse(item) : {};
    } catch {
      return {};
    }
  })();

  let updatedCount = 0;
  const fileArray = Array.from(files);

  for (let i = 0; i < fileArray.length; i++) {
    const file = fileArray[i];
    const name = file.name;

    let slotNum: number | null = null;
    const banyanMatch = name.match(/#?3205.*?\((\d+)\)/i) || name.match(/unit-3205-0?(\d+)/i) || name.match(/\((\d+)\)/);
    if (banyanMatch && banyanMatch[1]) {
      slotNum = parseInt(banyanMatch[1], 10);
    } else if (fileArray.length === 12) {
      slotNum = i + 1;
    } else {
      const anyNum = name.match(/(\d+)/);
      if (anyNum && anyNum[1]) {
        const val = parseInt(anyNum[1], 10);
        if (val >= 1 && val <= 12) slotNum = val;
      }
    }

    if (slotNum && slotNum >= 1 && slotNum <= 12) {
      const base64: string = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const standardName = `unit-3205-${slotNum.toString().padStart(2, '0')}.webp`;
      const rawName = `Waikiki Banyan T2 -#3205 (${slotNum}).webp`;

      storedMap[slotNum] = base64;

      try {
        await fetch('/api/save-property-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: standardName,
            altFilename: rawName,
            base64Data: base64,
          }),
        });
      } catch (e) {
        console.warn('Could not post to /api/save-property-photo:', e);
      }

      updatedCount++;
    }
  }

  localStorage.setItem('wb_3205_custom_photos', JSON.stringify(storedMap));
  return updatedCount;
};

export const PhotoUploaderModal: React.FC<PhotoUploaderModalProps> = ({
  isOpen,
  onClose,
  onPhotosUpdated,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [savedCount, setSavedCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('wb_3205_custom_photos');
      return stored ? Object.keys(JSON.parse(stored)).length : 0;
    } catch {
      return 0;
    }
  });

  if (!isOpen) return null;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);
    setStatusMessage('Processing and saving unit photos to disk...');

    try {
      const updatedCount = await processAndSavePhotos(files);
      const stored = localStorage.getItem('wb_3205_custom_photos');
      setSavedCount(stored ? Object.keys(JSON.parse(stored)).length : 0);
      setStatusMessage(`Successfully loaded and saved ${updatedCount} authentic photos!`);
      onPhotosUpdated();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setStatusMessage(`Error: ${msg}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleClear = () => {
    localStorage.removeItem('wb_3205_custom_photos');
    setSavedCount(0);
    setStatusMessage('Custom photo cache cleared. Reset to default gallery.');
    onPhotosUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8DCC6] relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#1A3B34]/60 hover:text-[#1A3B34] hover:bg-[#F9F7F2] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[#1A3B34]/10 text-[#1A3B34] flex items-center justify-center">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A3B34]">
              Unit #3205 Authentic Photos
            </h3>
            <p className="text-xs text-[#1A3B34]/70">
              Directly loads your genuine 12 unit photos into the website and saves them to disk.
            </p>
          </div>
        </div>

        {/* Dropzone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="my-4 border-2 border-dashed border-[#C59B4B] bg-[#F9F7F2] rounded-2xl p-6 text-center hover:bg-[#F0EBE1] transition-colors cursor-pointer"
          onClick={() => {
            const el = document.getElementById('photo-upload-input');
            if (el) el.click();
          }}
        >
          <input
            id="photo-upload-input"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <Upload className="w-8 h-8 mx-auto text-[#C59B4B] mb-2" />
          <p className="font-semibold text-sm text-[#1A3B34]">
            Drag & drop your 12 unit photos here, or click to browse
          </p>
          <p className="text-xs text-[#1A3B34]/60 mt-1">
            Accepts all 12 webp files (e.g. <span className="font-mono">Waikiki Banyan T2 -#3205 (1).webp</span>)
          </p>
        </div>

        {statusMessage && (
          <div className="mb-4 p-3 rounded-xl bg-[#1A3B34]/5 border border-[#1A3B34]/10 flex items-center gap-2 text-xs text-[#1A3B34]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Status list */}
        <div className="flex-1 overflow-y-auto pr-1 my-2 border rounded-xl border-[#E8DCC6] p-3 divide-y divide-[#E8DCC6]/60">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#1A3B34]/60 pb-2 flex justify-between">
            <span>Photo Slot / Area</span>
            <span>Status</span>
          </div>
          {PHOTO_SLOTS.map((slot) => {
            const isLoaded = (() => {
              try {
                const stored = localStorage.getItem('wb_3205_custom_photos');
                return stored && JSON.parse(stored)[slot.slot];
              } catch {
                return false;
              }
            })();

            return (
              <div key={slot.slot} className="py-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1A3B34]/10 text-[10px] font-bold flex items-center justify-center text-[#1A3B34]">
                    {slot.slot}
                  </span>
                  <span className="font-medium text-[#1A3B34]">{slot.label}</span>
                </div>
                {isLoaded ? (
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[#1A3B34]/50 text-[11px]">
                    <AlertCircle className="w-3.5 h-3.5" /> Pending
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer controls */}
        <div className="mt-4 pt-3 border-t border-[#E8DCC6] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Photos
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#1A3B34] text-white text-xs font-semibold hover:bg-[#2C5248] transition-colors"
          >
            Done ({savedCount}/12 Loaded)
          </button>
        </div>
      </div>
    </div>
  );
};
