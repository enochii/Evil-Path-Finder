import React from 'react';
import { Heading } from 'react-dropdown-select';
import {Select} from 'react-dropdown-select';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import theme from 'prism-react-renderer/themes/github';


const code = `<Select
  options={options}
  values={[]}
  dropdownHandleRenderer={({ state }) => (
  	// if dropdown is open show "–" else show "+"
  	<span>{state.dropdown ? '–' : '+'}</span>
  )}
  onChange={(value) => console.log(value)}
/>`;

const CustomDropdownHandle = ({ options, title }) => {
    return (
        <LiveProvider theme={theme} code={code} scope={{ Select, options }}>
        {/* <LiveEditor />
        <br /> */}
        <LiveError />
        <LivePreview />
        </LiveProvider>
    );
};

CustomDropdownHandle.propTypes = {};

export default CustomDropdownHandle;
