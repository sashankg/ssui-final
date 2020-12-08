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
    fontSize: AT.number,
    fontColor: AT.color,
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
    text: AT.string,
    values: AT.list, 
  },
  image: {
    name: 'Image',
    ...commonAttributes,
    src: AT.file,
  },
  checkbox: {
    name: 'Checkbox',
    ...commonAttributes,
    text: AT.string,
    fontColor: AT.color,
  },
  radio: {
    name: 'Radio',
    ...commonAttributes,
    text: AT.string,
    fontColor: AT.color,
    group: AT.string,
  }
};

export default elementTypes;
