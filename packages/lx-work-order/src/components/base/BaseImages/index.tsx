import React, { useCallback } from 'react';
import BaseImage, { BaseImageProps } from '../BaseImage';
import { iwant } from '@guanyu/shared';
import cls from './index.less';

export interface BaseImagesProps {
  data: BaseImageProps[];
  /**
   * 画廊所有图片宽度
   * 可用单个配置覆盖
   */
  width?: number;
  /**
   * 画廊所有图片高度
   * 可用单个配置覆盖
   */
  height?: number;
  /**
   * 没有数据时展示
   */
  noData?: React.ReactNode;
}

const BaseImages: React.FC<BaseImagesProps> = props => {
  const { data, width = '100%', height = '100%', noData = '暂无图片' } = props;
  const arr = iwant.array<BaseImageProps>(data);

  return (
    <div className={cls.baseImages}>
      <div className={cls.baseImagesInner}>
        {data.map((item, i) => {
          return (
            <div
              key={`${item.src}-${i.toString()}`}
              className={cls.baseImagesItem}
            >
              <BaseImage
                onClick={(e, src) => {
                  const images = arr.map(img => img.src);
                  if (images.length === 0) return;
                  window.previewImage.start({
                    urls: images,
                    current: src,
                  });
                }}
                src={item.src}
                width={item.width || width}
                height={item.height || height}
              />
            </div>
          );
        })}
      </div>
      {arr.length === 0 && noData}
    </div>
  );
};

export default BaseImages;
