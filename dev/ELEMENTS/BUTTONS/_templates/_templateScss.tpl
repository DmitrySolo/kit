$bkgColor__<%= prefix %>:#fff;
$bkgColor__<%= prefix %>-hover:#fff;
$color__<%= prefix %>-hover:#fff;
$color__<%= prefix %>:#fff;

.<%= prefix %> {
	position: relative;
	background-color: $bkgColor__<%= prefix %>;
	color: $color__<%= prefix %>;
		&:hover, &:focus, &:active {
		color: $color__<%= prefix %>-hover;
		background-color: $bkgColor__<%= prefix %>-hover;
		}
		&:focus {
			outline: none;
		}
		&:hover, &:active {
			outline: none;
	}
}