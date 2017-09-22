mixin LEVEL-<%= levelName%>(title,className)
	-if (!className) className =''
	.<%= levelName%>__content(class = 'page__content'+ className)
		h2.<%= levelName%>__title=title
		block <%= levelName%>