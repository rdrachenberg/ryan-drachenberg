import { useMDXComponent } from "next-contentlayer/hooks";
import  Image, { ImageProps } from "next/image";

const components = {
    Image: (props: ImageProps) => <Image {...props} alt='' />,
};

type Props = {
    code: string;
};
export default function Mdx({ code }: Props) {
    const Component = useMDXComponent(code);

    return <Component components={components} />;
}