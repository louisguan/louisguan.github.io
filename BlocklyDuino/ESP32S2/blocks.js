Blockly.Blocks['tft_espi'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("初始化 TFT顯示"), "初始化 TFT顯示")
        .appendField(new Blockly.FieldDropdown([["GC9A01","GC9A01"], ["option1","OPTIONNAME1"], ["option2","OPTIONNAME2"], ["option3","OPTIONNAME3"], ["option4","OPTIONNAME4"], ["option5","OPTIONNAME5"]]), "種類")
        .appendField(new Blockly.FieldLabelSerializable("MISO"), "_MISO")
        .appendField(new Blockly.FieldTextInput("-1"), "miso")
        .appendField(new Blockly.FieldLabelSerializable("MOSI"), "_MOSI")
        .appendField(new Blockly.FieldTextInput("14"), "mosi")
        .appendField(new Blockly.FieldLabelSerializable("SCLK"), "_SCLK")
        .appendField(new Blockly.FieldTextInput("27"), "sclk")
        .appendField(new Blockly.FieldLabelSerializable("CS"), "_CS")
        .appendField(new Blockly.FieldTextInput("26"), "cs")
        .appendField(new Blockly.FieldLabelSerializable("DC"), "_DC")
        .appendField(new Blockly.FieldTextInput("15"), "dc")
        .appendField(new Blockly.FieldLabelSerializable("RST"), "_RST")
        .appendField(new Blockly.FieldTextInput("12"), "rst");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};