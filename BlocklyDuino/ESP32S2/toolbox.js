'use strict';

if (typeof toolbox_custom == 'undefined')
  var toolbox_custom = [];

toolbox_custom.push(''
+'<category id="category_custom" name="官帥MyBlocks" colour="100">'
+'    <block type="controls_repeat_ext">'
+'      <value name="TIMES">'
+'        <shadow type="math_number">'
+'          <field name="NUM">10</field>'
+'        </shadow>'
+'      </value>'
+'      <statement name="DO">'
+'        <block type="guan"></block>'
+'      </statement>'
+'    </block>'
+'</category>');