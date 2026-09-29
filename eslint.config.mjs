import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  ...nextVitals,
  {
    ignores: ['.next/**', '.contentlayer/**', 'node_modules/**', 'artifacts/**', 'cache/**', 'next-env.d.ts'],
  },
]

export default eslintConfig
