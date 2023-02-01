import React, { memo, useState, useEffect, useCallback } from "react";
import { CascadePicker } from 'antd-mobile'
import _ from 'loadsh'
import "./style.less";
import city from './city';
import area from './area';
import * as service from "@services";

/**
 * defaultValue 为默认省市县的id 例如['140000', '140600', '140621']
 * data 为外部传入数据
 * visible 显示隐藏
 * type 外部传入type为省市 不传type为省市县
 * onClose触发关闭事件
 * onConfirm触发确认事件 抛出对象{provincename:'',provinceid:'',cityname:'',cityid:'',countyname:'',countyid:''}
 */

const RegionPicker = memo(({ defaultValue, data, visible, type, onClose, onConfirm }) => {
  const [options, setOptions] = useState([]) //渲染数据
  const [countData, setCountData] = useState([])//获取区县数据
  const [catchData, setCatchData] = useState({})//缓存数据

  //根据城市获取区县
  const getdata = async (id) => {
    const res = await service.getCountData({ cid: id })
    let data = _.map(res.result, x => ({ label: x.name, value: String(x.id), pid: String(x.pid) }))
    setCountData(data)
  }

  //源省数据
  const sourcepList = _.flatMap(_.map(area.Province_2sc, x => x.V))
  let foramtpList = _.map(_.concat(_.slice(sourcepList, 2, 3), _.slice(sourcepList, 0, 2), _.slice(sourcepList, 3)), x => {
    return {
      label: x.T,
      value: x.V,
      children: _.sortBy(formatCityList(city.getCityData(String(x.V))), x => x.value)
    }
  })

  //格式化市级数据
  function formatCityList (list) {
    return _.map(list, x => {
      return {
        label: x.cname,
        value: x.cid,
        pid: x.pid
      }
    })
  }

  useEffect(() => {
    visible && getdata('110100')
  }, [])

  useEffect(() => {
    if (!_.isEmpty(data)) {
      //走传进来的数据 格式必须满足
      setOptions(data)
    } else {
      //走默认数据 默认北京
      let val = ['110000', '110100', '110101']
      for (let i = 0; i < foramtpList.length; i++) {
        if (foramtpList[i].value === val[0]) {
          for (let j = 0; j < foramtpList[i].children.length; j++) {
            if (foramtpList[i].children[j].value === val[1]) {
              if (!_.isUndefined(type)) {
                //没有type 为省市
                setOptions(foramtpList)
              } else {
                //省市县
                foramtpList[i].children[j].children = countData
                setOptions(foramtpList)
              }
            }
          }
        }
      }
    }
  }, [countData])

  const onSelect = useCallback(async (v) => {
    if (!_.isEmpty(data)) {
      //走传进来的数据 格式必须满足
      setOptions(data)
    } else {
      if (!_.isNil(v[2])) return
      //走默认数据
      for (let i = 0; i < foramtpList.length; i++) {
        if (foramtpList[i].value === v[0]) {
          for (let j = 0; j < foramtpList[i].children.length; j++) {
            if (foramtpList[i].children[j].value === v[1]) {
              if (!_.isUndefined(type)) {
                //没有type 为省市
                setOptions(foramtpList)
              } else {
                //判断缓存数据里面有没有
                if (_.has(catchData, v[1])) {
                  //读取缓存
                  setOptions(catchData[v[1]])
                } else {
                  //省市县  正常请求
                  service.getCountData({ cid: v[1] }).then(res => {
                    let data = _.sortBy(_.map(res.result, x => ({ label: x.name, value: String(x.id), pid: String(x.pid) })), x => x.value)
                    foramtpList[i].children[j].children = data
                    setOptions(foramtpList)
                    //没有缓存过该数据 则缓存
                    setCatchData(_.assign(catchData, { [v[1]]: foramtpList }))
                  })
                }
              }
            }
          }
        }
      }
    }
  }, [foramtpList, countData])

  //确定
  const onConfirmFn = (v) => {
    let provObj = _.find(options, x => x.value === v[0])
    let cityObj = _.find(provObj.children, x => x.value === v[1])
    let countObj = _.find(cityObj.children, x => x.value === v[2])
    onConfirm({
      provincename: _.get(provObj, 'label'),
      provinceid: _.get(provObj, 'value'),
      cityname: _.get(cityObj, 'label'),
      cityid: _.get(cityObj, 'value'),
      countyname: _.get(countObj, 'label', '0'),
      countyid: _.get(countObj, 'value', '0')
    })
  }

  return (
    <div className="regionpicker">
      <CascadePicker
        popupClassName='regionpickerstyle'
        title='省市区/县'
        defaultValue={defaultValue}
        options={options}
        visible={visible}
        onClose={onClose}
        onConfirm={v => onConfirmFn(v)}
        onSelect={v => onSelect(v)}
      />
    </div>
  )
})

export default RegionPicker;
