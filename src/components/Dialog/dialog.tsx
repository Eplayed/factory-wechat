/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import certificateImage from "../../images/card/certificate.jpg";
import closeImage from "../../images/card/close.png";

import "./dialog.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  [propName: string]: any;
};

interface Arrow {
  props: ComponentsProps;
  state: StateType;
}

class Arrow extends Component {
  static defaultProps: ComponentsProps = {
    color: "black",
  };

  constructor(props) {
    super(props);
  }

  state: StateType = {
    // token,
  };

  close() {
    this.props.editDialog();
  }

  componentWillMount() {}

  render() {
    const { showDialog } = this.props;
    return (
      <View className={`modal ${showDialog ? "show" : "hide"}`}>
        <View className="content">
          <View className="title">
            <Text>什么是电能质量检测评估认证证书？</Text>
            <Image
              src={closeImage}
              mode="widthFix"
              className="close"
              onClick={this.close}
            ></Image>
          </View>
          <View className="des">
            亚洲电能质量产业联盟（APQI）和添唯认证共同合作，针对本次电能质量健康检查活动，推出电能质量检验评估认证，为广大用户提供免费的电能质量检验认证活动，免除所有认证费用（如申请费、审核费、证书费等）。
            上海添唯认证技术有限公司（TILVA）隶属于上海电科集团，通过了国家认证认可监督管理委员会和相关部门的审核，并获得由国家认监委颁发的《国家认证机构批准书》。作为理事长、秘书处单位积极主导和参与中国机器人CR认证、中国充电联盟认证（EVCIPA）和上海品牌认证等工作的顶层设计和实施，推动行业和市场采信，传递信任。认证服务范围包括机器人产品CR认证、智能电网相关特色认证、新能源产品认证等；并具备国家强制性产品CCC认证的资质，其认证范围覆盖低压电器、小功率电机和焊机设备等。
            TILVA秉承上海电科集团领行业发展，创客户价值，助员工发展，报社会厚爱的企业使命，作为上电科的认证品牌，添唯认证依托上电科在电气、电工领域雄厚的技术实力和测试能力，为客户提供检验认证评估服务。坚持非凡品质、铸造权威品牌，努力营造安全、可靠、绿色的用电环境，共创美好未来！
          </View>
          <Image
            src={certificateImage}
            className="image"
            mode="widthFix"
          ></Image>
        </View>
      </View>
    );
  }
}

export default Arrow;
