mixin B-<%= elementName %>(value,className)
	-if (!className) className =''
	button.<%= elementName %>(class=''+className data-qcontent=elements__buttons__<%= elementName %>)=value

