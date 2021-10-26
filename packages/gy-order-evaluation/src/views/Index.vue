<template>
  <div class="page-index">
    <h2>您对此次服务的体验评分</h2>
    <div class="question-list">
      <div
        class="question-box"
        v-for="(item, index) in questionList"
        :key="index"
      >
        <h3>{{ item.title }}</h3>
        <div class="star-list-wrap">
          <ul class="star-list">
            <li
              v-for="(star, sIndex) in item.starList"
              :key="sIndex"
              @click="starClick({ item, index, sIndex })"
            >
              <img
                :src="
                  params.items[index].starNum > sIndex
                    ? star.imgUrlCur
                    : star.imgUrl
                "
                alt=""
              />
            </li>
          </ul>
          <div class="star-desc">{{ params.items[index].starDesc }}</div>
        </div>
        <div
          class="label-list"
          v-for="(labels, lsIndex) in item.labelList"
          v-show="
            labels.area[0] <= params.items[index].starNum &&
            labels.area[1] >= params.items[index].starNum
          "
          :key="lsIndex"
        >
          <span
            v-for="(label, lIndex) in labels.list"
            :key="lIndex"
            :class="[
              `label-box ${
                params.items[index].desc.find((item) => item === label.value)
                  ? 'cur'
                  : ''
              }`,
            ]"
            @click="labelClick({ label, index })"
          >
            {{ label.value }}
          </span>
        </div>
      </div>
    </div>
    <div class="other">
      <div class="other-box-title">
        <h2>您对这次服务的感受</h2>
        <span :style="{ color: this.params.desc.length === 200 ? 'red' : '' }">
          {{ params.desc.length }}/200
        </span>
      </div>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        class="text-area"
        maxlength="200"
        v-model="params.desc"
      ></textarea>
    </div>
    <div class="submit">
      <span
        @click="submit()"
        :style="{
          background: !isCan ? '#F8F8F8' : '',
          color: !isCan ? '#cccccc' : '',
        }"
      >
        提交评价
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import { Toast } from 'vant';
import Base from "./Base";
import {
  rapairCheckEvaluate,
  complanitCheckEvaluate,
  evaluateRepair,
  evaluateComplaint,
} from "@/api";
import starImg from "@/assets/img/star.png";
import starImgCur from "@/assets/img/star_cur.png";

@Component
export default class Index extends Base {
  @Inject() visitSource!: string;
  // app和小程序分享
  @Inject() share!: () => void;
  starCurIndex = -1;
  cur = "";
  isCan = false;
  params = {
    workOrderId: this.$route.query.workOrderId,
    pilot: this.$route.query.pilot, //是否为试点门店（true：是｜false：否）
    timelinessStar: 0, //时效满意度*
    repairResultStar: 0, //维修结果满意度*
    cooperateStar: 0, //协调服务人员满意度*
    desc: "", //评价内容
    items: [
      {
        title: "",
        starDesc: "",
        starNum: -1,
        desc: [] as string[],
      },
      {
        title: "2. 维修结果满意度",
        starDesc: "",
        starNum: -1,
        desc: [] as string[],
      },
      {
        title: "3. 协调的服务人员满意度",
        starDesc: "",
        starNum: -1,
        desc: [] as string[],
      },
    ],
  };
  // 默认为报修评价问题数据
  questionList = [
    {
      title: "1. 维修时效满意度",
      starList: [
        { imgUrl: starImg, imgUrlCur: starImgCur },
        { imgUrl: starImg, imgUrlCur: starImgCur },
        { imgUrl: starImg, imgUrlCur: starImgCur },
        { imgUrl: starImg, imgUrlCur: starImgCur },
        { imgUrl: starImg, imgUrlCur: starImgCur },
      ],
      labelList: [
        {
          area: [0, 3],
          list: [{ value: "响应慢" }, { value: "维修慢" }],
        },
        {
          area: [4, 5],
          list: [{ value: "响应快" }, { value: "维修快" }],
        },
      ],
    },
    {
      title: "2. 维修结果满意度",
      starList: [
        { imgUrl: starImg, imgUrlCur: starImgCur },
        { imgUrl: starImg, imgUrlCur: starImgCur },
        { imgUrl: starImg, imgUrlCur: starImgCur },
        { imgUrl: starImg, imgUrlCur: starImgCur },
        { imgUrl: starImg, imgUrlCur: starImgCur },
      ],
      labelList: [
        {
          area: [0, 3],
          list: [{ value: "技术不行" }, { value: "不专业" }],
        },
        {
          area: [4, 5],
          list: [{ value: "技术过硬" }, { value: "专业" }],
        },
      ],
    },
    {
      title: "3. 协调的服务人员满意度",
      starList: [
        { imgUrl: starImg, imgUrlCur: starImgCur },
        { imgUrl: starImg, imgUrlCur: starImgCur },
        { imgUrl: starImg, imgUrlCur: starImgCur },
        { imgUrl: starImg, imgUrlCur: starImgCur },
        { imgUrl: starImg, imgUrlCur: starImgCur },
      ],
      labelList: [
        {
          area: [0, 3],
          list: [
            { value: "响应慢" },
            { value: "解决问题能力差" },
            { value: "服务态度不好" },
          ],
        },
        {
          area: [4, 5],
          list: [
            { value: "响应快" },
            { value: "解决问题能力强" },
            { value: "服务态度好" },
          ],
        },
      ],
    },
  ];
  starUrl = starImg;

