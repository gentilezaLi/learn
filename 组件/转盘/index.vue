<template>
    <div
      class="raffleLayout"
      v-exposure
      data-showkey="usc_2sc_hdy_2023n818hdym_dkymcjzppg_show"
    >
      <div class="titleLayout">
        <div class="fontStyleB">恭喜！打卡成功，获得1次抽奖机会</div>
        <div class="fontStyleB">
          <span style="color: #ff6903">100%</span>中奖，快转动转盘吧~
        </div>
      </div>
  
      <div class="rotateLayout">
        <div class="rotate">
          <!-- 大转盘 -->
          <img
            class="dish"
            src="https://dx.autoimg.cn/2sc/2023/2023-6/2023-818-wheel_2.png?format=webp"
            :style="{ transform: rotate_deg, transition: rotate_transition }"
          />
  
          <!-- 指针图片 -->
          <img
            class="pointer"
            src="https://dx.autoimg.cn/2sc/2023/2023-6/2023-818-raffle_1.png?format=webp"
            @click="start"
          />
        </div>
      </div>
  
      <van-popup class="popModel" v-model="showPop">
        <div class="popLayout">
          <img
            class="popImg"
            src="https://dx.autoimg.cn/2sc/2023/2023-6/2023-818-wheel-dialog-1.png?format=webp"
            alt=""
          />
          <img
            class="popImgBtn"
            src="https://dx.autoimg.cn/2sc/2023/2023-6/2023-818-wheel-dialog-btn.png?format=webp"
            @click="onClose"
            alt=""
          />
          <div class="popTitle" v-if="lotteryInfo.price > 0">
            <span class="popTitleTag">¥</span>{{ lotteryInfo.price }}
          </div>
          <div class="popSubtitle" :style="[{top: lotteryInfo.price > 0 ? '66px': '32px'}]" >{{ lotteryInfo.prizename }}</div>
        </div>
      </van-popup>
    </div>
  </template>
  
  <script>
  /**
   * 抽奖
   */
  
  import Vue from "vue";
  import { Toast, Popup } from "vant";
  Vue.use(Toast).use(Popup);
  import { API } from "../../../api/818";
  import { getUrlParams, getAPPID2 } from "../../../util/util";
  
  export default {
    name: "MyRaffle",
    props: {
      acid: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        LuckyClick: 10, //默认一次 可用次数，减少接口次数
        cat: 45, //总共8个扇形区域，每个区域45度
        isAllowClick: true, //是否能够点击
        rotate_deg: 0, //指针旋转的角度
        rotate_transition: "transform 3s ease-in-out", //初始化选中的过度属性控制
        showPop: false, //显示中间弹框
  
        infoid: 0,
        lotteryInfo: {
          status: 0, //0未中奖 1已中奖
          prizeid: 0, //奖品id 序号
          prizename: "", //奖品名称
          price: "", //奖品金额
        }, //抽奖信息
      };
    },
  
    created() {
      this.infoid = getUrlParams()["infoid"] | 0;
    },
    methods: {
      start() {
        this.$eventBus.$emit("tracktrackCustom", {
          key: "usc_2sc_hdy_2023n818hdym_dkymcjzpdjcjan_click",
          type: 2, //1 show 2 click
        });
        if (this.LuckyClick == 0) {
          Toast("您已抽奖，换一台车打卡重新获得抽奖机会吧~");
          return;
        }
        if (!this.isAllowClick) {
          return;
        }
        this.rotating();
  
        // API.POST_LOTTERY({
        //   _appid: getAPPID2(),
        //   acid: this.acid,
        //   infoid: this.infoid,
        // })
        //   .then((res) => {
        //     if (res && res.returncode == 0 && res.result) {
        //       this.lotteryInfo = res.result;
        //       this.rotating();
        //     } else if (res.message) {
        //       Toast(res.message);
        //     }
        //   })
        //   .catch(() => {
        //     Toast("网络异常, 请重试");
        //   });
      },
  
      rotating() {
        this.isAllowClick = false;
        this.rotate_transition = "transform 3s ease-in-out";
        this.LuckyClick--;
        var rand_circle = 5; //默认旋转5圈
        var winningIndex = this.lotteryInfo.prizeid; //设置了概率, 可以接口返回具体哪个坐标
        console.log("myking", winningIndex);
        //当前下标对应的角度 45是总共8个扇形区域，每个区域的角度
        var randomDeg = 360 - winningIndex * 45;
        //将要旋转的角度 由于是顺时针的转动方向需要用360来减
        var deg = rand_circle * 360 + randomDeg;
        this.rotate_deg = "rotate(" + deg + "deg)";
  
        var that = this;
        setTimeout(() => {
          this.showPop = true;
  
          this.$eventBus.$emit("tracktrackCustom", {
            key: "usc_2sc_hdy_2023n818hdym_dkymcjzpzjdcpg_show",
            type: 1, //1 show 2 click
          });
  
          that.isAllowClick = true;
          that.rotate_deg = "rotate(" + 0 + "deg)"; //定时器关闭的时候重置角度
          that.rotate_transition = "";
        }, 3500);
      },
  
      onClose() {
        this.showPop = false;
      },
    },
  };
  </script>
  
  <style scoped lang="scss">
  .raffleLayout {
    display: flex;
    flex-direction: column;
    padding-bottom: 100px;
  
    .titleLayout {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .fontStyleB {
      font-family: "PingFangSC-Medium";
      font-size: 18px;
      line-height: 32px;
      color: "#111E36";
      font-weight: "500";
    }
    .rotateLayout {
      margin-top: 32px;
      display: flex;
      justify-content: center;
      position: relative;
    }
  
    .rotate {
      width: 322px;
      height: 322px;
      background: #ffbe04;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .rotate .dish {
      width: 322px;
      height: 322px;
    }
    .pointer {
      width: 80px;
      height: 88px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  
    .popModel {
      width: 325px;
      background: #00000000;
    }
    .popLayout {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
    .popImg {
      width: 325px;
    }
  
    .popImgBtn {
      height: 45px;
    }
  
    .popTitle {
      position: absolute;
      font-family: Avenir-Heavy;
      font-size: 32px;
      color: #ff4000;
      font-weight: 800;
      top: 32px;
    }
  
    .popTitleTag {
      font-family: Avenir-Heavy;
      font-size: 20px;
      color: #ff4000;
      text-align: center;
      font-weight: 800;
      top: 10px;
      left: -12px;
    }
    .popSubtitle {
      position: absolute;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #ff4000;
      letter-spacing: 0;
      text-align: left;
      line-height: 22px;
      font-weight: 500;
      top: 66px;
    }
  }
  </style>