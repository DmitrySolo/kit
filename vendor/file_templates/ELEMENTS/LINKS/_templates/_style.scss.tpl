$color__<%= elementName %>:#fff;
$color__<%= elementName %>-visited:#fff;
$color__<%= elementName %>-hover:#fff;

a.<%= elementName %> {
	color: $color__<%= elementName %>;
	text-decoration: none;

	&:visited {
		color: $color__<%= elementName %>-visited;
	}
	&:hover,
	&:focus,
	&:active {
		color: $color__<%= elementName %>-hover;
	}
	&:focus {
		outline: none;
	}
	&:hover,
	&:active {
	outline: none;
	}
}