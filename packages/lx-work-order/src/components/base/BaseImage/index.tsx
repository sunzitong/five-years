import React from 'react';
import cls from './index.less';

/**
 * 列表元素排列方式
 */
export interface BaseImageProps {
  /**
   * 宽高比
   */
  width?: number | string;
  height?: number | string;
  src: string;
  onClick?: (e: React.MouseEvent, src: string) => void;
}

const BaseImage: React.FC<BaseImageProps> = props => {
  const { width = 100, height = 100, src, onClick = e => {} } = props;
  return (
    <div
      onClick={e => {
        typeof onClick === 'function' && onClick(e, src);
      }}
      className={cls.baseImage}
      style={{
        backgroundImage: `url(${src})`,
        width,
        paddingTop: height,
      }}
    />
  );
};

export default BaseImage;
