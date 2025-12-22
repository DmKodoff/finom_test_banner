/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-app': 'var(--bg-app)',
        'bg-content': 'var(--bg-content)',
        'text-default': 'var(--text-default)',
        'text-light': 'var(--text-light)',
        'text-success': 'var(--text-success)',
        'btn-primary-bg': 'var(--btn-primary-bg)',
        'btn-primary-color': 'var(--btn-primary-color)',
        'border-modal': 'var(--border-modal)',
        'fill-success': 'var(--text-success)',
      },
    },
  },
  plugins: [],
}
