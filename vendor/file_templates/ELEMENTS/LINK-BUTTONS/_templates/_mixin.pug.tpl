mixin BL-<% elementName %>(value,href,className)
    -if (!className) className =''
    -if (!href) href ='#'
    a.<% elementName %>(class=''+className,href=''+href)=value

