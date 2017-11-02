mixin BL-<% elementName %>(value,href,className)
	-if (!className) className =''
	-if (!href) href ='#'
	a.<% elementName %>(class=''+className,href=''+href data-qcontent='element__LINKS-BUTTONS__<%= elementName %>')=value

