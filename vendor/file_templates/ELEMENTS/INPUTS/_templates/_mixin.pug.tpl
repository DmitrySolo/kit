mixin In-<%= elementName %>(name,classModifier)
	-var classModifier = (classModifier)? '<%= elementName %>--' + classModifier : ''
Name%> '+classModifier type='text' data-qcontent='element__INPUTS__<%= elementName %>')	input(name=name class='<%element