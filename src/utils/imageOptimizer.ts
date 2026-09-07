/**
 * Client-side image optimizer and compressor.
 * Prevents localStorage QuotaExceeded errors by resizing large camera/mockup photos
 * to a max dimension of 1200px and compressing to high-efficiency JPEG/WebP.
 */

export const optimizeImageFile = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    // SVGs do not need canvas compression
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || '');
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => resolve('');
    reader.onload = (readerEvent) => {
      const rawDataUrl = readerEvent.target?.result as string;
      if (!rawDataUrl) {
        resolve('');
        return;
      }

      const img = new Image();
      img.onerror = () => {
        // Fallback to raw data URL if image decoding fails
        resolve(rawDataUrl);
      };

      img.onload = () => {
        try {
          const MAX_DIM = 1200;
          let { width, height } = img;

          if (width === 0 || height === 0) {
            resolve(rawDataUrl);
            return;
          }

          if (width > MAX_DIM || height > MAX_DIM) {
            if (width > height) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            } else {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            resolve(rawDataUrl);
            return;
          }

          // Draw image
          ctx.drawImage(img, 0, 0, width, height);

          // If PNG and transparent, check if we can keep PNG or compress
          const isPng = file.type === 'image/png';
          let outputDataUrl: string;

          if (isPng) {
            outputDataUrl = canvas.toDataURL('image/png');
            // If PNG is over 1.5MB, convert to high-quality JPEG on clean white background
            if (outputDataUrl.length > 1_500_000) {
              const bgCanvas = document.createElement('canvas');
              bgCanvas.width = width;
              bgCanvas.height = height;
              const bgCtx = bgCanvas.getContext('2d');
              if (bgCtx) {
                bgCtx.fillStyle = '#FAF8F5';
                bgCtx.fillRect(0, 0, width, height);
                bgCtx.drawImage(img, 0, 0, width, height);
                outputDataUrl = bgCanvas.toDataURL('image/jpeg', 0.84);
              }
            }
          } else {
            outputDataUrl = canvas.toDataURL('image/jpeg', 0.84);
          }

          resolve(outputDataUrl);
        } catch {
          // If any canvas error occurs (e.g. CORS or memory), return raw
          resolve(rawDataUrl);
        }
      };

      img.src = rawDataUrl;
    };

    reader.readAsDataURL(file);
  });
};
