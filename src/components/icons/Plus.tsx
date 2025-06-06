import type { SVGProps } from 'react'

export function Plus(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 256 256'
      {...props}
    >
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='12'
        fill='currentColor'
        d='M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12'
      ></path>
    </svg>
  )
}