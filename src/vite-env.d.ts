/// <reference types="vite/client" />

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.svg?react' {
  import { ComponentType, SVGProps } from 'react'
  const ReactComponent: ComponentType<SVGProps<SVGSVGElement>>
  export default ReactComponent
}

declare module '*.svg?url' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.webp' {
  const content: string
  export default content
}

