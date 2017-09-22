mixin A-<%= elementName %>(content,href,className)
	-if (!className) className =''
	a(class='<%= elementName %> '+className,href=href data-qcontent=elements__LINKS__<%= elementName %>)=content
