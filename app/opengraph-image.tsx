import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const alt = 'Perros Rescatados - Un Final Feliz'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  const logoData = readFileSync(join(process.cwd(), 'public', 'logo.png'))
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    <div
      style={{
        background: '#F97316',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 56,
        padding: '60px 80px',
      }}
    >
      <img
        src={logoSrc}
        width={320}
        height={320}
        style={{ borderRadius: '50%', flexShrink: 0, objectFit: 'cover' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 70, fontWeight: 900, color: 'white', lineHeight: 1.1 }}>
          Perros Rescatados
        </div>
        <div style={{ fontSize: 42, color: '#FED7AA', fontWeight: 700 }}>
          Un Final Feliz
        </div>
        <div style={{ fontSize: 26, color: '#FFF7ED', marginTop: 4 }}>
          Adopta · Rescata · Ama 🐾
        </div>
      </div>
    </div>,
    { ...size }
  )
}
