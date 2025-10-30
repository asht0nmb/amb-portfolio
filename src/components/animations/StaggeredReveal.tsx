"use client";

import { ReactNode, Children, cloneElement, isValidElement } from 'react';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimations';

interface StaggeredRevealProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export default function StaggeredReveal({
  children,
  staggerDelay = 100,
  className = ''
}: StaggeredRevealProps) {
  const childrenArray = Children.toArray(children);
  const { containerRef, getItemStyles } = useStaggeredAnimation(
    childrenArray.length,
    staggerDelay
  );

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={className}
    >
      {childrenArray.map((child, index) => {
        if (isValidElement(child)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const childStyle = (child.props as any)?.style || {};
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return cloneElement(child as React.ReactElement<any>, {
            key: index,
            style: {
              ...childStyle,
              ...getItemStyles(index)
            }
          });
        }
        return (
          <div
            key={index}
            style={getItemStyles(index)}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}