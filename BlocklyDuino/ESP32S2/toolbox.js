'use strict';

if (typeof toolbox_custom == 'undefined')
  var toolbox_custom = [];

toolbox_custom.push(''
+'<category id="category_custom" name="官帥積木" colour="100">'
+'  <!-- <block type="controls_repeat_ext">'
+'      <value name="TIMES">'
+'        <shadow type="math_number">'
+'          <field name="NUM">10</field>'
+'        </shadow>'
+'      </value>'
+'      <statement name="DO">'
+'        <block type="guan"></block>'
+'      </statement>'
+'    </block> -->'
+'    <block type="tft_espi">'
+'      <field name="初始化 TFT顯示">初始化 TFT顯示</field>'
+'      <field name="種類">GC9A01</field>'
+'      <field name="_MISO">MISO</field>'
+'      <field name="miso">-1</field>'
+'      <field name="_MOSI">MOSI</field>'
+'      <field name="mosi">14</field>'
+'      <field name="_SCLK">SCLK</field>'
+'      <field name="sclk">27</field>'
+'      <field name="_CS">CS</field>'
+'      <field name="cs">26</field>'
+'      <field name="_DC">DC</field>'
+'      <field name="dc">15</field>'
+'      <field name="_RST">RST</field>'
+'      <field name="rst">12</field>'
+'    </block>'
+'</category>'
+'');