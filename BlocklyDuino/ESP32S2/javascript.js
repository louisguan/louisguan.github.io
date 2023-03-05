Blockly.Arduino['tft_espi'] = function(block) {
  var dropdown___ = block.getFieldValue('種類');
  var text_miso = block.getFieldValue('miso');
  var text_mosi = block.getFieldValue('mosi');
  var text_sclk = block.getFieldValue('sclk');
  var text_cs = block.getFieldValue('cs');
  var text_dc = block.getFieldValue('dc');
  var text_rst = block.getFieldValue('rst');
  // TODO: Assemble Arduino into code variable.

  Blockly.Arduino.definitions_.tftinitial = '#include <TFT_eSPI.h>\n';
  
  var code='';

  code +='tft.init();\n';
  code +='tft.setRotation(0);\n';
  code +='tft.fillScreen(TFT_GREY);\n';
  code +='tft.setTextColor(TFT_GREEN, TFT_GREY);  // Adding a black background colour erases previous text automatically \n\n';
  
  code +='// Draw clock face \n';
  code +='tft.fillCircle(64, 64, 61, TFT_BLUE);\n';
  code +='tft.fillCircle(64, 64, 57, TFT_BLACK);\n';


  return code;
};