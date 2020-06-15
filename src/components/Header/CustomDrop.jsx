import React from "react";
import styled from "@emotion/styled";

// import "./demo-styles.css";
import { options } from "./option";

import Select from "react-dropdown-select";

export default class CustomDrop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      dropdownRenderer: false,
      itemRenderer: true,
      optionRenderer: false,
      noDataRenderer: false,
      selectValues: [],
      searchBy: "username",
      clearable: false,
      searchable: true,
      create: false,
      separator: false,
      forceOpen: false,
      handle: true,
      addPlaceholder: "+ click to add",
      labelField: "username",
      valueField: "email",
      color: "#0074D9",
      keepSelectedInList: true,
      closeOnSelect: false,
      dropdownPosition: "bottom",
      direction: "ltr",
      dropdownHeight: "300px"
    };
  }
  
//   options = ['1', '2']
  setValues = selectValues => this.setState({ selectValues });

  itemRenderer = ({ item, itemIndex, props, state, methods }) => (
    <div key={item[props.valueField]} onClick={() => methods.addItem(item)}>
      <div style={{ margin: "10px", width:"160px" }}>
        <input type="checkbox" checked={methods.isSelected(item)} />
        &nbsp;&nbsp;&nbsp;{item[props.labelField]}
      </div>
    </div>
  );

  optionRenderer = ({ option, props, state, methods }) => (
    <React.Fragment>
      <div style={{ margin: "10px", width:"160px" }}
            onClick={event => methods.removeItem(event, option, true)}>
        {option.label}
      </div>
    </React.Fragment>
  );

  render() {
      console.log(options);
    return (
      <div className={this.props.className}>
          <div style={{ maxWidth: "350px", margin: "0 auto" }}>
            <StyledSelect            
            //   placeholder="Select peoples"
            //   addPlaceholder={this.state.addPlaceholder}
              color={this.state.color}
              disabled={this.state.disabled}
              searchable={this.state.searchable}
              
              dropdownHandle={this.state.handle}
              dropdownHeight={this.state.dropdownHeight}
              
              values={[options.find(opt => opt.username === "Delphine")]}
              options={options}
              dropdownGap={5}
              
              onChange={values => this.setValues(values)}
              noDataLabel="No matches found"
              closeOnSelect={this.state.closeOnSelect}
              noDataRenderer={
                this.state.noDataRenderer
                  ? () => this.noDataRenderer()
                  : undefined
              }
              dropdownPosition={this.state.dropdownPosition}
              itemRenderer={
                this.state.itemRenderer
                  ? (item, itemIndex, props, state, methods) =>
                      this.itemRenderer(item, itemIndex, props, state, methods)
                  : undefined
              }
       
              optionRenderer={
                this.state.optionRenderer
                  ? (option, props, state, methods) =>
                      this.optionRenderer(option, props, state, methods)
                  : undefined
              }   
            />
          </div>   
        {/* <p>
          <input
            type="checkbox"
            checked={this.state.searchable}
            onChange={() =>
              this.setState({
                searchable: !this.state.searchable
              })
            }
          />{" "}
          Searchable
          <br />
          <input
            type="checkbox"
            checked={this.state.handle}
            onChange={() =>
              this.setState({
                handle: !this.state.handle
              })
            }
          />{" "}
          Dropdown handle
          <br />
          
          <input
            type="checkbox"
            checked={this.state.itemRenderer}
            onChange={() =>
              this.setState({
                itemRenderer: !this.state.itemRenderer
              })
            }
          />{" "}
          Custom dropdown item renderer
          
          <br />
          <input
            type="checkbox"
            checked={this.state.closeOnSelect}
            onChange={() =>
              this.setState({
                closeOnSelect: !this.state.closeOnSelect
              })
            }
          />{" "}
          Close dropdown on select/deselect
          <br />
          Custom color{" "}
          <input
            type="color"
            defaultValue={this.state.color}
            onChange={event =>
              this.setState({
                color: event.target.value
              })
            }
          />
          <br />
          
          Dropdown Height:{" "}
          <StyledInput
            type="text"
            checked={this.state.dropdownHeight}
            value={this.state.dropdownHeight}
            onChange={event =>
              this.setState({
                dropdownHeight: event.target.value
              })
            }
          />
        </p>
       */}
      </div>
    );
  }
}

const StyledSelect = styled(Select)`
  ${({ dropdownRenderer }) =>
    dropdownRenderer &&
    `
		.react-dropdown-select-dropdown {
			overflow: initial;
		}
	`}
`;

const StyledInput = styled.input`
  margin: 0 0 0 10px;
  height: 23px !important;
  color: #0071dc;
  background: #fff;
  border: 1px solid #0071dc;
  border-radius: 3px;
  padding: 13px 10px;
  width: 70px;
`;
