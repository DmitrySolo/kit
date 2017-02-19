$color__<%= prefix %>:#fff;
$color__<%= prefix %>-visited:#fff;
$color__<%= prefix %>-hover:#fff;

a.<%= prefix %> {
	color: $color__<%= prefix %>;
	text-decoration: none;

	&:visited {
		color: $color__<%= prefix %>-visited;
	}
	&:hover,
	&:focus,
	&:active {
		color: $color__<%= prefix %>-hover;
	}
	&:focus {
		outline: none;
	}
	&:hover,
	&:active {
	outline: none;
	}
}