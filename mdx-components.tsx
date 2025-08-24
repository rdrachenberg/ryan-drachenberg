import { useMDXComponent } from 'next-contentlayer2/hooks';
import Image, { ImageProps } from 'next/image';
import React from 'react';
import clsx from 'clsx';

type Props = {
  code: string;
};

const NextImage = (props: ImageProps & { alt?: string }) => {
  const { alt = '', ...rest } = props;
  return <Image alt={alt} {...rest} />;
};

const Img = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const { className, ...rest } = props;
  return <img className={clsx(className)} {...rest} />;
};

const Pre = (props: React.HTMLAttributes<HTMLPreElement>) => {
  const { className, ...rest } = props;
  return <pre className={clsx('rounded-lg', className)} {...rest} />;
};

const A = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { className, href = '', ...rest } = props;
  const isExternal = /^https?:\/\//.test(href);
  return (
    <a
      className={clsx('underline underline-offset-2', className)}
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    />
  );
};

const components = {
  // Capitalized component used in MDX -> Next.js Image
  Image: NextImage,
  // Native tags from MDX content
  img: Img,
  pre: Pre,
  a: A,
};

export default function Mdx({ code }: Props) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
