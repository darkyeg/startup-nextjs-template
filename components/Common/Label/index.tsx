'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>((props, ref) => <LabelPrimitive.Root ref={ref} {...props} />);

Label.displayName = LabelPrimitive.Root.displayName;

export default Label;
