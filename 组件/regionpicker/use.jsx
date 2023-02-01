import React, { memo, useState } from "react";
import { Button } from "antd-mobile";
import RegionPicker from "../../components/regionpicker/index"
import data from './data'
const TestSaas = memo(() => {
  const [visible, setVisible] = useState(false)
  const onConfirm = (val) => {
    console.log('val: ', val);
  }
  const onClose = () => {
    setVisible(false)
  }
  return (
    <div>
      <Button color='warning' onClick={() => setVisible(true)}>省市县</Button>
      <RegionPicker visible={visible} onClose={onClose} onConfirm={onConfirm} />
    </div>
  )
})
export default TestSaas;
