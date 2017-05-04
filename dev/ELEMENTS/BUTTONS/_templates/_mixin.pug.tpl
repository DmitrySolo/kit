mixin B-<%= elementName %>(value,className)
	-if (!className) className =''
	button.<%= elementName %>(class=''+className)=value

