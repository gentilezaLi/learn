import { CascadePicker } from "antd-mobile";
import _ from "lodash";
import React, { memo, useCallback, useEffect, useState } from "react";
import area from "./area";
import city from "./city";
import { getCountData } from "./serivces";
import "./style.less";

/**
 * defaultValue 为默认省市县的id 例如['140000', '140600', '140621']
 * data 为外部传入数据
 * visible 显示隐藏
 * type 外部传入type为省市 true 省市县  false 省市
 * onClose触发关闭事件
 * onConfirm触发确认事件 抛出对象{provincename:'',provinceid:'',cityname:'',cityid:'',countyname:'',countyid:''}
 */

interface listType {
  cid?: string;
  cname?: string;
  letter?: string;
  pid?: string;
}

interface CountType {
  label?: string;
  value?: string;
  pid?: string;
  children?: CountType[];
}

export interface confirmObjType {
  provincename?: string;
  provinceid?: string;
  cityname?: string;
  cityid?: string;
  countyname?: string;
  countyid?: string;
}

interface regionType {
  defaultValue?: (string | number)[];
  data?: string[];
  visible: boolean;
  type?: boolean;
  onClose: () => void;
  onConfirm: (v: confirmObjType) => void;
}

const RegionPicker = memo(
  ({ defaultValue, data, visible, type, onClose, onConfirm }: regionType) => {
    const [options, setOptions] = useState<any>([]); //渲染数据
    const [countData, setCountData] = useState<CountType[]>([]); //获取区县数据
    const [catchData, setCatchData] = useState<any>({}); //缓存数据

    const [cacheVal, setCacheVal] = useState(defaultValue as any);

    //根据城市获取区县
    const getdata = async (id: string) => {
      const res = await getCountData({ cid: id });
      let data = _.map(res.result, (x) => ({
        label: x.name,
        value: String(x.id),
        pid: String(x.pid),
      }));
      setCountData(data);
    };

    //源省数据
    const sourcepList = _.flatMap(_.map(area.Province_2sc, (x) => x.V));
    let foramtpList = _.map(
      _.concat(
        _.slice(sourcepList, 2, 3),
        _.slice(sourcepList, 0, 2),
        _.slice(sourcepList, 3)
      ),
      (x) => {
        return {
          label: x.T,
          value: x.V,
          children: _.sortBy(
            formatCityList(city.getCityData(String(x.V))),
            (x) => x.value
          ),
        };
      }
    );

    //格式化市级数据
    function formatCityList(list: listType[]): CountType[] {
      return _.map(list, (x: listType) => {
        return {
          label: x?.cname,
          value: x?.cid,
          pid: x?.pid,
        };
      });
    }

    useEffect(() => {
      visible && getdata("110100");

      if (!visible) {
        if (defaultValue?.length === 3) {
          getdata(String(defaultValue[1]));
        }
        if (defaultValue) {
          setCacheVal([
            String(defaultValue[0]),
            String(defaultValue[1]),
            String(defaultValue[2]),
          ]);
        }
      }
    }, []);

    useEffect(() => {
      if (defaultValue) {
        setCacheVal([
          String(defaultValue[0]),
          String(defaultValue[1]),
          String(defaultValue[2]),
        ]);
      }
    }, [defaultValue]);

    useEffect(() => {
      if (!_.isEmpty(data)) {
        //走传进来的数据 格式必须满足
        setOptions(data);
      } else {
        //走默认数据 默认北京
        let val = !_.isNil(defaultValue)
          ? [
              String(defaultValue[0]),
              String(defaultValue[1]),
              String(defaultValue[2]),
            ]
          : ["110000", "110100", "110101"];

        for (let i = 0; i < foramtpList.length; i++) {
          if (foramtpList[i].value === val[0]) {
            for (let j = 0; j < foramtpList[i].children.length; j++) {
              if (foramtpList[i].children[j].value === val[1]) {
                if (!type) {
                  //没有type 为省市
                  setOptions(foramtpList);
                } else {
                  //省市县
                  foramtpList[i].children[j].children = countData;
                  setCacheVal(val);
                  setOptions(foramtpList);
                }
              }
            }
          }
        }
      }
    }, [countData, defaultValue]);

    const onSelect = useCallback(
      async (v: any) => {
        const [pid, cid, qid] = v;
        console.log("pid: ", pid);
        if (!_.isEmpty(data)) {
          //走传进来的数据 格式必须满足
          setOptions(data);
        } else {
          if (!_.isNil(v[2])) return;
          //走默认数据
          for (let i = 0; i < foramtpList.length; i++) {
            if (foramtpList[i].value === v[0]) {
              for (let j = 0; j < foramtpList[i].children.length; j++) {
                if (foramtpList[i].children[j].value === v[1]) {
                  if (!type) {
                    //没有type 为省市
                    setOptions(foramtpList);
                  } else {
                    //判断缓存数据里面有没有
                    if (_.has(catchData, v[1])) {
                      //读取缓存
                      setOptions(catchData[v[1]]);
                    } else {
                      if (cid !== _.get(cacheVal, "[2]")) {
                        //省市县  正常请求
                        getCountData({ cid: v[1] }).then((res) => {
                          let data = _.sortBy(
                            _.map(res.result, (x) => ({
                              label: x.name,
                              value: String(x.id),
                              pid: String(x.pid),
                            })),
                            (x) => x.value
                          );
                          //赋值
                          foramtpList[i].children[j].children = data;
                          setOptions(foramtpList);
                          //没有缓存过该数据 则缓存
                          setCatchData(
                            _.assign(catchData, { [v[1]]: foramtpList })
                          );
                        });
                        if (defaultValue) {
                          setCacheVal([
                            String(defaultValue[0]),
                            String(defaultValue[1]),
                            String(defaultValue[2]),
                          ]);
                        }
                      } else if (qid !== _.get(cacheVal, "[2]")) {
                        setCacheVal(v);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      [foramtpList, countData]
    );

    //确定
    const onConfirmFn = (v: any) => {
      let provObj = _.find(options, (x) => x?.value === v[0]);
      let cityObj = _.find(provObj?.children, (x) => x?.value === v[1]);
      let countObj = _.find(cityObj?.children, (x) => x.value === v[2]);
      onConfirm({
        provincename: _.get(provObj, "label"),
        provinceid: _.get(provObj, "value"),
        cityname: _.get(cityObj, "label"),
        cityid: _.get(cityObj, "value"),
        countyname: _.get(countObj, "label"),
        countyid: _.get(countObj, "value"),
      });
    };

    return (
      <div className="ah-regionpicker">
        <CascadePicker
          popupClassName="ah-regionpickerstyle"
          title={type ? "省市区/县" : "省市"}
          value={cacheVal}
          options={options}
          visible={visible}
          onClose={onClose}
          destroyOnClose={true}
          onConfirm={(v) => onConfirmFn(v)}
          onSelect={(v) => onSelect(v)}
        />
      </div>
    );
  }
);

export default RegionPicker;
