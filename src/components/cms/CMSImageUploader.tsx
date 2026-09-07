import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  X,
  RotateCcw,
  Check,
  Eye,
  AlertCircle,
} from 'lucide-react';
import { optimizeImageFile } from '../../utils/imageOptimizer';

export interface CMSImageUploaderProps {
  label: string;
  sublabel?: string;
  helperText?: string;
  value?: string | null;
  currentImageUrl?: string | null;
  defaultImageUrl?: string | null;
  onChange?: (url: string | null) => void;
  onImageChange?: (url: string | null) => void;
  aspectRatio?: 'book' | 'portrait' | 'square' | 'wide';
  recommendedSize?: string;
  previewFit?: 'contain' | 'cover';
  sectionName?: string;
  presetOptions?: Array<{ label: string; url: string }>;
}

export const CMSImageUploader: React.FC<CMSImageUploaderProps> = ({
  label,
  sublabel,
  helperText,
  value,
  currentImageUrl,
  defaultImageUrl,
  onChange,
  onImageChange,
  aspectRatio = 'book',
  recommendedSize = '1200 × 1600px recommended',
  previewFit = 'contain',
  sectionName,
  presetOptions = [],
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Support both value and currentImageUrl props
  const resolvedValue = value !== undefined ? value : currentImageUrl;
  const activeImage = resolvedValue || defaultImageUrl;
  const isCustom = Boolean(resolvedValue && resolvedValue !== defaultImageUrl);

  const displayDescription = helperText || sublabel;

  const triggerChange = (newUrl: string | null) => {
    if (onChange) onChange(newUrl);
    if (onImageChange) onImageChange(newUrl);
  };

  const handleProcessFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }
    setErrorMessage(null);
    setIsProcessing(true);
    try {
      const optimizedDataUrl = await optimizeImageFile(file);
      if (!optimizedDataUrl) {
        setErrorMessage('Could not read image file. Please try another image.');
        return;
      }
      triggerChange(optimizedDataUrl);
    } catch (err: any) {
      setErrorMessage(
        'Could not process image file: ' + (err?.message || 'Please try another file.')
      );
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      setErrorMessage(null);
      triggerChange(urlInput.trim());
      setUrlInput('');
      setShowUrlInput(false);
    }
  };

  const handleClear = () => {
    setErrorMessage(null);
    triggerChange(null);
  };

  const aspectClasses: Record<string, string> = {
    book: 'aspect-[3/4]',
    portrait: 'aspect-[4/5]',
    square: 'aspect-square',
    wide: 'aspect-video',
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E2D8] shadow-2xs space-y-3.5">
      {/* Header Info */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-serif text-sm font-semibold text-[#194A37]">{label}</h4>
            {isCustom ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#194A37] text-white">
                <Check className="w-2.5 h-2.5" />
                Custom Image
              </span>
            ) : activeImage ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-sans font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E8E2D8] text-[#84937D]">
                Default Asset
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-sans font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E8E2D8] text-[#84937D]">
                No Image Set
              </span>
            )}
          </div>
          {displayDescription && (
            <p className="font-sans text-xs text-[#1F2E28]/70 mt-0.5 leading-relaxed">
              {displayDescription}
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {activeImage && (
            <button
              type="button"
              onClick={() => setShowZoomModal(true)}
              className="p-1.5 text-[#84937D] hover:text-[#194A37] hover:bg-[#FAF8F5] rounded-lg transition-colors cursor-pointer"
              title="Preview large image"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
          {isCustom && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1 text-[11px] text-[#84937D] hover:text-[#B81617] px-2 py-1 rounded-lg hover:bg-[#FAF8F5] transition-colors cursor-pointer"
              title="Revert to default image"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Stage: Image Preview & Drop Area */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        {/* Visual Thumbnail */}
        <div className="sm:col-span-4 flex justify-center">
          <div
            className={`relative w-28 sm:w-32 ${aspectClasses[aspectRatio] || 'aspect-[3/4]'} rounded-xl overflow-hidden border border-[#E8E2D8] bg-[#FAF8F5] shadow-xs flex items-center justify-center group`}
          >
            {activeImage ? (
              <>
                <img
                  src={activeImage}
                  alt={label}
                  className={`w-full h-full ${previewFit === 'contain' ? 'object-contain p-1.5' : 'object-cover'}`}
                  referrerPolicy="no-referrer"
                  onError={() => {
                    // Handled gracefully
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowZoomModal(true)}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer"
                >
                  <Eye className="w-5 h-5 drop-shadow-md" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-3 text-center text-[#84937D]">
                <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                <span className="text-[10px] leading-tight">No image uploaded</span>
              </div>
            )}

            {isProcessing && (
              <div className="absolute inset-0 bg-white/85 backdrop-blur-xs flex flex-col items-center justify-center z-10 gap-1">
                <div className="w-5 h-5 border-2 border-[#194A37] border-t-transparent rounded-full animate-spin" />
                <span className="text-[9px] font-sans font-medium text-[#194A37]">Optimizing...</span>
              </div>
            )}
          </div>
        </div>

        {/* Upload Zone & Actions */}
        <div className="sm:col-span-8 space-y-2.5">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleFileChange}
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-1.5 ${
              isDragging
                ? 'border-[#194A37] bg-[#194A37]/5 scale-[1.01]'
                : 'border-[#E8E2D8] hover:border-[#194A37]/50 hover:bg-[#FAF8F5]'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-[#194A37]/10 flex items-center justify-center text-[#194A37]">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <p className="font-sans text-xs font-semibold text-[#194A37]">
                Click to browse or drop image here
              </p>
              <p className="font-sans text-[10px] text-[#84937D] mt-0.5">
                PNG, JPG, WebP or SVG ({recommendedSize})
              </p>
            </div>
          </div>

          {/* Preset Buttons if provided */}
          {presetOptions.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-sans text-[#84937D] mr-1">Presets:</span>
              {presetOptions.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => triggerChange(preset.url)}
                  className="px-2 py-0.5 rounded-md text-[11px] font-sans bg-[#FAF8F5] hover:bg-[#194A37] hover:text-white text-[#194A37] border border-[#E8E2D8] transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}

          {/* Toggle URL Input */}
          <div className="pt-1">
            {!showUrlInput ? (
              <button
                type="button"
                onClick={() => setShowUrlInput(true)}
                className="text-[11px] font-sans text-[#194A37] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <LinkIcon className="w-3 h-3" />
                <span>Or paste an image web link (URL)</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 mt-1">
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg or data:image..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleApplyUrl())}
                  className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-3 py-1.5 bg-[#194A37] text-white text-xs rounded-lg hover:bg-[#0F2F23] cursor-pointer"
                >
                  Set
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUrlInput(false);
                    setUrlInput('');
                  }}
                  className="p-1.5 text-[#84937D] hover:text-[#1F2E28] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="flex items-center gap-1.5 text-xs text-[#B81617] bg-red-50 p-2.5 rounded-lg border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Large Image Preview Modal */}
      {showZoomModal && activeImage && (
        <div
          className="fixed inset-0 z-70 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowZoomModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-4 relative shadow-2xl border border-[#E8E2D8]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
              <div>
                <h4 className="font-serif text-base font-semibold text-[#194A37]">{label}</h4>
                {sectionName && (
                  <p className="text-[11px] text-[#84937D]">Attached to: {sectionName}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowZoomModal(false)}
                className="p-1 rounded-lg text-[#84937D] hover:text-[#1F2E28] hover:bg-[#FAF8F5] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-center bg-[#FAF8F5] rounded-xl my-3 max-h-[60vh] overflow-hidden">
              <img
                src={activeImage}
                alt={label}
                className="max-h-[55vh] max-w-full object-contain drop-shadow-lg rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center justify-between pt-2 text-xs text-[#84937D]">
              <span>Preview Mode</span>
              <button
                type="button"
                onClick={() => setShowZoomModal(false)}
                className="px-4 py-1.5 bg-[#194A37] text-white rounded-lg text-xs cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
