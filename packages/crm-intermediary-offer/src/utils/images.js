import imgUser from '@/assets/images/user.png';
import imgHead from '@/assets/images/icon_head.png';
import imgSucc from '@/assets/images/icon_success.png';
import imgHave from '@/assets/images/icon_have.png';
import imgBannerStore from '@/assets/images/banner_store.png';
import imgBannerRecord from '@/assets/images/banner_record.png';

export const bg = (img) => {
  if (img) return { backgroundImage: `url(${img})` };
  return {};
};

export const images = {
  user: bg(imgUser),
  head: imgHead,
  iconSucc: imgSucc,
  iconBooked: imgHave,
  bannerRecord: bg(imgBannerRecord),
  bannerStore: bg(imgBannerStore),
};
