import Taro, { Component, Config } from "@tarojs/taro";
import {
  View,
  Image,
  Text,
  Picker,
  Swiper,
  SwiperItem,
  Block,
} from "@tarojs/components";

import { getStore, setStore, toDetailByCategory } from "@/utils/utils";

import { fetchBanner, testToken, orderSubmit } from "@/api/home";
import { setUserInfo } from "@/api/login";
import Dialog from "../../components/Dialog/dialog";

import "./index.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  [propName: string]: any;
};

interface _page {
  props: ComponentsProps;
  state: StateType;
}

import { observer, inject } from "@tarojs/mobx";
import { AtForm, AtInput, AtButton, AtTextarea } from "taro-ui";
import order_bg from "@/images/card/home.png";
import bg_top from "@/images/card/bg-top.png";
import right from "@/images/card/right.png";

@inject("tabBarStore")
@observer
class _page extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  state: StateType = {
    region: ["", "", ""],
    currentSwiper: 0,
    bannerList: [],
    showTextArea: false,
    form: {
      applyCompany: null,
      applyUserEmail: null,
      applyUserName: null,
      applyUserPhone: null,
      companyCity: null,
      companyDistrict: null,
      companyProvince: null,
      detailAddress: null,
      hasDetector: null,
      certificate: null,
      issueDescribe: "",
      nickName: null,
    },
    submitLoading: false,
    showDialog: false,
  };

  config: Config = {
    navigationBarTitleText: "",
    navigationBarBackgroundColor: "#AF0051",
    navigationBarTextStyle: "white",
    backgroundColor: "#F5F5F5",
  };

  componentWillMount() {}

  componentDidMount() {
    const token = getStore("userToken");
    if (!token) {
      Taro.navigateTo({
        url: "/pages/login/index",
      });
    }
    setUserInfo().then((res: any) => {
      if (res.code === "OK") {
        const { fansStatus } = res.data;
        setStore("FANSSTATUS", fansStatus);
      }
    });

    // testToken({ userName: "13322087430" }).then((res: any) => {
    //   console.log("testToken", res);
    //   if (res.code === "OK") {
    //     //在这里存储Token
    //     setStore("userToken", res.data);
    //     fetchBanner().then((respone) => {
    //       console.log("resbanner", respone);
    //       if (respone.code === "OK") {
    //         this.setState({ bannerList: respone.data });
    //       }
    //     });
    //   }
    // });
  }

  componentDidShow() {
    const { tabBarStore } = this.props;
    tabBarStore.setIndex(0);

    const userInfo = getStore("userInfo");
    const form = JSON.parse(JSON.stringify(this.state.form));
    console.log("userInfo", userInfo);
    if (userInfo) {
      form.nickName = userInfo.nickName;
      this.setState({ form });
    }
    const token = getStore("userToken");
    if (token) {
      fetchBanner().then((respone) => {
        if (respone.code === "OK") {
          this.setState({ bannerList: respone.data });
        }
      });
    }
  }

  componentWillReact() {}

  handleChange = (e, name) => {
    const { form } = this.state;
    const formData = JSON.parse(JSON.stringify(form));
    // if (name == "issueDescribe") {
    //   formData[name] = e.detail.value;
    // } else {
    //   formData[name] = e;
    // }

    formData[name] = e;
    this.setState({
      form: formData,
    });
  };

  bindRegionChange = (e) => {
    console.log("e", e);
    const form = JSON.parse(JSON.stringify(this.state.form));
    const region = e.detail.value;
    const exceptPro = [
      "新疆维吾尔自治区",
      "西藏自治区",
      "甘肃省",
      "青海省",
      "宁夏回族自治区",
    ];

    if (exceptPro.indexOf(region[0]) >= 0) {
      this.showToast("暂时不提供服务，后续陆续开通");
      return;
    }
    form.companyProvince = region[0];
    form.companyCity = region[1];
    form.companyDistrict = region[2];
    this.setState({
      region,
      form,
    });
  };

  swiperChange = (e) => {
    this.setState({
      currentSwiper: e.detail.current,
    });
  };

  activeDetector = (val) => {
    const detector = val === "1";
    const { form } = this.state;
    const formData = JSON.parse(JSON.stringify(form));
    formData.hasDetector = detector;
    this.setState({ form: formData });
  };

  activeCertificate = (val) => {
    const certificate = val === "1";
    const { form } = this.state;
    const formData = JSON.parse(JSON.stringify(form));
    formData.certificate = certificate;
    this.setState({ form: formData });
  };

  showToast = (text) => {
    Taro.showToast({
      title: text,
      icon: "none",
    });
  };

  editDialog() {
    this.setState({
      showDialog: !this.state.showDialog,
    });
  }

  setSub() {
    return new Promise((resolve, reject) => {
      const tmplIds = [
        "i-o0tbPXj17KDzG1YVvbJXoG0s8o1RDI470Gtg5FPdU",
        "97-HyZhy-JBHENMokd6jmQg1rIlu0m4KUVccAMuvnYw",
        "G08QgMqzuSrHwQn9MwIPUYECa2zWC6_Mgswhq4kZmIk",
      ];
      Taro.requestSubscribeMessage({
        tmplIds,
        success(res) {
          console.log("success", res);
        },
        fail(res) {
          console.log("fail", res);
        },
        complete() {
          resolve();
        },
      });
    });
  }

  onSubmit = () => {
    console.log("event", this.state.form);
    this.setSub().then(() => {
      const { form } = this.state;
      const {
        applyCompany,
        applyUserEmail,
        applyUserName,
        applyUserPhone,
        companyCity,
        companyDistrict,
        companyProvince,
        detailAddress,
        hasDetector,
        certificate,
        issueDescribe,
      } = form;
      const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      const chinaReg = /^[\u0391-\uFFE5]+$/;

      if (!applyUserName || applyUserName == "") {
        this.showToast("请填写申请人名称");
        return;
      }
      if (!chinaReg.test(applyUserName)) {
        this.showToast("申请人名称请输入中文");
        return;
      }

      if (!applyUserPhone || applyUserPhone == "") {
        this.showToast("请填写申请人电话");
        return;
      }
      const phoneReg = /^(?:(?:\+|00)86)?1\d{10}$/;
      if (!phoneReg.test(applyUserPhone)) {
        this.showToast("手机格式错误");
        return;
      }
      if (!applyUserEmail || applyUserEmail == "") {
        this.showToast("请填写申请人邮箱");
        return;
      }
      if (!emailReg.test(applyUserEmail)) {
        this.showToast("邮箱格式错误");
        return;
      }
      if (!applyCompany || applyCompany == "") {
        this.showToast("请填写申请单位");
        return;
      }
      if (!companyCity || companyCity == "") {
        this.showToast("请填写单位所在市");
        return;
      }
      if (!companyDistrict || companyDistrict == "") {
        this.showToast("请填写单位所在区");
        return;
      }
      if (!companyProvince || companyProvince == "") {
        this.showToast("请填写单位所在省");
        return;
      }
      if (!detailAddress || detailAddress == "") {
        this.showToast("请填写详细地址");
        return;
      }
      if (hasDetector === null) {
        this.showToast("请填写是否有检测仪");
        return;
      }
      if (certificate == null) {
        this.showToast("请填写是否需要证书");
        return;
      }
      if (!issueDescribe || issueDescribe == "") {
        this.showToast("请填写问题描述");
        return;
      }
      this.setState({
        submitLoading: true,
      });
      orderSubmit(form)
        .then((res) => {
          if (res.code === "OK") {
            const self = this;
            this.showToast("提交成功");
            setTimeout(() => {
              Taro.navigateTo({
                url: `/pages/succues/index?orderId=${res.data}`,
              });
              self.resetForm();
            }, 1000);
          }
          this.setState({
            submitLoading: false,
          });
        })
        .catch((err) => {})
        .finally(() => {
          this.setState({
            submitLoading: false,
          });
        });
    });
  };

  resetForm = () => {
    const form = {
      applyCompany: null,
      applyUserEmail: null,
      applyUserName: null,
      applyUserPhone: null,
      companyCity: null,
      companyDistrict: null,
      companyProvince: null,
      detailAddress: null,
      hasDetector: null,
      certificate: null,
      issueDescribe: "",
      nickName: null,
    };
    const region = ["", "", ""];
    this.setState({
      form,
      region,
    });
  };

  render() {
    const {
      region,
      form,
      showTextArea,
      submitLoading,
      showDialog,
    } = this.state;
    const { hasDetector, certificate } = form;
    return (
      <View className="layout_page home_page">
        <Image mode="widthFix" src={bg_top} className="user_bg" />

        <View className="home_body">
          <AtForm>
            <AtInput
              name="value"
              title="昵称"
              type="text"
              placeholder="请输入昵称"
              placeholderStyle="color:#999"
              value={form.nickName}
              disabled
              onChange={(e) => {
                this.handleChange(e, "nickName");
              }}
            ></AtInput>
            <AtInput
              name="value"
              title="申请人"
              type="text"
              placeholder="请输入真实姓名"
              placeholderStyle="color:#999"
              value={form.applyUserName}
              onChange={(e) => {
                this.handleChange(e, "applyUserName");
              }}
            />
            <AtInput
              name="value"
              title="电话"
              type="text"
              placeholder="请输入联系电话"
              placeholderStyle="color:#999"
              value={form.applyUserPhone}
              onChange={(e) => {
                this.handleChange(e, "applyUserPhone");
              }}
            />
            <AtInput
              name="value"
              title="邮箱"
              type="text"
              placeholder="请输入邮箱（接受测试分析报告）"
              placeholderStyle="color:#999"
              value={form.applyUserEmail}
              onChange={(e) => {
                this.handleChange(e, "applyUserEmail");
              }}
            />
            <AtInput
              name="value"
              title="申请单位"
              type="text"
              placeholder="请输入单位名称"
              placeholderStyle="color:#999"
              value={form.applyCompany}
              onChange={(e) => {
                this.handleChange(e, "applyCompany");
              }}
            />

            <View className="pickersection">
              <Text className="pickerLabel">单位地址</Text>
              <View>
                <Picker
                  mode="region"
                  onChange={this.bindRegionChange}
                  value={region}
                >
                  {region[0] === "" ? (
                    <View className="picker noregion">
                      请选择单位所在省市区
                    </View>
                  ) : (
                    <View className="picker">
                      {region[0]}-{region[1]}-{region[2]}
                    </View>
                  )}
                </Picker>
              </View>
              <View className="arrow">
                <Image src={right} />
              </View>
            </View>

            <AtInput
              name="value"
              title="详细地址"
              type="text"
              placeholder="如道路，门牌号等"
              placeholderStyle="color:#999"
              value={form.detailAddress}
              onChange={(e) => {
                this.handleChange(e, "detailAddress");
              }}
            />
            <View className="detector_switch">
              <View>电能质量专用检测仪器</View>
              <View className="switch_group">
                <View
                  className="switch_item"
                  onClick={() => {
                    this.activeDetector("1");
                  }}
                >
                  有
                  <View
                    className={
                      hasDetector === true ? "switch active" : "switch"
                    }
                  ></View>
                </View>
                <View
                  className="switch_item"
                  onClick={() => {
                    this.activeDetector("0");
                  }}
                >
                  无
                  <View
                    className={
                      hasDetector === false ? "switch active" : "switch"
                    }
                  ></View>
                </View>
              </View>
            </View>
            <View className="detector_switch">
              <View>
                是否需要证书
                <Text className="circle" onClick={this.editDialog.bind(this)}>
                  ?
                </Text>
              </View>
              <View className="switch_group">
                <View
                  className="switch_item"
                  onClick={() => {
                    this.activeCertificate("1");
                  }}
                >
                  是
                  <View
                    className={
                      certificate === true ? "switch active" : "switch"
                    }
                  ></View>
                </View>
                <View
                  className="switch_item"
                  onClick={() => {
                    this.activeCertificate("0");
                  }}
                >
                  否
                  <View
                    className={
                      certificate === false ? "switch active" : "switch"
                    }
                  ></View>
                </View>
              </View>
            </View>
            <View className="textTitle">问题描述</View>
            {showTextArea ? (
              <AtTextarea
                className="textarea"
                value={form.issueDescribe}
                focus
                onChange={(e) => {
                  this.handleChange(e, "issueDescribe");
                }}
                onBlur={() => {
                  this.setState({ showTextArea: false });
                }}
                maxLength={1000}
                placeholderStyle="color:#999;font-size:14px"
                placeholder="请输入所遇到的问题？或者发生的现象？"
              />
            ) : (
              <View
                className="textareaView"
                style={form.issueDescribe ? {} : { color: "#999" }}
                onClick={() => {
                  this.setState({ showTextArea: true });
                }}
              >
                {form.issueDescribe
                  ? form.issueDescribe
                  : "请输入所遇到的问题？或者发生的现象？"}
              </View>
            )}
          </AtForm>
          {submitLoading ? (
            <View className="sheet_btn loading">提交中..</View>
          ) : (
            <View
              className="sheet_btn"
              onClick={() => {
                this.onSubmit();
              }}
            >
              提交申请
            </View>
          )}
        </View>
        <Dialog
          showDialog={showDialog}
          editDialog={this.editDialog.bind(this)}
        ></Dialog>
      </View>
    );
  }
}

export default _page;
