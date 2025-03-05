import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
export default{
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'background-primary': '#000000',
  			'background-secondary': '#09090b',
  			'violet-dark': '#1e1b4b',
  			'violet-primary': '#8b5cf6',
  			'violet-light': '#c4b5fd',
  			white: '#ffffff',
  			'gradient-dark': 'linear-gradient(to bottom, #000000, #1e1b4b)',
  			'gradient-accent': 'linear-gradient(30deg, #8b5cf6, #1e1b4b 20%, transparent)',
  			'input-bg': 'rgba(0, 0, 0, 0.8)',
  			'input-border': 'rgba(76, 29, 149, 0.5)',
  			'button-hover': '#1e1b4b',
  			'text-primary': '#f8fafc',
  			'text-secondary': '#ddd6fe',
  			'icon-color': '#a78bfa',
  			'focus-ring': 'rgba(139, 92, 246, 0.5)',
  			'border-subtle': 'rgba(76, 29, 149, 0.3)',
  			'hover-state': 'rgba(139, 92, 246, 0.1)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
}satisfies Config;
