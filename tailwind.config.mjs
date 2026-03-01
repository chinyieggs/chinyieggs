import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  plugins: [tailwindcssAnimate, typography],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        // ===== 日式品牌色 (Chinyi Theme) =====
        aka: {
          DEFAULT: 'hsl(var(--aka))',
          dark: 'hsl(var(--aka-dark))',
          light: 'hsl(var(--aka-light))',
          pale: 'hsl(var(--aka-pale))',
        },
        shiro: 'hsl(var(--shiro))',
        kinari: 'hsl(var(--kinari))',
        hai: {
          DEFAULT: 'hsl(var(--hai))',
          light: 'hsl(var(--hai-light))',
        },
        sumi: 'hsl(var(--sumi))',
        ki: 'hsl(var(--ki))',
        cha: 'hsl(var(--cha))',
        // ===== 系統色彩 =====
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        brand: {
          red: 'hsl(var(--primary))',
          'red-light': 'hsl(var(--aka-light))',
          'red-dark': 'hsl(var(--aka-dark))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
        // 日式字體
        serif: ['Cormorant Garamond', 'Noto Serif', 'Noto Serif TC', 'serif'],
        'sans-jp': ['Noto Sans JP', 'Noto Sans TC', 'sans-serif'],
      },
      spacing: {
        section: '120px',
        'section-sm': '80px',
        'section-xs': '60px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'hsl(0 0% 42%)',
              '--tw-prose-headings': 'hsl(0 0% 8%)',
              p: {
                fontFamily: "'Noto Serif', 'Noto Serif TC', Georgia, serif",
                fontSize: '1.0625rem',
                lineHeight: '1.9',
                letterSpacing: '0.01em',
              },
              li: {
                fontFamily: "'Noto Serif', 'Noto Serif TC', Georgia, serif",
                fontSize: '1.0625rem',
                lineHeight: '1.9',
              },
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
              h2: {
                fontFamily: "'Cormorant Garamond', 'Noto Serif', 'Noto Serif TC', serif",
                fontWeight: '700',
                fontStyle: 'italic',
                letterSpacing: '0.02em',
                color: 'hsl(0 0% 8%)',
              },
              h3: {
                fontFamily: "'Cormorant Garamond', 'Noto Serif', 'Noto Serif TC', serif",
                fontWeight: '700',
                fontStyle: 'italic',
                letterSpacing: '0.02em',
                color: 'hsl(0 0% 8%)',
              },
              h4: {
                fontFamily: "'Cormorant Garamond', 'Noto Serif', 'Noto Serif TC', serif",
                fontWeight: '600',
                letterSpacing: '0.02em',
                color: 'hsl(0 0% 8%)',
              },
              strong: {
                fontWeight: '600',
                color: 'hsl(0 0% 24%)',
              },
              blockquote: {
                fontFamily: "'Noto Serif', 'Noto Serif TC', Georgia, serif",
                fontStyle: 'italic',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.75rem',
              },
              h3: {
                fontSize: '1.375rem',
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '2rem',
              },
              h3: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
