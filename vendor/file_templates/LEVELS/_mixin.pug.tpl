mixin LEVEL-<%= levelName%>(data)
	.<%= levelName%>
		.<%= levelName%>__content(class = '<%= levelName%>__content'+ className data-qcontent="level__<%= levelName%>")
			h2.<%= levelName%>__title=title
			if block
				block