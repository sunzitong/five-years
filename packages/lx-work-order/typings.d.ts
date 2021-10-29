declare module '*.css';
declare module '*.less';
declare module "*.png";
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
  const url: string
  export default url
}

interface Window {
  previewImage: any;
}



declare module '@longfor/canvasbrush';
declare module 'postcss-px-to-viewport' {
  const px2viewport: (options: {
    /**
     * /需要转换的单位，默认为"px"
     */
    unitToConvert?: string,
    /**
     * 视窗的宽度，对应的是我们设计稿的宽度
     */
    viewportWidth?: number,
    /**
     *  指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
     */
    unitPrecision?: number,
    /**
     * 能转化为vw的属性列表
     */
    propList?: any[],
    /**
     * 指定需要转换成的视窗单位，建议使用vw
     */
    viewportUnit?: string,
    /**
     * 字体使用的视口单位
     */
    fontViewportUnit?: string,
    /**
     * 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
     */
    selectorBlackList?: any[],
    /**
     * 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
     */
    minPixelValue?: number,
    /**
     * 允许在媒体查询中转换`px`
     */
    mediaQuery?: boolean,
    /**
     * /是否直接更换属性值，而不添加备用属性
     */
    replace?: boolean,
    /**
     * 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
     */
    exclude?: any[] | RegExp | undefined,
    include?: any[] | RegExp | undefined,
    /**
     * 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
     */
    landscape?: boolean,
    /**
     * 横屏时使用的单位
     */
    landscapeUnit?: string,
    /**
     * 横屏时使用的视口宽度
     */
    landscapeWidth?: number
  }) => void;
  export default px2viewport;
}