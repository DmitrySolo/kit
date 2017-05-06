$bkgColor__<%= elementName %>:#fff;
$bkgColor__<%= elementName %>-hover:#fff;
$color__<%= elementName %>-hover:#fff;
$color__<%= elementName %>:#fff;

.<%= elementName %> {
	position: relative;
	background-color: $bkgColor__<%= elementName %>;
	color: $color__<%= elementName %>;
		&:hover, &:focus, &:active {
		color: $color__<%= elementName %>-hover;
		background-color: $bkgColor__<%= elementName %>-hover;
		}
		&:focus {
			outline: none;
		}
		&:hover, &:active {
			outline: none;
	}
}