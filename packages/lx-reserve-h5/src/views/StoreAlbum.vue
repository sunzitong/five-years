<template>
  <div class="st_bg">
    <GoToBack class="top_back" title="门店相册" />
    <van-index-bar :index-list="indexList" :sticky-offset-top="95">
      <van-image-preview v-model="revewStatus" :images="activeList" />
      <van-index-anchor v-if="vrList && vrList.length" index="vr" />
      <div class="album_imgs" @click="imgsClick(vrList)">
        <img
          v-for="item in vrList"
          :key="item.url"
          class="album_img"
          alt=""
          :src="`${item.url}?x-oss-process=image/resize,s_280/interlace,1/format,jpg`"
        />
      </div>
      <van-overlay
        :show="revewVideoStatus"
        @click="revewVideoStatus = false"
      ></van-overlay>
      <van-swipe
        v-if="revewVideoStatus"
        class="video_swipe"
        @change="onVideoSwipeChange"
      >
        <template #indicator>
          <div class="video_swipe_indicator">
            {{ index + 1 }}/{{ videoList && videoList.length }}
          </div>
        </template>
        <van-swipe-item
          class="video_swipe_item"
          v-for="item in videoList"
          :key="item.url"
        >
          <video
            controls="controls"
            autoplay="autoplay"
            class="album_video"
            height="280"
            :src="item.url"
          />
        </van-swipe-item>
      </van-swipe>
      <van-index-anchor v-if="videoList && videoList.length" index="视频" />
      <div class="album_imgs" @click="videosClick(videoList)">
        <video
          v-for="item in videoList"
          :key="item.url"
          class="album_img video"
          alt=""
          :src="item.url"
        />
      </div>
      <div v-for="item in picObjList" :key="item.url">
        <van-index-anchor v-if="picObjList.length" :index="item.name" />
        <div class="album_imgs" @click="imgsClick(item.child)">
          <img
            v-for="pic in item.child"
            :key="pic.url"
            class="album_img"
            alt=""
            :src="`${pic.url}?x-oss-process=image/resize,s_280/interlace,1/format,jpg`"
          />
        </div>
      </div>
    </van-index-bar>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import GoToBack from "@/components/GoToBack.vue";
import Base from "./Base";
import { getProjectDetail } from "@/api";
import { getToken, toLogin } from "@/utils/guanyu";

@Component({
  components: {
    GoToBack,
  },
})
export default class StoreAlbum extends Base {
  @Inject() visitSource!: string;
  // app和小程序分享
  @Inject() share!: () => void;
  // 预览弹窗状态
  protected revewStatus = false;
  // 预览视频弹窗状态
  protected revewVideoStatus = false;
  // 页面数据
  protected data: any = {};
  // 当前视频编号
  protected index = 0;
  // 城市列表
  protected indexList: Array<string> = [];
  // vr列表
  protected vrList: Array<any> = [];
  // 当前预览列表
  protected activeList: Array<string> = [];
  // 视频列表
  protected videoList: Array<any> = [];
  // 图片列表
  protected picObjList: Array<any> = [];

  mounted() {
    this.getProjectDetail();
    document.title = "预订冠寓";
    if (this.visitSource === "小程序") {
      this.share();
    }
  }

  imgsClick(list: Array<any>) {
    this.revewStatus = true;
    const strList = list.map((item: any) => item.url);
    this.activeList = strList;
  }

  onVideoSwipeChange(index: number) {
    this.index = index;
  }

  videosClick(list: Array<any>) {
    this.revewVideoStatus = true;
    const strList = list.map((item: any) => item.url);
    this.activeList = strList;
  }

  /**
   * 获取门店详情
   */
  async getProjectDetail() {
    const { projectId, startDate, endDate } = this.$route.query;
    const data = {
      projectId,
      startDate,
      endDate,
    };
    const res = await getProjectDetail(data);
    if (!res) return;
    if (res.status === "ok") {
      this.data = res.data;
      const {
        projectVRs = [],
        projectVideos = [],
        projectImages = [],
      } = res.data;
      this.vrList = projectVRs;
      this.videoList = projectVideos;
      const labelList: Array<string> = [];
      const picObjList: Array<any> = [];
      projectImages.forEach((item: any) => {
        // 收集公用title
        if (!labelList.includes(item.label)) {
          labelList.push(item.label);
          picObjList.push({ name: item.label, child: [] });
        } else {
          // 归类对应数据
          const num = labelList.findIndex((one) => one === item.label);
          picObjList[num].child.push({ url: item.url });
        }
        // 图片分类
      });
      if (this.vrList && this.vrList.length) this.indexList.push("vr");
      if (this.videoList && this.videoList.length) this.indexList.push("视频");
      this.indexList = this.indexList.concat(labelList);
      this.picObjList = picObjList;
    }
  }

  login() {
    const token = getToken();
    // 未登录
    if (!token) {
      toLogin();
      return;
    }
  }
}
</script>

<style lang="scss">
.top_back {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}
.st_bg {
  height: 100vh;
  background-color: #fff;
  padding-bottom: env(safe-area-inset-bottom);
}
.album_imgs {
  width: 100%;
  margin-bottom: 15px;
  .album_img {
    height: 90px;
    width: calc(33% - 3px);
    margin: 0 1.5px;
  }
  .album_img.video {
    height: 80px;
    object-fit: fill;
  }
}
.album_video {
  width: 100%;
}
.van-index-bar {
  padding-top: 110px;
}
.van-index-anchor {
  font-family: PingFang SC;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #999999;
}
.van-index-anchor--sticky {
  top: 0px;
  color: #3273eb;
  border-bottom: 0;
}
.van-index-bar__sidebar {
  top: 70px;
  left: 0;
  display: block;
  width: 100%;
  height: 50px;
  background-color: #fff;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  color: #333333;
  overflow-y: scroll;
  padding-bottom: 3px;
  white-space: nowrap;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  .van-index-bar__index {
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    display: inline-block;
    height: 50px;
    // width: 200px;
    line-height: 50px;
    padding: 0 16px;
  }
  .van-index-bar__index--active {
    color: #3273eb;
    box-shadow: inset 0px -2px 0px #3273eb;
  }
}
.video_swipe {
  position: absolute;
  top: calc((100% - 300px) / 2);
  width: 100%;
  height: 300px;
  z-index: 1002;
  .video_swipe_item {
    width: 100%;
    height: 300px;
  }
}
.van-overlay {
  z-index: 1001;
  background-color: rgba(0, 0, 0, 0.9);
}
.video_swipe_indicator {
  position: fixed;
  top: 16px;
  left: 50%;
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  text-shadow: 0 1px 1px #323233;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}
</style>
