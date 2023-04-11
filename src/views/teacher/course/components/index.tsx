import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import { Select } from "antd";

const TermsSelect = (props: any) => {
  const terms = useSelector((state: RootState) => state.user.terms);
  const options = [];
  for (let i = 0; i < terms.length; i++) {
    options.push({
      value: terms[i].termId,
      label: terms[i].name,
    });
  }
  const handleChange = (value: string) => {
    props.setTermId(value);
    // console.log(`termId ${value}`);
  };
  return (
    <div>
      <Select
        defaultValue={"学期选择"}
        options={options}
        onChange={handleChange}
        style={{ width: 160 }}
      />
    </div>
  );
};
export default TermsSelect;
