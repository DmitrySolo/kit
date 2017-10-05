mixin LEVEL-<%= levelName%>(title,className)
	-if (!className) className =''
	.<%= levelName%>__content(class = '<%= levelName%>__content'+ className data-qcontent="level__<%= levelName%>")
		h2.<%= levelName%>__title=title
		block <%= levelName%>