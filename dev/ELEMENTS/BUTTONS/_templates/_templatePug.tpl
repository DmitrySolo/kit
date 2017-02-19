mixin B-<%= prefix %>(value,className)
	-if (!className) className =''
	button.<%= prefix %>(class=''+className)=value

