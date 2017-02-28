mixin PL-<%= prefix %>(className)
	-if (!className) className =''
		.<%= prefix %>(class=''+className)
