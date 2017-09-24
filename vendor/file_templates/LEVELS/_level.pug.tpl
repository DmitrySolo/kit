mixin LEVEL-<%= levelName%>(title,className)
	-if (!className) className =''
	.<%= levelName%>__content(class = '<%= levelName%>__content'+ className)
		h2.<%= levelName%>__title=title
		block <%= levelName%>