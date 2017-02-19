mixin A-<%= prefix %>(content,href,className)
	-if (!className) className =''
	a(class='<%= prefix %> '+className,href=href)=content
