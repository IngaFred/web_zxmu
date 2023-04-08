import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const TermsSelect = () => {
	const terms = useSelector((state: RootState) => state.user.terms);
	console.log(terms);

	return <>TermsSelect</>;
};
export default TermsSelect;
