declare module "idiomorph";
declare module "@config/frontend.js";

declare module "*.css" {
  const styles: string;
  export default styles;
}

declare module "*.css?text" {
  const styles: string;
  export default styles;
}
