import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { updateTermId } from '../../store/modules/user';
import { Select } from 'antd';

const TermsSelect = () => {
  const terms = useSelector((state: RootState) => state.user.terms);
  const termId = useSelector((state: RootState) => state.user.termId);
  const dispatch = useAppDispatch();

  const options = terms?.map((item) => {
    return {
      value: item.termId,
      label: item.name,
    };
  });
  const handleChange = (value: string) => {
    dispatch(updateTermId(value));
  };
  return (
    <div>
      <Select
        value={termId}
        options={options}
        onChange={handleChange}
        style={{ width: 160 }}
      />
    </div>
  );
};
export default TermsSelect;
