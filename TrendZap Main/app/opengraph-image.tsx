import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'TrendZap - Predict the Pulse of Social Media'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0a0a0a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
          position: 'relative',
        }}
      >
        {/* Gradient Orbs */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
            top: '-100px',
            left: '-100px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, transparent 70%)',
            bottom: '-50px',
            right: '-50px',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '60px',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '30px',
              letterSpacing: '-2px',
            }}
          >
            TrendZap
          </div>
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #a855f7, #38bdf8, #10b981)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '40px',
            }}
          >
            Predict the Pulse of Social Media
          </div>
          <div
            style={{
              fontSize: '28px',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '800px',
              lineHeight: 1.5,
            }}
          >
            Turn social media into prediction rewards. Win tokens for accurate forecasts.
          </div>
        </div>

        {/* Platform Icons */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            gap: '30px',
            fontSize: '32px',
          }}
        >
          <div>🎬</div>
          <div>📸</div>
          <div>🎥</div>
          <div>𝕏</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
