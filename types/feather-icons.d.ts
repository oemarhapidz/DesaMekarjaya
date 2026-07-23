declare module "feather-icons" {
  interface FeatherSvgOptions {
    width?: number | string;
    height?: number | string;
    color?: string;
    "stroke-width"?: number | string;
    "aria-hidden"?: string;
  }

  interface FeatherIcon {
    toSvg(options?: FeatherSvgOptions): string;
  }

  const feather: {
    icons: Record<string, FeatherIcon>;
  };

  export default feather;
}
