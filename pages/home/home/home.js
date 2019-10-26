// pages/home/home/home.js
let col1H = 0;
let col2H = 0;
Component({
  options: {
    addGlobalClass: true,  //apply-shared 表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面；
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onImageLoad: function (e) {
      let imageId = e.currentTarget.id;
      let oImgW = e.detail.width;         //图片原始宽度
      let oImgH = e.detail.height;        //图片原始高度
      let imgWidth = this.data.imgWidth;  //图片设置的宽度
      let scale = imgWidth / oImgW;        //比例计算
      let imgHeight = oImgH * scale;      //自适应高度

      let images = this.data.images;
      let imageObj = null;

      for (let i = 0; i < images.length; i++) {
        let img = images[i];
        if (img.id === imageId) {
          imageObj = img;
          break;
        }
      }

      imageObj.height = imgHeight;

      let loadingCount = this.data.loadingCount - 1;
      let col1 = this.data.col1;
      let col2 = this.data.col2;

      if (col1H <= col2H) {
        col1H += imgHeight;
        col1.push(imageObj);
      } else {
        col2H += imgHeight;
        col2.push(imageObj);
      }

      let data = {
        loadingCount: loadingCount,
        col1: col1,
        col2: col2
      };

      if (!loadingCount) {
        data.images = [];
      }

      this.setData(data);
    },

    loadImages: function () {
      let images = [
        { pic: "/static/images/1.jpg", height: 0 },
        { pic: "/static/images/2.jpg", height: 0 },
        { pic: "/static/images/3.jpg", height: 0 },
        { pic: "/static/images/4.jpg", height: 0 },
        { pic: "/static/images/5.jpg", height: 0 },
        { pic: "/static/images/6.jpg", height: 0 },
        { pic: "/static/images/7.jpg", height: 0 },
        { pic: "/static/images/8.jpg", height: 0 },
        { pic: "/static/images/9.jpg", height: 0 },
        { pic: "/static/images/10.jpg", height: 0 },
        { pic: "/static/images/1.jpg", height: 0 },
        { pic: "/static/images/2.jpg", height: 0 },
        { pic: "/static/images/3.jpg", height: 0 },
        { pic: "/static/images/4.jpg", height: 0 }
      ];

      let baseId = "img-" + (+new Date());

      for (let i = 0; i < images.length; i++) {
        images[i].id = baseId + "-" + i;
      }

      this.setData({
        loadingCount: images.length,
        images: images
      });
    },
    DotStyle(e) {
      this.setData({
        DotStyle: e.detail.value
      })
    },
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { //现阶段展示所用商户，后期根据类型展示TODO
      wx.getSystemInfo({
        success: (res) => {
          let ww = res.windowWidth;
          let wh = res.windowHeight;
          let imgWidth = ww * 0.48;
          let scrollH = wh;

          this.setData({
            scrollH: scrollH,
            imgWidth: imgWidth
          });

          this.loadImages();
        }
      })
     
    },
    moved: function () { },
    detached: function () { },
  },
})