  mounted() {
    const {
      query: { type },
    } = this.$route;
    // 投诉问题列表
    if (type === "complaint") {
      this.questionList = [
        {
          title: "1. 协调服务人员的满意度",
          starList: [
            { imgUrl: starImg, imgUrlCur: starImgCur },
            { imgUrl: starImg, imgUrlCur: starImgCur },
            { imgUrl: starImg, imgUrlCur: starImgCur },
            { imgUrl: starImg, imgUrlCur: starImgCur },
            { imgUrl: starImg, imgUrlCur: starImgCur },
          ],
          labelList: [
            {
              area: [0, 3],
              list: [
                { value: "响应慢" },
                { value: "解决问题能力差" },
                { value: "服务态度不好" },
                { value: "其他" },
              ],
            },
            {
              area: [4, 5],
              list: [
                { value: "响应快" },
                { value: "解决问题能力强 " },
                { value: "服务态度好 " },
                { value: "其他 " },
              ],
            },
          ],
        },
      ];
    }
    this.checkEvaluate();
  }

  /**
   * 根据type类型判断接报修/评价接口地址
   */
  apiTypeUrl() {
    const {
      query: { type },
    } = this.$route;
    // 根据type类型判断是投诉评价还是报修评价
    let funObj: Record<string, any> = {
      checkApi: () => {
        return;
      },
      submitApi: () => {
        return;
      },
    };
    switch (type) {
      case "repair":
        funObj.checkApi = rapairCheckEvaluate;
        funObj.submitApi = evaluateRepair;
        break;
      case "complaint":
        funObj.checkApi = complanitCheckEvaluate;
        funObj.submitApi = evaluateComplaint;
        break;
      default:
        break;
    }
    return funObj;
  }

  /**
   * 校验此工单是否可以评价
   */
  async checkEvaluate() {
    const params = {
      workOrderId: this.params.workOrderId || "16",
      pilot: this.params.pilot, //是否为试点门店（true：是｜false：否
    };
    const res = await this.apiTypeUrl().checkApi(params);
    if (!res) return;
    const { code }: Record<string, any> = res || {};
    if (code === 10000) {
      this.isCan = true;
      return;
    }
    this.toast = this.$createToast({
      txt: `此工单已评价过`,
      type: "txt",
    });
    this.toast.show();
  }

  starClick({ item, index, sIndex }: any) {
    const starDesc = sIndex + 1 > 3 ? "满意" : "不满意";
    if (starDesc !== this.params.items[index].starDesc) {
      this.params.items[index].desc = [];
    }
    this.params.items[index].starNum = sIndex + 1;
    this.params.items[index].starDesc = starDesc;
    this.params.items[index].title = item.title;
  }

  labelClick({ label, index }: any) {
    let flag = false;
    this.params.items[index].desc.forEach((item, dIndex) => {
      if (item === label.value) {
        this.params.items[index].desc.splice(dIndex, 1);
        flag = true;
      }
    });
    if (!flag) {
      this.params.items[index].desc.push(label.value);
    }
  }

  checkQuestion() {
    let flag = false;
    // 循环校验表单必填项
    const {
      query: { type },
    } = this.$route;
    // 如果是报修则把实际问题长度改为1
    if (type === "complaint") {
      this.params.items.length = 1;
    }
    for (let i = 0; i < this.params.items.length; i++) {
      if (this.params.items[i].starNum < 1) {
        this.toast = this.$createToast({
          txt: `请给第${i + 1}题星星打分`,
          type: "txt",
        });
        this.toast.show();
        flag = false;
        break;
      }
      if (this.params.items[i].desc.length <= 0) {
        this.toast = this.$createToast({
          txt: `请选择第${i + 1}题标签`,
          type: "txt",
        });
        this.toast.show();
        flag = false;
        break;
      }
      flag = true;
    }
    return flag;
  }

  // 给每个星星字段赋值
  serializeStarNum() {
    const {
      query: { type },
    } = this.$route;
    if (type === "complaint") {
      this.params.cooperateStar = this.params.items[0].starNum;
    } else {
      const [timelinessStar, repairResultStar, cooperateStar] =
        this.params.items.map((item) => item.starNum);
      this.params.timelinessStar = timelinessStar;
      this.params.repairResultStar = repairResultStar;
      this.params.cooperateStar = cooperateStar;
    }
  }

  async submit() {
    if (!this.isCan) {
      this.toast = this.$createToast({
        txt: `此工单已评价过`,
        type: "txt",
      });
      this.toast.show();
      return;
    }
    if (!this.checkQuestion()) return;
    // 给每个星星字段赋值
    this.serializeStarNum();
    Toast.loading({
      message: "请求中...",
      forbidClick: true,
      duration: 0,
    });
    const res = await this.apiTypeUrl().submitApi(this.params);
    Toast.clear();
    if (!res) return;
    const { code, message = "请您稍后再试" }: Record<string, any> = res || {};
    if (code === 10000) {
      const {
        query: { type },
      } = this.$route;
      this.toast = this.$createToast({
        txt: "评价提交成功，感谢您宝贵的评价！",
        type: "txt",
        time: 2000,
        onTimeout: () => {
          if (type === "repair") {
            window.location.href = "guanyu://repairs/commentSuccess";
            return;
          }
          if (type === "complaint") {
            window.location.href = "guanyu://complaints/commentSuccess";
            return;
          }
        },
      });
      this.toast.show();
      return;
    }
    this.toast = this.$createToast({
      txt: message,
      type: "txt",
    });
    this.toast.show();
  }
}
</script>

<style lang="scss">
@import "./Index.scss";
</style>