import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Perros Rescatados - Un Final Feliz'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: '#F97316',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
      }}
    >
      {/* Card container */}
      <div
        style={{
          background: 'white',
          borderRadius: 32,
          padding: '60px 80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          minWidth: 600,
        }}
      >
        <div style={{ fontSize: 90, lineHeight: 1 }}>🐾</div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#F97316',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          Perros Rescatados
        </div>
        <div
          style={{
            fontSize: 38,
            color: '#92400E',
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          Un Final Feliz
        </div>
        <div
          style={{
            fontSize: 26,
            color: '#6B7280',
            textAlign: 'center',
            marginTop: 8,
          }}
        >
          Adopta y dale el hogar que merece 🏠
        </div>
      </div>
    </div>,
    { ...size }
  )
}
