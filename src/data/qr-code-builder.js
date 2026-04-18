// Simple QR Code Generator using qr-code-styling or canvas
// For now, we'll create a simple text-based QR representation

export function buildQRCode(url) {
  const encodedUrl = encodeURIComponent(url);
  const qrcodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}`;

  return [
    { text: 'QR Code Generator', cls: 'heading' },
    { text: '' },
    { text: `  Scanning this QR code will take you to:`, cls: 'dim' },
    { text: `  ${url}`, cls: 'accent' },
    { text: '' },
    {
      html: `  <img src="${qrcodeUrl}" alt="QR Code" style="image-rendering:pixelated;border:2px solid var(--accent);padding:8px;background:white;margin:8px 0;" />`
    },
    { text: '' },
    { text: '  💡 Share this QR code or screenshot to share your portfolio!', cls: 'cyan' },
    { text: '  Use your phone camera to scan.', cls: 'dim' },
  ];
}

export function buildQRCodeSimple() {
  return [
    { text: 'QR Code', cls: 'heading' },
    { text: '' },
    { text: '  Would scan to: your portfolio', cls: 'accent' },
    { text: '' },
    { text: '  ██████████████████████████████', cls: 'cyan' },
    { text: '  ██                          ██', cls: 'cyan' },
    { text: '  ██  ████████  ██████  ████  ██', cls: 'cyan' },
    { text: '  ██  ██    ██  ██        ██  ██', cls: 'cyan' },
    { text: '  ██  ██████    ██████  ████  ██', cls: 'cyan' },
    { text: '  ██                          ██', cls: 'cyan' },
    { text: '  ██████████████████████████████', cls: 'cyan' },
    { text: '' },
    { text: '  Share your portfolio with a single scan! 📱', cls: 'accent' },
  ];
}
