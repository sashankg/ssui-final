import AT from './attributeTypes.js'

const commonAttributes = {
  x: AT.number,
  y: AT.number,
  width: AT.number,
  height: AT.number,
  backgroundColor: AT.color,
};

const elementTypes = {
  label: { 
    name: 'Label', 
    ...commonAttributes,
    text: AT.string,
  }, 
  button: {
    name: 'Button',
    ...commonAttributes,
    text: AT.string,
    destination: AT.page,
  }, 
  textbox: {
    name: 'Textbox',
    ...commonAttributes,
    placeholder: AT.string,
  }, 
  slider: {
    name: 'Slider',
    ...commonAttributes,
    min: AT.number,
    max: AT.number,
  }, 
  dropdown: {
    name: 'Dropdown',
    ...commonAttributes,
    values: AT.list, 
  }
};

export default elementTypes;
